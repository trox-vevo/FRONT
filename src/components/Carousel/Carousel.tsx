import { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({ 
  items, 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slideContainer}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`
            }}
          >
            <img src={item.imageUrl} alt={item.title} className={styles.image} />
            <div className={styles.content}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.link && (
                <a href={item.link} className={styles.link}>
                  Learn More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <button 
        className={`${styles.arrow} ${styles.prev}`}
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button 
        className={`${styles.arrow} ${styles.next}`}
        onClick={goToNext}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className={styles.indicators}>
        {items.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 