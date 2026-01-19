"use client";

import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { HeroVideo, HeroVideoHandle } from "./HeroVideo";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const videoRef = useRef<HeroVideoHandle>(null);
  const { t } = useLanguage();

  const handleWatchDemo = () => {
    if (videoRef.current) {
      videoRef.current.requestFullScreen();
    }
  };

  return (
    <div className="relative overflow-hidden bg-surface pt-20">
      {/* Mikasa-inspired background pattern */}
      <div className="absolute inset-0 diagonal-stripes"></div>

      {/* Dynamic accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 px-4 py-2 rounded-md mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" aria-hidden="true"></span>
              <span className="text-primary text-sm font-medium tracking-wide uppercase">{t.hero.badge}</span>
            </div>

            <h1 className="text-foreground mb-6 font-extrabold text-display">
              {t.hero.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-mikasa-yellow-light font-semibold rounded-md shadow-lg shadow-primary/20 transition-all duration-normal hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
                onClick={handleWatchDemo}
                aria-label="Watch demo video"
              >
                <Play className="w-5 h-5" aria-hidden="true" />
                {t.hero.watchDemo}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent text-foreground border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground rounded-md transition-all duration-normal"
                onClick={() => window.open('https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp', '_blank')}
                aria-label="Get started with VolleyVision"
              >
                {t.hero.getStarted}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Video frame with Mikasa-style border */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-primary rounded-lg opacity-75"></div>
            <div className="relative">
              <HeroVideo ref={videoRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Mikasa inspired */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-secondary rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary rounded-full blur-[150px] opacity-10"></div>
      </div>
    </div>
  );
}
