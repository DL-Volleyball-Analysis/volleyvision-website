"use client";

import { Button } from "./ui/button";
import { ArrowRight, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "./ui/separator";

export function CTA() {
  const { language } = useLanguage();
  const isZh = language === 'zh-TW';

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Mikasa-inspired diagonal accent */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-mikasa-blue-dark rounded-full opacity-50"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-mikasa-blue-light rounded-full opacity-30"></div>
      </div>

      {/* Yellow accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-secondary-foreground mb-6 text-4xl font-extrabold tracking-tight">
            {isZh ? '準備好轉變您的排球分析了嗎？' : 'Ready to Transform Your Volleyball Analysis?'}
          </h2>
          <p className="text-xl text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isZh
              ? '加入已經在使用我們 AI 驅動平台的球隊和教練，獲得競爭優勢並提升球員表現。'
              : 'Join teams and coaches already using our AI-powered platform to gain competitive advantages and improve player performance.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 bg-primary text-mikasa-blue-dark hover:bg-mikasa-yellow-light font-semibold rounded-md shadow-lg transition-all duration-normal hover:shadow-xl active:scale-[0.98]"
              onClick={() => window.open('https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp', '_blank')}
              aria-label="Get started for free"
            >
              {isZh ? '免費開始使用' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent text-secondary-foreground border-2 border-secondary-foreground/40 hover:bg-secondary-foreground/10 hover:border-secondary-foreground rounded-md transition-all duration-normal"
              onClick={() => window.open('https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp', '_blank')}
              aria-label="View project on GitHub"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
              {isZh ? '在 GitHub 查看' : 'View on GitHub'}
            </Button>
          </div>

          <Separator className="my-12 bg-secondary-foreground/20 max-w-md mx-auto" />

          <div className="flex items-center justify-center gap-8 text-secondary-foreground/80">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{isZh ? '免費開源' : 'Free & Open Source'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{isZh ? '無需信用卡' : 'No Credit Card'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
