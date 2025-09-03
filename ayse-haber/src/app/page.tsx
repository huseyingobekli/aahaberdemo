'use client'

import TTSPlayer from '../components/TTSPlayer'
import PollGenerator from '../components/PollGenerator'
import aaLogo from '../assets/aalogo.png'
import vangolu from '../assets/vangolu.jpg'

export default function HomePage() {
  const articleText = `Küresel ısınma ve kuraklık Bitlis'teki göllerde su seviyesini düşürdü. Son zamanlarda yağış oranlarının düşmesi ve sıcaklığın artması sonucu yaşanan kuraklık nedeniyle Bitlis'teki göllerin seviyesindeki düşüş bu yıl da devam etti. Birçok türden kuşa ev sahipliği yapan Van Gölü kıyıları ile Adilcevaz ilçesindeki Aygır ve Arin, Ahlat ilçesindeki Nazik ile Tatvan ilçesindeki Nemrut Krater göllerinde kuraklığın etkisiyle su kaybı yaşanıyor. Bu nedenle büyük çekilmenin yaşandığı Van Gölü kıyılarında mikrobiyalitler, diğer göllerin kıyılarında da önceden su altında olan geniş alanlar gün yüzüne çıkıyor. Bölgedeki besiciler, metrelerce çekilmenin ardından yeşeren kıyılardaki arazilerde hayvanlarını otlatıyor. Uzmanlık alanı coğrafya olan Bitlis Eren Üniversitesi (BEÜ) Rektörü Prof. Dr. Necmettin Elmastaş, AA muhabirine, son yıllarda Türkiye'de ve dünyada kuraklık probleminin yaşandığını söyledi. Küresel ısınmayla Türkiye'de de son yıllarda yağışlarda dengesizliğin ve aynı zamanda azalmanın söz konusu olduğunu belirten Elmastaş, Van Gölü Havzası'nda da kuraklık yaşandığını, son 4-5 yıldır yağışlarda sürekli azalma olduğunu belirtti. Havzada Van Gölü başta olmak üzere Arin, Nemrut Krater, Nazik ve Aygır göllerinde ciddi bir seviye alçalması var. Geçmişteki çalışmalara baktığımızda Van Gölü Havzası'ndaki su seviyesinin alçalmasının temel nedeni yağışlardır. Yağışın azaldığı yıllarda seviye alçalması yaşanıyor. Van Gölü'nde su seviyesinin alçalmasının en önemli faktörünün yağışlar olduğuna dikkati çeken Elmastaş, gölün yeraltı su kaynaklarından da beslendiğini ancak bu kaynakların da azaldığını kaydetti. Havzadaki tarım alanlarında sulama amacıyla kullanılan binlerce sondaj kuyusunun bulunduğunu belirten Elmastaş, suyun fazla çekilmesiyle bazı kaynaklar kurumaya, yeraltı su seviyesi alçalmaya başladığını söyledi. Kuraklığın azaltılması ya da göl seviyesinin alçalmasının önüne bir nebze de olsun geçilmesinde kaynakların tasarruflu kullanılması etkili olabilecek. Seviye alçalmasının daha fazla olmaması için tarım arazilerinde suyun israf edilmeden olabildiğince dikkatle kullanılması gerekiyor. Her gölün bir ekosistem olduğunu ifade eden Elmastaş, özellikle Arin Gölü'nün yarısından fazlasının çekildiği bilgisini paylaştı. Birçok kuş türünün yaşadığı Arin Gölü'nün önemli bir ekosistem olduğunu vurgulayan Elmastaş, Nazik Gölü ve Nemrut Kalderası'nın ayrı bir ekosistem olduğunu, Nemrut'un aynı zamanda küçük bir mikroklima alanı olduğunu belirtti. Su ortamları azalınca ve bu alanlar küçülünce ekosistemde de bir dengesizlik yaşanmakta. Bu durum havzada yaşayan canlılar için de bir risk taşıyor. Mesela Arin Gölü, flamingo gibi bazı kuş türlerinin yaşadığı alan. Arin Gölü biraz daha azalırsa belki bir süre sonra onları burada göremeyeceğiz. Göl seviyelerindeki alçalma, karada ve suda yaşayan canlı türlerini etkiliyor. Ekosistemin bozulmaması adına bu dengenin korunması gerekiyor.`;

  return (
    <>
      <header className="aa-header">
        <div className="inner">
          <div className="aa-logo"><img src={aaLogo.src} alt="AA" /></div>
          <div className="aa-title">Küresel ısınma ve kuraklık Bitlis'teki göllerde su seviyesini düşürdü</div>
          <div className="aa-right-sep"></div>
          <div className="aa-burger" aria-hidden>
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>

      {/* Fixed agenda at right side under the header */}
      <div className="agenda-fixed">
        <div className="agenda">
          <h3>Gündem</h3>
          <div className="agenda-item"><a href="#">Sultan Sazlığı Kuş Cenneti'ndeki kuraklık daha az su isteyen ürünlerin ekimiyle çözülmesi hedefleniyor</a></div>
          <div className="agenda-item"><a href="#">Anıtkabir 30 Ağustos'ta 630 bini aşkın ziyaretçiyi ağırladı</a></div>
          <div className="agenda-item"><a href="#">Ankara'daki 26 katlı apartman yangını davası 14 Kasım'da başlıyor</a></div>
          <div className="agenda-item"><a href="#">Türk Kızılaydan Afganistan'daki depremzedelere destek</a></div>
          <div className="agenda-item"><a href="#">İstanbul'da 417,5 kilogram uyuşturucu madde ele geçirildi</a></div>
        </div>
      </div>

      <main className="container">
        

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
                      <h2 className="article-location">Bitlis</h2>
                    </div>
                    <div className="article-content">
                      <TTSPlayer text={articleText} variant="default" />
                      <p className="article-lead">
                        Son zamanlarda yağış oranlarının düşmesi ve sıcaklığın artması sonucu yaşanan kuraklık nedeniyle Bitlis'teki göllerin seviyesindeki düşüş bu yıl da devam etti.
                      </p>
                      
                      <p>
                        Birçok türden kuşa ev sahipliği yapan Van Gölü kıyıları ile Adilcevaz ilçesindeki Aygır ve Arin, Ahlat ilçesindeki Nazik ile Tatvan ilçesindeki Nemrut Krater göllerinde kuraklığın etkisiyle su kaybı yaşanıyor.
                      </p>
                      
                      <p>
                        Bu nedenle büyük çekilmenin yaşandığı Van Gölü kıyılarında mikrobiyalitler, diğer göllerin kıyılarında da önceden su altında olan geniş alanlar gün yüzüne çıkıyor.
                      </p>
                    </div>
                  </div>
                  
                  <div className="photo-slider">
                    <div className="photo-container">
                      <img src={vangolu.src} alt="Van Gölü" className="photo-main" />
                      <div className="photo-overlay">
                        <div className="photo-credit">Harun Nacar</div>
                      </div>
                    </div>
                    <button className="nav-arrow nav-left">‹</button>
                    <button className="nav-arrow nav-right">›</button>
                  </div>
                </div>
                
                <div className="article-content-full">
                  <div className="whatsapp-box">
                        <h4>📲 Artık haberler size gelsin</h4>
                        <p>AA'nın WhatsApp kanallarına katılın, önemli gelişmeler cebinize düşsün.</p>
                        <div className="whatsapp-links">
                          <div>🔹 Gündemdeki gelişmeler, özel haber, analiz, fotoğraf ve videolar için Anadolu Ajansı</div>
                          <div>🔹 Anlık gelişmeler için AA Canlı</div>
                        </div>
                      </div>
                      
                      <p>
                        Bölgedeki besiciler, metrelerce çekilmenin ardından yeşeren kıyılardaki arazilerde hayvanlarını otlatıyor.
                      </p>
                      
                      <p>
                        Uzmanlık alanı coğrafya olan Bitlis Eren Üniversitesi (BEÜ) Rektörü Prof. Dr. Necmettin Elmastaş, AA muhabirine, son yıllarda Türkiye'de ve dünyada kuraklık probleminin yaşandığını söyledi.
                      </p>
                      
                      <p>
                        Küresel ısınmayla Türkiye'de de son yıllarda yağışlarda dengesizliğin ve aynı zamanda azalmanın söz konusu olduğunu belirten Elmastaş, şöyle konuştu:
                      </p>
                      
                      <blockquote>
                        "Van Gölü Havzası'nda da kuraklık yaşanıyor. Son 4-5 yıldır yağışlarda sürekli azalma var. Artış yönünde değişim olmadığı için kuraklığın şiddeti giderek devam ediyor. Havzada Van Gölü başta olmak üzere Arin, Nemrut Krater, Nazik ve Aygır göllerinde ciddi bir seviye alçalması var. Geçmişteki çalışmalara baktığımızda Van Gölü Havzası'ndaki su seviyesinin alçalmasının temel nedeni yağışlardır. Yağışın azaldığı yıllarda seviye alçalması yaşanıyor. Son yıllarda bunu görebiliyoruz."
                      </blockquote>
                      
                      <h3>"Tarım arazilerinde suyun israf edilmeden kullanılması gerekiyor"</h3>
                      
                      <p>
                        Van Gölü'nde su seviyesinin alçalmasının en önemli faktörünün yağışlar olduğuna dikkati çeken Elmastaş, gölün yeraltı su kaynaklarından da beslendiğini ancak bu kaynakların da azaldığını kaydetti.
                      </p>
                      
                      <p>
                        Havzadaki tarım alanlarında sulama amacıyla kullanılan binlerce sondaj kuyusunun bulunduğunu belirten Elmastaş, şu değerlendirmelerde bulundu:
                      </p>
                      
                      <p>
                        "Suyun fazla çekilmesiyle bazı kaynaklar kurumaya, yeraltı su seviyesi alçalmaya başladı. Yaptığımız çalışmalarda bu yönde bazı veriler ortaya çıktı. Kuraklığın azaltılması ya da göl seviyesinin alçalmasının önüne bir nebze de olsun geçilmesinde kaynakların tasarruflu kullanılması etkili olabilecek. Seviye alçalmasının daha fazla olmaması için tarım arazilerinde suyun israf edilmeden olabildiğince dikkatle kullanılması gerekiyor. Kaynakların azalması da alçalmayı tetiklemektedir."
                      </p>
                      
                      <h3>"Havzada yaşayan canlılar için de bir risk taşıyor"</h3>
                      
                      <p>
                        Her gölün bir ekosistem olduğunu ifade eden Elmastaş, özellikle Arin Gölü'nün yarısından fazlasının çekildiği bilgisini paylaştı.
                      </p>
                      
                      <p>
                        Birçok kuş türünün yaşadığı Arin Gölü'nün önemli bir ekosistem olduğunu vurgulayan Elmastaş, şunları dile getirdi:
                      </p>
                      
                      <p>
                        "Nazik Gölü ve Nemrut Kalderası ayrı bir ekosistem. Nemrut aynı zamanda küçük bir mikroklima alanı. Farklı canlıların yaşadığı alanlar. Su ortamları azalınca ve bu alanlar küçülünce ekosistemde de bir dengesizlik yaşanmakta. Bu durum havzada yaşayan canlılar için de bir risk taşıyor. Mesela Arin Gölü, flamingo gibi bazı kuş türlerinin yaşadığı alan. Arin Gölü biraz daha azalırsa belki bir süre sonra onları burada göremeyeceğiz. Göl seviyelerindeki alçalma, karada ve suda yaşayan canlı türlerini etkiliyor. Ekosistemin bozulmaması adına bu dengenin korunması gerekiyor."
                      </p>
                </div>
                
                <PollGenerator articleText={articleText} />
              </div>
            </div>
          </article>

          {/* aside removed; agenda is fixed outside container */}
        </section>
      </main>
    </>
  )
}
