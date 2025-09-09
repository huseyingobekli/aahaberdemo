"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../App.css";
import "./globals.css";
import aaLogo from "../assets/aalogo.png";
import { useEffect, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [compact, setCompact] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const onTitle = (e: any) => {
      if (e?.detail && typeof e.detail === "string") setPageTitle(e.detail);
    };
    window.addEventListener("article:title", onTitle as EventListener);
    // @ts-ignore
    if (typeof window !== "undefined" && window.currentArticleTitle) {
      // @ts-ignore
      setPageTitle(window.currentArticleTitle as string);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("article:title", onTitle as EventListener);
    };
  }, []);

  return (
    <html lang="tr">
      <body className={inter.className}>
        <nav
          className={`aa-topbar${compact ? " compact" : ""}`}
          style={{ position: "relative" }}
        >
          <div className="aa-topbar-inner">
            <div className="aa-topbar-left">
              <Link href="/" className="aa-logo-link">
                <img src={aaLogo.src} alt="AA" className="aa-topbar-logo" />
              </Link>
            </div>
            {!compact && (
              <ul className="aa-topbar-menu">
                <Link
                  href="/"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Anasayfa
                </Link>
                <Link
                  href="/Map"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Map
                </Link>
                <Link
                  href="/unitygame"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Game
                </Link>
              </ul>
            )}
            {compact && (
              <div className="aa-topbar-page-title" title={pageTitle}>
                {pageTitle}
              </div>
            )}
            <div className="aa-topbar-right">
              <button className="aa-icon-button" aria-label="Ara">
                🔍
              </button>
              <button
                className="aa-icon-button"
                aria-label="Menü"
                onClick={() => setMenuOpen(true)}
              >
                ≡
              </button>
            </div>
          </div>

          {/* Dropdown Mega Menu */}
          {menuOpen && (
            <div className="aa-mega-overlay" onClick={() => setMenuOpen(false)}>
              <div className="aa-mega" onClick={(e) => e.stopPropagation()}>
                <div className="aa-mega-grid">
                  <div className="aa-mega-col">
                    <div className="aa-mega-title">Gündem</div>
                    <div className="aa-mega-item">Dünya</div>
                    <div className="aa-mega-item">Ekonomi</div>
                    <div className="aa-mega-item">Spor</div>
                    <div className="aa-mega-sub">Futbol</div>
                    <div className="aa-mega-sub">Basketbol</div>
                    <div className="aa-mega-sub">Dünyadan Spor</div>
                    <div className="aa-mega-item">Analiz</div>
                    <div className="aa-mega-item">Kültür</div>
                    <div className="aa-mega-item">İnfografik</div>
                    <div className="aa-mega-item">Podcast</div>
                  </div>

                  <div className="aa-mega-col">
                    <div className="aa-mega-title">Fotoğraf</div>
                    <div className="aa-mega-title">Video</div>
                    <div className="aa-mega-sub">İnsana dair</div>
                    <div className="aa-mega-sub">FETÖ'nün kodları</div>
                    <div className="aa-mega-sub">Darbe üstünde o gece</div>
                    <div className="aa-mega-sub">İfadeler ve gerçekler</div>
                  </div>

                  <div className="aa-mega-col">
                    <div className="aa-mega-item">Portre</div>
                    <div className="aa-mega-item">Koronavirüs</div>
                    <div className="aa-mega-item">Politika</div>
                    <div className="aa-mega-item">Teknoloji</div>
                    <div className="aa-mega-item">Eğitim</div>
                    <div className="aa-mega-item">Yaşam</div>
                    <div className="aa-mega-item">Sağlık</div>
                    <div className="aa-mega-item">Kültür</div>
                    <div className="aa-mega-item">Podcast</div>
                  </div>

                  <div className="aa-mega-col">
                    <div className="aa-mega-item">İş Dünyası Haberleri</div>
                    <div className="aa-mega-item">Finans terminali</div>
                    <div className="aa-mega-item">Anadolu images</div>
                    <div className="aa-mega-item">Enerji terminali</div>
                    <div className="aa-mega-item">AA Akademi</div>
                    <div className="aa-mega-item">Yeşilhat</div>
                    <div className="aa-mega-item">Ayrımcılık Hattı</div>
                    <div className="aa-mega-item">Teyit Hattı</div>
                    <div className="aa-mega-item">Kariyer AA</div>
                    <div className="aa-mega-item">Kurumsal haberler</div>
                  </div>
                </div>
                <button
                  className="aa-mega-close"
                  onClick={() => setMenuOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </nav>

        {children}
      </body>
    </html>
  );
}
