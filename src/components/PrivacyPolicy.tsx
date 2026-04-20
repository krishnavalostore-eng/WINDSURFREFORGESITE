import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, Database, Server, Smartphone, UserX, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-rajdhani relative overflow-hidden selection:bg-system-neon selection:text-white pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#0f172a_100%)]"></div>

      <div className="container mx-auto max-w-4xl px-6 pt-12 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-system-neon hover:text-white transition-colors font-mono text-sm uppercase tracking-widest mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to System
        </Link>

        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-system-neon/10 border border-system-neon/30 mb-6 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <Shield className="w-8 h-8 text-system-neon" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif tracking-wider uppercase drop-shadow-[0_0_10px_rgba(37,99,235,0.3)]">
            Privacy <span className="text-system-neon">Policy</span>
          </h1>
          <div className="text-system-neon font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
            Last Updated: April 2026 // Protocol Active
          </div>
        </div>

        <div className="space-y-12 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 md:p-12 rounded-3xl shadow-2xl">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-700 pb-4">
              <Lock className="w-6 h-6 text-system-neon" />
              1. Welcome to the System (Introduction)
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Welcome to REFORGE, the ultimate accountability and fitness gamification platform. We deeply respect your privacy and are fundamentally committed to ensuring that you feel entirely secure while navigating our application and utilizing its features. This comprehensive Privacy Policy has been meticulously drafted in plain, accessible English to provide you with absolute transparency regarding the precise nature of the information we collect from you, the operational necessity behind this data collection, the rigorous security protocols we employ to protect it, and the comprehensive rights you hold over your personal data.
              </p>
              <p>
                By accessing, downloading, or utilizing our application, you are entrusting us with specific facets of your personal information. We acknowledge the weight of this responsibility and treat it with the utmost seriousness. We unequivocally state that <strong className="text-white">we do not, and will never, sell, rent, or lease your personal data to third-party advertisers, marketing conglomerates, or data brokers</strong> under any circumstances. Your data remains yours.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-700 pb-4">
              <Database className="w-6 h-6 text-system-neon" />
              2. What Information Do We Collect?
            </h2>
            <p className="text-lg mb-6">To ensure the System functions optimally and to provide you with a highly personalized, adaptive experience, we systematically collect several specific categories of information:</p>
            
            <div className="grid gap-6">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2 text-system-neon">A. Account Information</h3>
                <p>When you authenticate and log in using Google, we securely receive basic identification information including your full name, email address, and profile picture. Furthermore, we request your country of residence and specific time zone. This is a critical operational requirement allowing us to accurately synchronize and reset your daily quests at the correct local time, ensuring fairness across the global leaderboard.</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2 text-system-neon">B. Health and Physical Data</h3>
                <p>During the initial "Calibration" phase, we mandate the submission of your age, gender, height, weight, overarching fitness goals, and current baseline activity level. We require this highly specific physiological information to accurately calculate your Body Mass Index (BMI), compute your precise daily caloric expenditure needs, and guarantee that the AI generates workout protocols that are physiologically safe, effective, and tailored exclusively to your body type and capabilities.</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2 text-system-neon">C. Location and Movement Data (Sensors)</h3>
                <p>Should you initiate a physical quest (e.g., "Run 5km" or "Walk 10,000 steps"), the application will explicitly request permission to interface with your device's GPS (Location Services) and Step Counter (Motion/Activity Recognition hardware). We strictly monitor and track this telemetry data <strong className="text-white">only</strong> while you are actively engaged in a quest. We absolutely do not track your location in the background during rest periods or when the application is inactive.</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2 text-system-neon">D. Photos and Camera</h3>
                <p>For specific verification quests, you may be required to upload photographic evidence to substantiate your completion (such as an image of a nutritionally balanced meal or a post-workout verification selfie). We utilize your device's camera hardware exclusively to capture and process these specific verification images.</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2 text-system-neon">E. App Usage Data</h3>
                <p>We continuously monitor and record your progression metrics, including your current Hunter level, accumulated experience points (XP), inventory of virtual assets (Gold/Keys), your daily login streak, and comprehensive encrypted logs of your conversational interactions with the DUSK AI accountability coach.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-700 pb-4">
              <Eye className="w-6 h-6 text-system-neon" />
              3. How Do We Use Your Information?
            </h2>
            <p className="text-lg mb-4">We strictly utilize your information to operate the application infrastructure and enhance your user experience. Specifically, your data is deployed to:</p>
            <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300 marker:text-system-neon">
              <li>Create, maintain, and securely manage your unique Hunter Profile.</li>
              <li>Algorithmically generate highly personalized workout regimens and calculate appropriate XP rewards based on exertion.</li>
              <li><strong className="text-white">Verify your honesty:</strong> Our proprietary "ForgeGuard" anti-cheat AI meticulously analyzes your submitted photos, running velocity, and step cadence to definitively confirm quest completion and aggressively prevent cheating.</li>
              <li>Empower the DUSK AI to interact with you contextually, providing tailored encouragement, or issuing strict reprimands if you fail to meet your workout obligations.</li>
              <li>Accurately position you on the global, competitive leaderboards against other active Hunters.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-700 pb-4">
              <Server className="w-6 h-6 text-system-neon" />
              4. Who Do We Share Your Data With?
            </h2>
            <p className="text-lg mb-4">As previously stated, we do not sell your data to marketing entities or data brokers. However, to maintain the complex functionality of the app, we integrate with a select group of highly secure, enterprise-grade third-party services:</p>
            <ul className="space-y-4 text-lg">
              <li className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-system-neon">
                <strong className="text-white block mb-1">Database Providers (Supabase):</strong> We utilize heavily encrypted, secure cloud server infrastructure to persistently store your account data, health profile, and progression metrics. This ensures your data is safely backed up and your Hunter level is preserved even if you transition to a new device.
              </li>
              <li className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-system-neon">
                <strong className="text-white block mb-1">AI Providers (Google Gemini):</strong> When you engage in dialogue with DUSK or upload a photograph for quest verification, that specific text or image payload is securely transmitted to an advanced AI for rapid analysis. The AI evaluates the photo's validity or generates a contextual reply, after which the transaction is immediately concluded. <strong className="text-system-neon">Your personal identity is strictly decoupled and is never used to train their public AI models.</strong>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-700 pb-4">
              <Shield className="w-6 h-6 text-system-neon" />
              5. How Do We Keep Your Data Safe?
            </h2>
            <p className="text-lg leading-relaxed">
              We deploy formidable, industry-standard security architectures, including end-to-end encryption protocols, to fiercely protect your data during transit to our servers and while it remains at rest in our databases. However, it is imperative to acknowledge that no digital system connected to the internet can be guaranteed as 100% perfectly secure against all theoretical vectors of attack. You bear the ultimate responsibility for maintaining the security and confidentiality of your Google account credentials.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-700 pb-4">
              <Smartphone className="w-6 h-6 text-system-neon" />
              6. Permissions Explained (Google Play Rules)
            </h2>
            <p className="text-lg mb-4">In strict compliance with Google Play developer policies, we provide absolute clarity regarding the necessity of requested device permissions:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <strong className="text-system-neon block mb-1">Location</strong>
                <p className="text-sm">Utilized strictly to calculate precise distance and velocity metrics during active running or walking quests.</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <strong className="text-system-neon block mb-1">Physical Activity / Motion</strong>
                <p className="text-sm">Utilized strictly to interface with your device's pedometer to accurately count your steps.</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <strong className="text-system-neon block mb-1">Camera</strong>
                <p className="text-sm">Utilized strictly to allow you to capture and submit visual, cryptographic proof of your physical exertion.</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <strong className="text-system-neon block mb-1">Foreground Service</strong>
                <p className="text-sm">When a workout is initiated, we deploy a persistent notification. This critical function instructs the Android OS to maintain continuous tracking of your steps and GPS coordinates even when your device screen is powered off.</p>
              </div>
            </div>
            <p className="text-lg mt-4 text-slate-400 italic">
              You retain the absolute right to deny or revoke these permissions at any time via your device's system settings. However, be advised that doing so will permanently prevent you from initiating or completing specific categories of physical quests.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-700 pb-4">
              <UserX className="w-6 h-6 text-system-neon" />
              7. Your Rights and Deleting Your Account
            </h2>
            <p className="text-lg mb-4">You are the sole owner of your data. At any given moment, you possess the unalienable right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-slate-300 marker:text-system-neon">
              <li><strong>Review:</strong> Request and review the totality of the data we have collected regarding your profile.</li>
              <li><strong>Rectify:</strong> Correct any inaccurate or outdated physiological information (achieved by recalibrating your profile within the app).</li>
              <li><strong>Eradicate:</strong> You may submit a formal request for total account deletion via our <a href="https://forms.gle/yFzbKDJ7wcwtaUgz9" target="_blank" rel="noopener noreferrer" className="text-system-neon hover:text-white transition-colors underline">Account Deletion Form</a>. Should you execute this protocol, your Hunter level, accumulated XP, virtual currency, and all associated health telemetry will be permanently, irreversibly wiped and purged from our server infrastructure.</li>
            </ul>
            <p className="text-lg leading-relaxed pt-4">
              For any data-related inquiries, contact us at: <a href="mailto:reforgesystem@gmail.com" className="text-system-neon hover:text-white transition-colors underline">reforgesystem@gmail.com</a>
            </p>
            <p className="text-lg leading-relaxed">
              <strong className="text-white">Registered Operations:</strong> Maharashtra, India.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-slate-700 pb-4">
              <FileText className="w-6 h-6 text-system-neon" />
              8. Changes to This Policy
            </h2>
            <p className="text-lg leading-relaxed">
              The System is constantly evolving. Should we implement modifications to this Privacy Policy, we will broadcast a notification directly within the application interface. If you continue to utilize the application following the implementation of these changes, your continued usage constitutes your formal, legally binding agreement to the updated protocols and rules.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
