import Dialog from "@mui/material/Dialog";
import { Button, Rating } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useContext } from "react";
import QuantityBox from "../QuantityBox";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";
import ProductZoom from "../ProductZoom";

const ProductModal = (props) => {
  const context = useContext(MyContext);
  
  return (
    <>
      <Dialog
        onClose={() => context.setisOpenProductModal(false)}
        className="product-modal"
        open={true}
      >
        <Button
          className="close_country"
          onClick={() => context.setisOpenProductModal(false)}
        >
          <IoMdClose />
        </Button>
        <h4 className="mb-1 font-weight-bold pr-5">
          Apple iPhone 15 256GB Black
        </h4>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <span>Brands:</span>
            <span className="ml-2">Apple</span>
          </div>
          <Rating
            name="read-only"
            value={4.5}
            size="small"
            precision={0.5}
            readOnly
          />
        </div>

        <hr />

        <div className="row mt-2 productDetailModal">
          <div className="col-md-5">
            <ProductZoom/>
          </div>
          <div className="col-md-7">
            <div className="d-flex info  align-items-center mb-3">
              <span className="oldPrice lg">$9.50</span>
              <span className="newPrice lg text-danger ml-2">$9.50</span>
            </div>
            <span className="badge badge-span bg-success text-white">
              In Stock
            </span>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              cursus, orci sed condimentum facilisis, justo neque cursus velit,
              in elementum mauris nunc vitae neque. Quisque non condimentum
              arcu. Nulla facilisi.
            </p>
            <div className="d-flex align-items-center">
              <QuantityBox />
              <Button className="btn-blue text-white bg-red btn-lg btn-big btn-round ml-3 ">
                Add to cart
              </Button>
            </div>
            <div className="d-flex align-items-center mt-5 actions">
              <Button className="btn-round" variant="outlined">
                {" "}
                <IoIosHeartEmpty /> ADD to WISHLIST
              </Button>
              <Button className=" ml-3 btn-round" variant="outlined">
                {" "}
                <MdOutlineCompareArrows /> COMPARE
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductModal;
