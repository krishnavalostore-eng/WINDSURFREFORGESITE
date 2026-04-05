import express from "express";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "psp5116";

app.use(express.json());

// Security Middleware
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['x-admin-secret'];
  if (authHeader !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized: Invalid Admin Credentials" });
  }
  next();
};

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    env: {
      hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  });
});

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  '' // We will set this dynamically per request
);

// Helper to get the correct redirect URI based on the current request
const getRedirectUri = (req: express.Request) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['host'];
  // Ensure we don't double-slash if host has a trailing slash (unlikely but safe)
  return `${protocol}://${host}/auth/callback`;
};

// API routes
app.get("/api/users/count", async (req, res) => {
  try {
    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });
    
    if (error) throw error;
    // Add dummy system players (1204) to the actual count
    res.json({ count: (count || 0) + 1204 });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Failed to fetch user count" });
  }
});

app.get("/api/users", requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, name, tier } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: "User already registered" });
    }

    const { error } = await supabase
      .from("users")
      .insert({ email, name, tier });

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.get("/api/auth/google/url", (req, res) => {
  try {
    const redirectUri = getRedirectUri(req);
    console.log("Generating auth URL with redirect_uri:", redirectUri);
    
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
      redirect_uri: redirectUri
    });
    res.json({ url });
  } catch (error) {
    console.error("Error generating auth URL:", error);
    res.status(500).json({ error: "Failed to generate auth URL. Check server logs." });
  }
});

// OAuth Callback
app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  const redirectUri = getRedirectUri(req);
  
  if (!code) {
    // Fallback for manual testing or if code is missing
    const { email, name } = req.query;
    return res.send(generatePopupScript(email as string, name as string));
  }

  try {
    const { tokens } = await oauth2Client.getToken({
      code: code as string,
      redirect_uri: redirectUri
    });
    oauth2Client.setCredentials(tokens);

    const userInfo = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const { email, name } = userInfo.data;
    res.send(generatePopupScript(email, name));
  } catch (error: any) {
    console.error("OAuth error:", error);
    const errorMessage = error.response?.data?.error_description || error.message || "Unknown error";
    res.status(500).send(`
      <html>
        <body>
          <script>
            alert("Authentication failed. Error: ${errorMessage}. Please check your Google Cloud Console settings (Redirect URIs).");
            window.close();
          </script>
        </body>
      </html>
    `);
  }
});

function generatePopupScript(email: string, name: string) {
  return `
    <html>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({ 
              type: 'OAUTH_AUTH_SUCCESS', 
              user: { email: "${email || 'player@system.com'}", name: "${name || 'Player'}" } 
            }, '*');
            window.close();
          } else {
            window.location.href = '/';
          }
        </script>
        <p>Authentication successful. This window should close automatically.</p>
      </body>
    </html>
  `;
}

app.get("/api/slides", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("slides")
      .select("*")
      .order("displayOrder", { ascending: true })
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch slides" });
  }
});

app.post("/api/slides", requireAdmin, async (req, res) => {
  try {
    const { imageUrl, text } = req.body;
    if (!imageUrl || !text) {
      return res.status(400).json({ error: "imageUrl and text are required" });
    }
    
    const { data: maxOrderData } = await supabase
      .from("slides")
      .select("displayOrder")
      .order("displayOrder", { ascending: false })
      .limit(1);
    
    const nextOrder = ((maxOrderData?.[0]?.displayOrder) || 0) + 1;
    
    const { data, error } = await supabase
      .from("slides")
      .insert({ imageUrl, text, displayOrder: nextOrder })
      .select()
      .single();
      
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create slide" });
  }
});

app.put("/api/slides/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, text } = req.body;
    const { data, error } = await supabase
      .from("slides")
      .update({ imageUrl, text })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to update slide" });
  }
});

app.delete("/api/slides/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("slides")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete slide" });
  }
});

app.put("/api/slides/reorder", requireAdmin, async (req, res) => {
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates)) return res.status(400).json({ error: "updates must be an array" });
    
    for (const update of updates) {
      await supabase
        .from("slides")
        .update({ displayOrder: update.displayOrder })
        .eq("id", update.id);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to reorder slides" });
  }
});

app.get("/api/marquee", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("marquee")
      .select("*")
      .order("displayOrder", { ascending: true })
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch marquee items" });
  }
});

app.post("/api/marquee", requireAdmin, async (req, res) => {
  try {
    const { imageUrl, text } = req.body;
    if (!imageUrl || !text) return res.status(400).json({ error: "imageUrl and text are required" });
    
    const { data: maxOrderData } = await supabase
      .from("marquee")
      .select("displayOrder")
      .order("displayOrder", { ascending: false })
      .limit(1);
      
    const nextOrder = ((maxOrderData?.[0]?.displayOrder) || 0) + 1;
    
    const { data, error } = await supabase
      .from("marquee")
      .insert({ imageUrl, text, displayOrder: nextOrder })
      .select()
      .single();
      
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create marquee item" });
  }
});

app.put("/api/marquee/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, text } = req.body;
    const { data, error } = await supabase
      .from("marquee")
      .update({ imageUrl, text })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to update marquee item" });
  }
});

app.delete("/api/marquee/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from("marquee")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete marquee item" });
  }
});

app.put("/api/marquee/reorder", requireAdmin, async (req, res) => {
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates)) return res.status(400).json({ error: "updates must be an array" });
    
    for (const update of updates) {
      await supabase
        .from("marquee")
        .update({ displayOrder: update.displayOrder })
        .eq("id", update.id);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to reorder marquee items" });
  }
});

// For local development only
if (process.env.NODE_ENV !== "production") {
  import("vite").then(async (viteModule) => {
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}

export default app;
