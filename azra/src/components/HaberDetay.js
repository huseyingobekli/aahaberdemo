import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './navbar'; 
import './HaberDetay.css';


const HaberDetay = ({ haber, onBack }) => {
  return (
    <AnimatePresence>
      {haber && (
        <motion.div
          className="haber-detay-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
            <Navbar />
          <motion.div
            className="haber-detay-container"
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
              <p className="article-intro">{haber.content.intro}</p>

              {haber.content.sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="article-section"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                </motion.div>
              ))}

              <motion.div
                className="article-conclusion"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Sonuç</h2>
                <p>{haber.content.conclusion}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HaberDetay;
