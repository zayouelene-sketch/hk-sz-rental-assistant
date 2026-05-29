import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ImageCarousel({ images, title }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  function goPrevious() {
    setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  function goNext() {
    setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  function handleTouchEnd(event) {
    if (touchStartX === null) return;

    const deltaX = touchStartX - event.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 36) {
      deltaX > 0 ? goNext() : goPrevious();
    }
    setTouchStartX(null);
  }

  return (
    <div
      className="carousel"
      onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      <img src={images[imageIndex]} alt={title} />
      <button className="carousel-arrow left" type="button" onClick={goPrevious} aria-label="上一张图片">
        <ChevronLeft size={18} />
      </button>
      <button className="carousel-arrow right" type="button" onClick={goNext} aria-label="下一张图片">
        <ChevronRight size={18} />
      </button>
      <div className="image-counter">
        {imageIndex + 1}/{images.length}
      </div>
      <div className="carousel-dots">
        {images.map((image, index) => (
          <span className={index === imageIndex ? "active" : ""} key={image} />
        ))}
      </div>
    </div>
  );
}
