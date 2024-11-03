import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useRef, useState } from "react";


const ProductZoom = () => {
    const zoomSliderRefBig = useRef();
  const zoomSliderRef = useRef();
  const [slideIndex, setSlideIndex] = useState([0]);


  const settings2 = {
    dots: false,
    infinite: false,
    speed: 500, // Tốc độ chuyển đổi slide
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false, // Đảm bảo rằng fade không được bật nếu không muốn hiệu ứng mờ
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500, // Điều chỉnh tốc độ nếu cần thiết
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    fade: false, // Tắt fade
  };

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderRef.current.slickGoTo(index);
    zoomSliderRefBig.current.slickGoTo(index);
  };
    return (
        <>
        <div className="productZoom position-relative mb-3 productZoomBig">
              <div className="badge badge-primary">23%</div>
              <Slider
                {...settings2}
                className="zoomSliderBig"
                ref={zoomSliderRefBig}
              >
                <div className="item">
                  <img
                    className="img-fluid"
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961126/1725961124187_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                    alt=""
                  />
                </div>
                <div className="item">
                  <img
                    className="img-fluid"
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961127/1725961124195_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-1-202308161432.webp"
                    alt=""
                  />
                </div>
                <div className="item">
                  <img
                    className="img-fluid"
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961126/1725961124187_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                    alt=""
                  />
                </div>
                <div className="item">
                  <img
                    className="img-fluid"
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961126/1725961124187_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                    alt=""
                  />
                </div>
                <div className="item">
                  <img
                    className="img-fluid"
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961127/1725961124195_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-1-202308161432.webp"
                    alt=""
                  />
                </div>
                <div className="item">
                  <img
                    className="img-fluid"
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961126/1725961124187_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                    alt=""
                  />
                </div>
              </Slider>
            </div>
            <Slider {...settings} className="zoomSlider" ref={zoomSliderRef}>
              <div className={`item ${slideIndex === 0 && "item_active"}`}>
                <img
                  onClick={() => goto(0)}
                  className="img-fluid"
                  src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961127/1725961124195_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-1-202308161432.webp"
                  alt=""
                />
              </div>
              <div className={`item ${slideIndex === 1 && "item_active"}`}>
                <img
                  onClick={() => goto(1)}
                  className="img-fluid"
                  src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961126/1725961124187_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                  alt=""
                />
              </div>
              <div className={`item ${slideIndex === 2 && "item_active"}`}>
                <img
                  onClick={() => goto(2)}
                  className="img-fluid"
                  src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961126/1725961124187_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                  alt=""
                />
              </div>
              <div className={`item ${slideIndex === 3 && "item_active"}`}>
                <img
                  onClick={() => goto(3)}
                  className="img-fluid"
                  src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961127/1725961124195_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-1-202308161432.webp"
                  alt=""
                />
              </div>
              <div className={`item ${slideIndex === 4 && "item_active"}`}>
                <img
                  onClick={() => goto(4)}
                  className="img-fluid"
                  src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961126/1725961124187_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                  alt=""
                />
              </div>
              <div className={`item ${slideIndex === 5 && "item_active"}`}>
                <img
                  onClick={() => goto(5)}
                  className="img-fluid"
                  src="https://res.cloudinary.com/da26rdzwp/image/upload/v1725961126/1725961124187_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp"
                  alt=""
                />
              </div>
            </Slider>
        </>
    )
}

export default ProductZoom;