import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";

// import required modules
import { Rating } from "@mui/material";
import ProductModal from "../ProductModal";
import { MyContext } from "../../App";

const ProductItem = (props) => {
  const [value, setValue] = React.useState(4.5);

  const context = useContext(MyContext);
  const viewProductDetails = (id) => {
    context.setisOpenProductModal(true);
  };

  const closeProductModal = () => {
    context.setisOpenProductModal(false);
  };

  return (
    <>
      <div className={`item productItem ${props.itemView}`}>
        <div className="imgWrapper">
          <img
            className="w-100"
            src="https://res.cloudinary.com/da26rdzwp/image/upload/v1726295320/1726295319581_nivea-24-hour-melt-in-moisture-caring-lip-balm-cherry-shine-4-8-g-product-images-o490180140-p490180140-0-202203170330_1.webp"
            alt=""
          />
          <span className="badge">28% off</span>
          <div className="actions">
            <Button onClick={() => viewProductDetails(1)}>
              <TfiFullscreen />
            </Button>
            <Button>
              <IoMdHeartEmpty style={{ fontSize: "20px" }} />
            </Button>
          </div>
        </div>

        <div className="info">
          <h4 className="">pink solid casual shirt...</h4>
          <span className="text-success d-block">In stock</span>
          <Rating
            className="mt-2 mb-2"
            name="read-only"
            value={value}
            readOnly
            size="small"
            precision={0.5}
          />

          <div className="d-flex">
            <span className="oldPrice">$20.00</span>
            <span className="newPrice text-danger ml-2">$14.00</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
