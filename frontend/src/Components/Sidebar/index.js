import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [value, setValue] = useState([200000, 6000000]);
  const [value2, setValue2] = useState(0);

  // Hàm định dạng tiền tệ VNĐ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sticky">
          <div className="fillterBox">
            <h6>PRODUCT CATEGORIES</h6>
            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>

                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Label"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="fillterBox">
            <h6>FILLTER BY PRICE</h6>
            <RangeSlider
              value={value}
              onInput={setValue}
              min={200000}
              max={10000000}
              step={5}
            />
            <div className="d-flex pt-2 pd-2 priceRange">
              <span>
                Từ:{" "}
                <strong className="text-dark">
                  {formatCurrency(value[0])}
                </strong>
              </span>
              <span className="ml-auto">
                Đến:{" "}
                <strong className="text-dark">
                  {formatCurrency(value[1])}
                </strong>
              </span>
            </div>
          </div>

          <div className="fillterBox">
            <h6>PRODUCT Status</h6>
            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Còn hàng"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Hết hàng"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="fillterBox">
            <h6>Brands</h6>
            <div className="scroll">
              <ul>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Thương hiệu"
                  />
                </li>
                <li>
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Thương hiệu"
                  />
                </li>
              </ul>
            </div>
          </div>
          <br />
          <Link to="/" className="d-block">
            <img
              src="https://res.cloudinary.com/dy2p0n2xc/image/upload/v1729058293/1729058292132_New_Project_34.jpg"
              alt=""
              className="w-100"
            />
          </Link>
        </div>
      </div>

      {/* Sidebar END */}
    </>
  );
};

export default Sidebar;
