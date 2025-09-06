"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NewsItem = {
  id: string;
  title: string;
  url?: string;
  description?: string;
  content?: string;
  contentTop?: string | string[];
  contentBottom?: string | string[];
  location?: string;
  city?: string;
  img?: string;
  credit?: string;
};

export default function Anasayfa() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch("/data/news.json", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();

        if (
          data?.type === "FeatureCollection" &&
          Array.isArray(data?.features)
        ) {
          const features = data.features;
          const items: NewsItem[] = features
            .map((f: any) => ({
              id: typeof f?.id === "string" ? f.id : "",
              title:
                typeof f?.properties?.title === "string"
                  ? f.properties.title
                  : "",
              url:
                typeof f?.properties?.url === "string"
                  ? f.properties.url
                  : undefined,
              description:
                typeof f?.properties?.description === "string"
                  ? f.properties.description
                  : "",
              content:
                typeof f?.properties?.content === "string"
                  ? f.properties.content
                  : undefined,
              contentTop: f?.properties?.contentTop,
              contentBottom: f?.properties?.contentBottom,
              location:
                typeof f?.properties?.location === "string"
                  ? f.properties.location
                  : undefined,
              city:
                typeof f?.properties?.city === "string"
                  ? f.properties.city
                  : undefined,
              img:
                typeof f?.properties?.img === "string"
                  ? f.properties.img
                  : undefined,
              credit:
                typeof f?.properties?.credit === "string"
                  ? f.properties.credit
                  : undefined,
            }))
            .filter((item: NewsItem) => item.id && item.title);

          setNewsItems(items);
        }
      } catch (error) {
        console.error("Haberler yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Slider otomatik geçiş
  useEffect(() => {
    if (newsItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(5, newsItems.length));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [newsItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(5, newsItems.length));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.min(5, newsItems.length)) %
        Math.min(5, newsItems.length)
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="anasayfa-loading">
        <div className="loading-spinner">Yükleniyor...</div>
      </div>
    );
  }

  const sliderItems = newsItems.slice(0, 5); // İlk 5 haber slider için
  const bottomItems = newsItems.slice(5); // Geri kalanlar kartlar için

  return (
    <div className="anasayfa">
      <div className="anasayfa-header">
        <div className="anasayfa-separator"></div>
      </div>

      <div className="anasayfa-main-layout">
        <div className="anasayfa-main-content">
          {/* Top Slider */}
          <div className="anasayfa-slider">
            <div className="slider-container">
              {sliderItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`slider-item ${
                    index === currentSlide ? "active" : ""
                  }`}
                >
                  <Link href={`/haber/${item.id}`} className="slider-link">
                    <img
                      src={item.img || "/vangolu.jpg"}
                      alt={item.title}
                      className="slider-image"
                    />
                    <div className="slider-overlay">
                      <h2 className="slider-headline">{item.title}</h2>
                      {item.credit && (
                        <div className="slider-credit">{item.credit}</div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Slider Navigation */}
            <button className="slider-nav slider-prev" onClick={prevSlide}>
              ‹
            </button>
            <button className="slider-nav slider-next" onClick={nextSlide}>
              ›
            </button>

            {/* Slider Dots */}
            <div className="slider-dots">
              {sliderItems.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Bottom Cards */}
          {bottomItems.length > 0 && (
            <div className="anasayfa-bottom-cards">
              <div className="bottom-cards-grid">
                {bottomItems.map((item) => (
                  <div key={item.id} className="bottom-card">
                    <Link
                      href={`/haber/${item.id}`}
                      className="bottom-card-link"
                    >
                      <div className="bottom-card-image">
                        <img
                          src={item.img || "/vangolu.jpg"}
                          alt={item.title}
                        />
                      </div>
                      <div className="bottom-card-content">
                        <h3 className="bottom-card-title">{item.title}</h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="anasayfa-sidebar">
          <div className="sidebar-gundem">
            <h3 className="sidebar-title">Gündem</h3>
            <div className="sidebar-items">
              {newsItems.slice(0, 8).map((item) => (
                <div key={item.id} className="sidebar-item">
                  <Link href={`/haber/${item.id}`} className="sidebar-link">
                    <div className="sidebar-image">
                      <img src={item.img || "/vangolu.jpg"} alt={item.title} />
                    </div>
                    <div className="sidebar-text">
                      <h4 className="sidebar-headline">{item.title}</h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {newsItems.length === 0 && (
        <div className="anasayfa-empty">
          <p>Henüz haber bulunmuyor.</p>
        </div>
      )}
    </div>
  );
}
