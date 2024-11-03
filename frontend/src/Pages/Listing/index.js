import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ProductItem from "../../Components/ProductItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four");
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <section className="product_listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <Sidebar />

            <div className="content_right">
              <Link to="/" className="d-block">
                <img
                  className="w-100"
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg"
                  alt=""
                  style={{ borderRadius: "8px" }}
                />
              </Link>

              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button className={productView === 'one' && 'act'} onClick={() => setProductView("one")}>
                    <TfiMenu />
                  </Button>
                  <Button className={productView === 'three' && 'act'} onClick={() => setProductView("three")}>
                    <BsGrid3X3GapFill />
                  </Button>
                  <Button className={productView === 'four' && 'act'} onClick={() => setProductView("four")}>
                    <TfiLayoutGrid4Alt />
                  </Button>
                </div>
                <div className="ml-auto showByFilter">
                  <Button onClick={handleClick}>
                    Show 10 <FaAngleDown />{" "}
                  </Button>
                  <Menu
                    className="showPerPageDropdown"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openDropdown}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>10</MenuItem>
                    <MenuItem onClick={handleClose}>20</MenuItem>
                    <MenuItem onClick={handleClose}>30</MenuItem>
                  </Menu>
                </div>
              </div>

              <div className="productListing">
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
                <ProductItem itemView={productView} />
              </div>

              <div className="d-flex align-items-center justify-content-center mt-5">
                <Pagination count={10} color="secondary" size="large" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
