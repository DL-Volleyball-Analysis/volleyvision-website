"use client";

import Link from "next/link";
import { useState, useId } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "./ui/separator";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const mobileMenuId = useId();

  return (
    <nav
      className="fixed w-full z-50 bg-surface/95 backdrop-blur-md border-b border-border"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold text-primary tracking-tight">VolleyVision AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block" role="menubar">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast" role="menuitem">
                {t.nav.features}
              </a>
              <a href="#screenshots" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast" role="menuitem">
                {t.nav.screenshots}
              </a>
              <a href="#tech" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast" role="menuitem">
                {t.nav.tech}
              </a>
              <a href="#demo" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast" role="menuitem">
                {t.nav.demo}
              </a>
              <button
                onClick={() => setLanguage(language === 'en' ? 'zh-TW' : 'en')}
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast border border-border hover:border-primary rounded-md"
                aria-label={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
              >
                {language === 'en' ? '中文' : 'EN'}
              </button>
              <a
                href="https://github.com/DL-Volleyball-Analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-mikasa-blue-light text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast"
                role="menuitem"
              >
                {t.nav.github}
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors duration-fast"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls={mobileMenuId}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id={mobileMenuId} className="md:hidden pb-4" role="menu">
            <Separator className="mb-4" />
            <div className="flex flex-col space-y-2">
              <a href="#features" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast" role="menuitem">
                {t.nav.features}
              </a>
              <a href="#screenshots" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast" role="menuitem">
                {t.nav.screenshots}
              </a>
              <a href="#tech" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast" role="menuitem">
                {t.nav.tech}
              </a>
              <a href="#demo" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-fast" role="menuitem">
                {t.nav.demo}
              </a>
              <button
                onClick={() => setLanguage(language === 'en' ? 'zh-TW' : 'en')}
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium text-left border border-border hover:border-primary rounded-md transition-colors duration-fast"
                aria-label={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
              >
                {language === 'en' ? '中文' : 'EN'}
              </button>
              <a
                href="https://github.com/DL-Volleyball-Analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-mikasa-blue-light text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium text-center transition-colors duration-fast"
                role="menuitem"
              >
                {t.nav.github}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

