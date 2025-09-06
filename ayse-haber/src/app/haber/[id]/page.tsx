"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TTSPlayer from "../../../components/TTSPlayer";
import PollGenerator from "../../../components/PollGenerator";
import vangolu from "../../../assets/vangolu.jpg";

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

export default function HaberDetay() {
  const params = useParams();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentItem, setCurrentItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

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
            .filter((item) => item.id && item.title);

          setNewsItems(items);

          const paramId = params.id as string;
          const foundItem = items.find((item) => item.id === paramId) || null;
          setCurrentItem(foundItem);
        }
      } catch (error) {
        console.error("Haber yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [params.id]);

  if (loading) {
    return (
      <div className="haber-loading">
        <div className="loading-spinner">Haber yükleniyor...</div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="haber-not-found">
        <h1>Haber bulunamadı</h1>
        <p>İstediğiniz haber mevcut değil.</p>
      </div>
    );
  }

  const parseContent = (content: string | string[] | undefined): string[] => {
    if (!content) return [];
    if (Array.isArray(content)) return content.filter(Boolean);
    return content.split(/\n\s*\n/).filter(Boolean);
  };

  const topParagraphs = parseContent(currentItem.contentTop);
  const bottomParagraphs = parseContent(currentItem.contentBottom);
  const articleText = currentItem.content || currentItem.description || "";

  return (
    <>
      {/* Fixed agenda at right side */}
      <div className="agenda-fixed">
        <div className="agenda">
          <h3>Gündem</h3>
          {newsItems.map((item) => (
            <div key={item.id} className="agenda-item">
              <a href={`/haber/${item.id}`}>{item.title}</a>
            </div>
          ))}
        </div>
      </div>

      <main className="container">
        <h1 className="main-article-title">{currentItem.title}</h1>

        <section className="grid">
          <article className="main">
            <div className="social">
              <a href="#">f</a>
              <a href="#">X</a>
              <a href="#">in</a>
              <a href="#">@</a>
              <a href="#">⤴</a>
            </div>
            <div>
              <div className="article-card">
                <div className="article-content-wrapper">
                  <div className="article-text-section">
                    <div className="article-meta">
                      <h2 className="article-location">
                        {currentItem.location || currentItem.city || " "}
                      </h2>
                    </div>
                    <div className="article-content">
                      <TTSPlayer text={articleText} variant="default" />
                      {topParagraphs.length > 0 ? (
                        topParagraphs.map((p, i) => (
                          <p
                            key={i}
                            className={i === 0 ? "article-lead" : undefined}
                          >
                            {p}
                          </p>
                        ))
                      ) : (
                        <p className="article-lead">İçerik yükleniyor...</p>
                      )}
                    </div>
                  </div>

                  <div className="photo-slider">
                    <div className="photo-container">
                      <img
                        src={currentItem.img || vangolu.src}
                        alt="Haber görseli"
                        className="photo-main"
                      />
                      <div className="photo-overlay">
                        <div className="photo-credit">
                          {currentItem.credit || ""}
                        </div>
                      </div>
                    </div>
                    <button className="nav-arrow nav-left">‹</button>
                    <button className="nav-arrow nav-right">›</button>
                  </div>
                </div>

                <div className="article-content-full">
                  <div className="whatsapp-box">
                    <h4>📲 Artık haberler size gelsin</h4>
                    <p>
                      AA'nın WhatsApp kanallarına katılın, önemli gelişmeler
                      cebinize düşsün.
                    </p>
                    <div className="whatsapp-links">
                      <div>
                        🔹 Gündemdeki gelişmeler, özel haber, analiz, fotoğraf
                        ve videolar için Anadolu Ajansı
                      </div>
                      <div>🔹 Anlık gelişmeler için AA Canlı</div>
                    </div>
                  </div>

                  {bottomParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <PollGenerator articleText={articleText} />
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
