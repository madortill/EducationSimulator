import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/InfoCarousel.css";
import data from "../data.json";

function InfoCarousel({chosenRole, activeIndex, setActiveIndex}) {

  // const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const carouselClass = `
    custom-carousel
    ${activeIndex === 0 ? "hide-prev" : ""}
    ${activeIndex ===  data["game-tree"][chosenRole].description.length - 1 ? "hide-next" : ""}
  `;

  return (
    <div className={carouselClass.trim()}>
     <Carousel
  data-bs-theme="dark"
  indicators
  interval={null}
  activeIndex={activeIndex}
  onSelect={handleSelect}
  nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
  prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
  nextLabel=""
  prevLabel=""
  touch={false}   // keep no-swipe if you want
  slide={false}    // MUST be true for animation
>
        { data["game-tree"][chosenRole].description.map((slide, index) => (
          <Carousel.Item key={index}>
            <Carousel.Caption>
              <p className="info-text">{slide}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default InfoCarousel;
