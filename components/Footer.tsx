"use client";

import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-dark text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center">
                <span className="text-primary font-extrabold">V</span>
              </div>
              <span className="text-primary font-extrabold tracking-tight">VolleyVision AI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-foreground font-semibold">{t.footer.product}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors duration-fast">{t.nav.features}</a></li>
              <li><a href="#demo" className="hover:text-primary transition-colors duration-fast">{t.nav.demo}</a></li>
              <li><a href="#tech" className="hover:text-primary transition-colors duration-fast">{t.nav.tech}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-foreground font-semibold">{t.footer.resources}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-fast">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-foreground font-semibold">{t.footer.connect}</h4>
            <div className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted rounded-md flex items-center justify-center hover:bg-secondary transition-colors duration-fast"
                      aria-label="Visit our GitHub repository"
                    >
                      <Github className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>© 2025 VolleyVision AI. {t.footer.rights}</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-fast">{t.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-primary transition-colors duration-fast">{t.footer.terms}</Link>
            <Link href="/contact" className="hover:text-primary transition-colors duration-fast">{t.footer.contact}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

