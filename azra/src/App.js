import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import NewsCard from './components/NewsCard';
import HaberDetay from './components/HaberDetay';
import { newsData } from './data/newsData';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showHaberDetay, setShowHaberDetay] = useState(false);
  const [selectedHaber, setSelectedHaber] = useState(null);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      // Sola kaydırma - Haberi oku
      setSelectedHaber(newsData[currentIndex]);
      setShowHaberDetay(true);
    } else if (direction === 'right') {
      // Sağa kaydırma - Sonraki haber
      setMessage('Sonraki habere geçiliyor ⏭️');
      setMessageType('info');
      setShowMessage(true);
      
      setTimeout(() => {
        if (currentIndex < newsData.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // Tüm haberler bitti
          setMessage('🎉 Tüm haberler tamamlandı!');
          setMessageType('success');
        }
        setShowMessage(false);
      }, 1000);
    }
  };

  const handleBackFromHaber = () => {
    setShowHaberDetay(false);
    setSelectedHaber(null);
  };

  const showResultMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  if (currentIndex >= newsData.length) {
    return (
      <div className="container">
        <div className="final-results">
          <h2>🎉 Tüm Haberler Tamamlandı!</h2>
          <div className="final-content">
            <p>Tüm haberleri okudunuz!</p>
            <button onClick={() => window.location.reload()}>
              Tekrar Başla
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Haber detay sayfası gösteriliyorsa
  if (showHaberDetay && selectedHaber) {
    return (
      <HaberDetay 
        haber={selectedHaber} 
        onBack={handleBackFromHaber} 
      />
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <div className="logo-container">
            <div className="aa-logo">
              <div className="aa-monogram">
                <div className="aa-arc"></div>
                <div className="aa-letters">AA</div>
              </div>
              <span className="aa-subtitle">Anadolu Ajansı</span>
            </div>
          </div>
          <h1>Haber Kartları</h1>
          <p>Sol: Haberi Oku | Sağ: Sonraki Haber</p>
        </header>

        <div className="card-container">
          <AnimatePresence mode="wait">
            <NewsCard
              key={currentIndex}
              news={newsData[currentIndex]}
              onSwipe={handleSwipe}
              showMessage={showResultMessage}
            />
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              className={`result-message ${messageType}`}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
