import React from 'react';
import { CallScreen } from './components/CallScreen';
import { ExternalLink, Phone, Mic, MessageSquare, Volume2, HelpCircle, Github, Mail, Youtube, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage, languages } from './hooks/useLanguage';

function AppContent() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Broadcast Banner */}
      <div className="bg-primary/10 border-b border-primary/20 p-3 text-center">
        <p className="text-sm max-w-4xl mx-auto leading-relaxed">
          <span className="font-bold text-primary mr-2">{t.notice}</span>
          {t.noticeText}
        </p>
      </div>

      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <header className="text-center mb-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Trust Leaf – AI for Bharat
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-3 text-foreground/80">
            {t.subtitle}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.description}
          </p>
          
          {/* Language Selector */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="appearance-none bg-transparent border border-primary/30 rounded-lg px-4 py-2 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-background text-foreground">
                    {lang.nativeName}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <a 
              href="https://youtu.be/2H13NypayYU?si=1J7S6isMBJvDVUwu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube className="w-5 h-5" />
              <span>{t.watchDemo}</span>
            </a>
            <a 
              href="https://github.com/vimalluuu/AI-IVR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>{t.github}</span>
            </a>
            <a 
              href="mailto:traceherb.work@gmail.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{t.contact}</span>
            </a>
          </div>
        </header>

        {/* Video Ad Section */}
        <div className="w-full max-w-2xl mb-12 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 group">
            <video
              ref={(el) => {
                if (el) {
                  el.volume = 0.5;
                }
              }}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
              poster="/vite.svg"
            >
              <source src="/Voice-Flow-System-Mar-9-18-57-07.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Custom Fullscreen Button */}
            <button
              onClick={(e) => {
                const videoContainer = e.currentTarget.parentElement?.querySelector('video');
                if (videoContainer) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    videoContainer.parentElement?.requestFullscreen();
                  }
                }
              }}
              className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="w-full max-w-4xl mb-16 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              {t.howToUse}
            </h2>
            <p className="text-muted-foreground">{t.howToUseDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 glass rounded-2xl border border-primary/10 transition-all hover:border-primary/30">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.step1Title}</h3>
              <p className="text-muted-foreground text-sm">
                {t.step1Desc}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 glass rounded-2xl border border-primary/10 transition-all hover:border-primary/30">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Mic className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.step2Title}</h3>
              <p className="text-muted-foreground text-sm">
                {t.step2Desc}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 glass rounded-2xl border border-primary/10 transition-all hover:border-primary/30">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Volume2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.step3Title}</h3>
              <p className="text-muted-foreground text-sm">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md animate-fade-in">
          <CallScreen 
            translations={{
              readyForCall: t.readyForCall,
              ringing: t.ringing,
              connected: t.connected,
              listening: t.listening,
              thinking: t.thinking,
              speaking: t.speaking,
              callEnded: t.callEnded,
              assistantName: t.assistantName
            }}
          />
        </div>

        {/* Scheme Apply - Application Website */}
        <div className="w-full max-w-4xl mt-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t.applyForSchemes}
            </h2>
            <a 
              href="https://trust-leaf.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              {t.openInNewTab}
            </a>
          </div>
          <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl">
            <iframe
              src="https://trust-leaf.lovable.app/"
              title="Trust Leaf Application"
              className="w-full h-full"
              allow="accelerometer; ambient-light-sensor; camera; document-domain; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-muted-foreground text-sm">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
