import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSettings } from "@/hooks/useSettings";
import { useSessionId } from "@/hooks/useSession";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useVisitors } from "@/hooks/useVisitors";
import { LoadingScreen } from "@/components/LoadingScreen";
import { VideoBackground } from "@/components/VideoBackground";
import { ParticleField } from "@/components/ParticleField";
import { GlowCursor } from "@/components/GlowCursor";
import { FloatingControls } from "@/components/FloatingControls";
import { ProfileHero } from "@/components/ProfileHero";
import { ProfileCard } from "@/components/ProfileCard";
import { VisitorCounter } from "@/components/VisitorCounter";
import { QuickActions } from "@/components/QuickActions";
import { SocialGrid } from "@/components/SocialGrid";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

function HomePage() {
  const { settings } = useSettings();
    const sessionId = useSessionId();
  const parallax = useMouseParallax(settings.effects.parallax);
  const stats = useVisitors(sessionId, true);

  useEffect(() => {
    document.title = `${settings.name} | ${settings.subtitle}`;
  }, [settings]);

  return (
    <>
      <VideoBackground video={settings.video} parallax={parallax} />
      <ParticleField enabled={settings.effects.particles} />
      <GlowCursor enabled={settings.effects.cursor} />
      <FloatingControls effectsEnabled />
      <main className="relative z-10">
        <ProfileHero settings={settings} />
        <ProfileCard settings={settings} />
        <VisitorCounter
          online={stats.online}
          today={stats.today}
          total={stats.total}
          returning={stats.returning}
        />
        <QuickActions />
        <SocialGrid socials={settings.socials} />
        <FeatureGrid />
      </main>
      <Footer />
    </>
  );
}

function AdminPage() {
  const { settings, updateSettings } = useSettings();
  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#050507]" />
      <AdminDashboard settings={settings} onSettingsChange={updateSettings} />
    </>
  );
}

function RouterContent() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <HashRouter>
      {showLoader && (
        <LoadingScreen
          onComplete={() => {
            setShowLoader(false);
          }}
        />
      )}
      <RouterContent />
    </HashRouter>
  );
}
