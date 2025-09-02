import React from 'react';
import { motion } from 'framer-motion';
import './HaberDetay.css';

const HaberDetay = ({ haber, onBack }) => {
  return (
    <motion.div
      className="haber-detay-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="haber-detay-container"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Ana Sayfaya Dön
        </button>
        
        <div className="article-header">
          <span className="article-category">{haber.category}</span>
          <h1 className="article-title">{haber.title}</h1>
          <div className="article-meta">
            <span><i className="fas fa-calendar"></i> {haber.date}</span>
            <span><i className="fas fa-clock"></i> {haber.readTime}</span>
            <span><i className="fas fa-user"></i> Editör</span>
          </div>
        </div>
        
        <div 
          className="article-image"
          style={{ backgroundImage: `url('${haber.image}')` }}
        ></div>
        
        <div className="article-content">
          {/* Giriş paragrafı */}
          <p className="article-intro">{haber.content.intro}</p>
          
          {/* Ana bölümler */}
          {haber.content.sections.map((section, index) => (
            <div key={index} className="article-section">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
          
          {/* Sonuç paragrafı */}
          <div className="article-conclusion">
            <h2>Sonuç</h2>
            <p>{haber.content.conclusion}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HaberDetay;
