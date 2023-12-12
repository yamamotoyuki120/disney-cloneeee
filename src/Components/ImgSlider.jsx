import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { styled } from "styled-components";
const ImgSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div>
      <Carousel {...settings}>
        <Wrap>
          <Link>
            <img src="images/slider-badging.jpg" alt="" />
          </Link>
        </Wrap>

        <Wrap>
          <Link>
            <img src="images/slider-scale.jpg" alt="" />
          </Link>
        </Wrap>

        <Wrap>
          <Link>
            <img src="images/slider-badag.jpg" alt="" />
          </Link>
        </Wrap>

        <Wrap>
          <Link>
            <img src="images/slider-scales.jpg" alt="" />
          </Link>
        </Wrap>
      </Carousel>
    </div>
  );
};

const Carousel = styled(Slider)`
  /* margin-top: 10px; */
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease-in 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: whitesmoke;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;

    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.5);

    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;
