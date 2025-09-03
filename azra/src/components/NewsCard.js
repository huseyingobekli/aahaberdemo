import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './NewsCard.css';

const NewsCard = ({ news, onSwipe, showMessage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState(null);
  const cardRef = useRef(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event, info) => {
    const { offset } = info;
    if (offset.x > 50) {
      setDragDirection('right');
    } else if (offset.x < -50) {
      setDragDirection('left');
    } else {
      setDragDirection(null);
    }
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    setDragDirection(null);

    const { offset, velocity } = info;
    const swipeThreshold = 100;
    const velocityThreshold = 500;

    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
      if (offset.x > 0) {
        onSwipe('right');
      } else {
        onSwipe('left');
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="news-card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: isDragging
          ? dragDirection === 'right'
            ? 5
            : dragDirection === 'left'
            ? -5
            : 0
          : 0,
      }}
      exit={{
        opacity: 0,
        x: dragDirection === 'right' ? 350 : -350,
        y: -40,
        scale: 0.85,
        rotate: dragDirection === 'right' ? 20 : -20,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 35,
      }}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url('${news.image}')` }}
      >
        <div className="card-overlay"></div>
      </div>

      <div className="card-content">
        <span className="card-category">{news.category}</span>
        <h3 className="card-title">{news.title}</h3>
        <p className="card-summary">
          {news.summary.substring(0, 200)}...
        </p>
        <div className="card-meta">
          <span className="card-date">{news.date}</span>
          <span className="card-read-time">{news.readTime}</span>
        </div>
      </div>

      {/* Swipe Indicators */}
      <motion.div
        className={`swipe-indicator like ${dragDirection === 'right' ? 'show' : ''}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: dragDirection === 'right' ? 1 : 0,
          scale: dragDirection === 'right' ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        ⏭️ Sonraki Haber
      </motion.div>

      <motion.div
        className={`swipe-indicator dislike ${dragDirection === 'left' ? 'show' : ''}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: dragDirection === 'left' ? 1 : 0,
          scale: dragDirection === 'left' ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        📖 Haberi Oku
      </motion.div>

      {/* Drag Hint */}
      {!isDragging && (
        <motion.div
          className="drag-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="hint-arrows">
            <span>←</span>
            <span>→</span>
          </div>
          <p>Haberleri kaydırın</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NewsCard;
