# Anadolu Ajansı Hackathon Demo 

Bu proje, Anadolu Ajansı hackathon'u için geliştirilmiş bir haber web uygulamasıdır. Anadolu Ajansı web sitesinin tasarımını taklit eder ve sesli okuma özelliği ile yapay zeka destekli anket sistemi içerir.

## Özellikler

- 📰 Anadolu Ajansı benzeri haber sayfası tasarımı
- 🔊 Metin-ses dönüştürme (Text-to-Speech) özelliği
- 🤖 Yapay zeka ile haber içeriğine dayalı anket oluşturma
- 📱 Responsive tasarım
- 🎯 Hız kontrolü ile sesli okuma

## Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **CSS** - Özel stil ve tasarım
- **Web Speech API** - Tarayıcı tabanlı sesli okuma
- **Google Gemini AI** - Anket oluşturma

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/huseyingobekli/aahaberdemo.git
cd aahaberdemo/ayse-haber
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## API Anahtarı

Gemini AI anket özelliği için API anahtarı gereklidir. `.env.local` dosyasında `NEXT_PUBLIC_GEMINI_API_KEY` değişkenini tanımlayın:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

## Proje Yapısı

```
ayse-haber/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Ana sayfa
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── TTSPlayer.jsx     # Sesli okuma bileşeni
│   │   └── PollGenerator.jsx # Anket bileşeni
│   └── assets/
│       ├── aalogo.png        # AA logosu
│       └── vangolu.jpg       # Haber görseli
├── public/
├── package.json
└── README.md
```

## Geliştirme

- `npm run dev` - Geliştirme sunucusu
- `npm run build` - Production build
- `npm run start` - Production sunucusu
- `npm run lint` - ESLint kontrolü

## Katkıda Bulunma

Bu proje Anadolu Ajansı hackathon'u için geliştirilmiştir. Katkılarınız için teşekkürler!
