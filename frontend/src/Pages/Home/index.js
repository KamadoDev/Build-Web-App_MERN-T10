import HomeBanner from "../../Components/HomeBanner";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";

import ProductItemSlide from "../../Components/ProductItemSlide";
import HomeCatSilde from "../../Components/HomeCatSlide";
import ProductItem from "../../Components/ProductItem";
import { IoMailOutline } from "react-icons/io5";

import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import coupons from "../../assets/images/coupons.png";

const Home = () => {
  return (
    <>
      <HomeBanner />

      <HomeCatSilde />
      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner">
                  <img
                    className="cursor w-100"
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1726765914/1726765914505_1726335353673_New_Project_26.jpg"
                    alt="cursor"
                  />
                </div>
                <div className="banner">
                  <img
                    className="cursor w-100"
                    src="https://res.cloudinary.com/da26rdzwp/image/upload/v1726335522/1726335520004_home-20-product-block-collection-3.webp"
                    alt="cursor"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-9 productRow">
              {/* BESTSELLERS */}
              <div className="d-flex align-items-center">
                <div className="info">
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-title mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>

                <Button className="viewAllBtn ml-auto">
                  View All <IoIosArrowRoundForward />{" "}
                </Button>
              </div>

              <div className="product_row w-100 mt-4">
                <ProductItemSlide />
              </div>
              {/* BESTSELLERS END*/}

              {/* NEW PRODUCTS */}
              <div className="d-flex align-items-center mt-5">
                <div className="info">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-title mb-0">
                    New products with updated stocks.
                  </p>
                </div>

                <Button className="viewAllBtn ml-auto">
                  View All <IoIosArrowRoundForward />{" "}
                </Button>
              </div>

              <div className="product_row productWrap w-100 mt-4">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </div>
              {/* NEW PRODUCTS END */}

              {/* Banner Ads */}
              <div className="mt-4 mb-5 bannerSec">
                <div className="bannerBot">
                  <img src={banner4} alt="" className="w-100" />
                </div>
                <div className="bannerBot">
                  <img src={banner3} alt="" className="w-100" />
                </div>
              </div>

              {/* Banner Ads end*/}
            </div>
          </div>
        </div>
      </section>

      <section className="newLetterSection mb-3 mt-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white text-discount mb-1">
                $20 discount for your first order
              </p>
              <h2 className="text-white mb-2">Join Our Newsletter</h2>
              <p className="text-light text-subscription mb-4">
                Join our email subscription now to get updates on <br />{" "}
                promotions and coupons.
              </p>

              <form>
                <IoMailOutline />
                <input type="text" placeholder="Enter your email" required />
                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={coupons} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
