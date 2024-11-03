import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";

const Navigation = () => {
  const [isOpenSibarVal, setIsOpenSidebarNav] = useState(false);
  return (
    <>
      <nav>
        <div className="container">
          <div className="row">
            {/* Navigation ALL CATEGORY */}
            <div className="col-sm-2 navPart1">
              <div className="catWrapper">
                <Button
                  className="allCatTab align-items-center"
                  onClick={() => setIsOpenSidebarNav(!isOpenSibarVal)}
                >
                  <span className="icon1 mr-2">
                    <IoIosMenu />
                  </span>
                  <span class="text">ALL CATEGORIES</span>
                  <span className="icon2 ml-2">
                    <FaAngleDown />
                  </span>
                </Button>

                <div
                  className={`sidebarNav ${
                    isOpenSibarVal === true ? "open" : ""
                  }`}
                >
                  <ul>
                    <li>
                      <Link to="/">
                        <Button>Women <FaAngleRight className="ml-auto"/></Button>
                      </Link>
                      <div className="submenu">
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Men <FaAngleRight className="ml-auto"/></Button>
                      </Link>
                      <div className="submenu">
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Kids <FaAngleRight className="ml-auto"/></Button>
                      </Link>
                      <div className="submenu">
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Women <FaAngleRight className="ml-auto"/></Button>
                      </Link>
                      <div className="submenu">
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                        <Link to="/">
                          <Button>Kids</Button>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Men <FaAngleRight className="ml-auto"/></Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Kids <FaAngleRight className="ml-auto"/></Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Navigation ALL CATEGORY */}

            {/* Navigation HEADER */}
            <div className="col-sm-10 navPart2 d-flex align-items-center">
              <ul className="list list-inline ml-auto">
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Home</Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Fashion</Button>
                  </Link>
                  {/* SUB CATEGORY */}
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Fashion Sub 1</Button>
                    </Link>
                    <Link to="/">
                      <Button>Fashion Sub 2</Button>
                    </Link>
                    <Link to="/">
                      <Button>Fashion Sub 3</Button>
                    </Link>
                  </div>
                  {/* SUB CATEGORY END */}
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Electronic</Button>
                  </Link>
                  {/* SUB CATEGORY */}
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Fashion Sub 1</Button>
                    </Link>
                    <Link to="/">
                      <Button>Fashion Sub 2</Button>
                    </Link>
                    <Link to="/">
                      <Button>Fashion Sub 3</Button>
                    </Link>
                  </div>
                  {/* SUB CATEGORY END */}
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Bakery</Button>
                  </Link>
                  {/* SUB CATEGORY */}
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Fashion Sub 1</Button>
                    </Link>
                    <Link to="/">
                      <Button>Fashion Sub 2</Button>
                    </Link>
                    <Link to="/">
                      <Button>Fashion Sub 3</Button>
                    </Link>
                  </div>
                  {/* SUB CATEGORY END */}
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Grocery</Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Blog</Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Contact Us</Button>
                  </Link>
                </li>
              </ul>
            </div>
            {/* Navigation HEADER END*/}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
