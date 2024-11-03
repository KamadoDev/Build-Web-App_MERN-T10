import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import { IoIosClose } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { Button } from "@mui/material";
import { IoIosSave } from "react-icons/io";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

const CategoryCreate = () => {
  const navigate = useNavigate();

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClick = (event, path) => {
    event.preventDefault();
    navigate(path); // Điều hướng đến đường dẫn được truyền vào
  };

  const exampleProductData = {
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: "99.99",
    description:
      "High-quality wireless Bluetooth headphones with noise cancellation and up to 20 hours of battery life.",
    status: "new",
    productStock: "50",
    tags: ["Bluetooth", "Wireless", "Noise Cancellation", "Headphones"],
    image: null, // Giả sử đây là hình ảnh được chọn từ file upload
  };
  const [tagInput, setTagInput] = useState("");
  const [productData, setProductData] = useState(exampleProductData);

  const handleTagAdd = (event) => {
    if (event.key === "Enter" && tagInput.trim()) {
      setProductData({
        ...productData,
        tags: [...productData.tags, tagInput.trim()],
      });
      setTagInput(""); // Xóa nội dung trường tag sau khi thêm
      event.preventDefault();
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setProductData({
      ...productData,
      tags: productData.tags.filter((tag) => tag !== tagToDelete),
    });
  };
  return (
    <>
      <div className="card shadow my-4 border-0 flex-center p-3">
        <div className="flex items-center justify-between">
          <h1 className="font-weight-bold mb-0">Create new product</h1>
          <div className="ml-auto flex items-center gap-3">
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                  component="a"
                  label="Home"
                  icon={<HomeIcon fontSize="small" />}
                  onClick={(event) => handleClick(event, "/")}
                />
                <StyledBreadcrumb
                  component="a"
                  label="products"
                  disabled
                  onClick={(event) => handleClick(event, "/products")}
                />
                <StyledBreadcrumb
                  label="create"
                  onClick={(event) => handleClick(event, "/products/create")}
                />
              </Breadcrumbs>
            </div>
          </div>
        </div>
      </div>

      <form>
        <div className="card shadow my-4 border-0 flex-center p-3">
          <h2 className="text-black/55 mb-4 capitalize text-lg">
            Basic Information
          </h2>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <TextField
                  id="name"
                  name="name"
                  label="Product Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter a product name"
                  required
                />
                <FormHelperText>Required</FormHelperText>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="descriptions">Descriptions</label>
                <TextField
                  id="descriptions"
                  name="descriptions"
                  label="Descriptions"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter a Descriptions"
                  required
                />
                <FormHelperText>Required</FormHelperText>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <TextField
                  id="price"
                  name="price"
                  label="Price"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter price"
                  required
                />

                <FormHelperText>Error</FormHelperText>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-required-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={age}
                    label="Category"
                    required
                    onChange={handleChange}
                    renderValue={(value) => `⚠️  - ${value}`}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText>required</FormHelperText>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="category">Sub Category</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    Sub Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={age}
                    label="Sub Category"
                    required
                    onChange={handleChange}
                    renderValue={(value) => `⚠️  - ${value}`}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText>Error</FormHelperText>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="oldPrice">Old Price</label>
                <TextField
                  id="oldPrice"
                  name="oldPrice"
                  label="Old Price"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Please enter old price"
                />

                <FormHelperText>Error</FormHelperText>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Is Featured</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    Is Featured
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={age}
                    label="Is Featured"
                    required
                    onChange={handleChange}
                    renderValue={(value) => `⚠️  - ${value}`}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>True</MenuItem>
                    <MenuItem value={20}>False</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText>Error</FormHelperText>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="productStock">Product Stock</label>
                <TextField
                  id="productStock"
                  name="productStock"
                  label="Product Stock"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Please enter product stock"
                />

                <FormHelperText>Error</FormHelperText>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Brand</label>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-required-label">
                    Brand
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={age}
                    label="Brand"
                    required
                    onChange={handleChange}
                    renderValue={(value) => `⚠️  - ${value}`}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Hihi</MenuItem>
                    <MenuItem value={20}>haha</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText>Error</FormHelperText>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="discount">Discount</label>
                <TextField
                  id="discount"
                  name="discount"
                  label="Discount"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Please enter discount"
                />
                <FormHelperText>Error</FormHelperText>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="oldPrice">Add tags</label>
                <TextField
                  label="Add Tags"
                  variant="outlined"
                  fullWidth
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagAdd}
                  placeholder="Press Enter to add tag"
                />
                <div className="tag-list mt-2">
                  {productData.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleTagDelete(tag)}
                      color="primary"
                      variant="outlined"
                      style={{ marginRight: "4px", marginBottom: "4px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow my-4 border-0 flex-center p-3">
          <h2 className="text-black/55 mb-4 capitalize text-lg">
            Upload images
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="imgUploadBoxWrapper">
              <span className="remove flex items-center justify-center">
                <IoIosClose />
              </span>
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                <img
                  src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                  alt="upload images"
                />
              </div>
            </div>
            <div className="imgUploadBoxWrapper">
              <span className="remove flex items-center justify-center w-[20px] h-[20px]">
                <IoIosClose />
              </span>
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                <img
                  src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                  alt="upload images"
                />
              </div>
            </div>
            <div className="imgUploadBoxWrapper">
              <span className="remove flex items-center justify-center w-[20px] h-[20px]">
                <IoIosClose />
              </span>
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                <img
                  src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                  alt="upload images"
                />
              </div>
            </div>
            <div className="imgUploadBoxWrapper">
              <span className="remove flex items-center justify-center w-[20px] h-[20px]">
                <IoIosClose />
              </span>
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                <img
                  src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                  alt="upload images"
                />
              </div>
            </div>
            <div className="imgUploadBoxWrapper">
              <span className="remove flex items-center justify-center w-[20px] h-[20px]">
                <IoIosClose />
              </span>
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                <img
                  src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                  alt="upload images"
                />
              </div>
            </div>
            <div className="imgUploadBoxWrapper">
              <span className="remove flex items-center justify-center w-[20px] h-[20px]">
                <IoIosClose />
              </span>
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                <img
                  src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                  alt="upload images"
                />
              </div>
            </div>
            <div className="imgUploadBoxWrapper">
              <span className="remove flex items-center justify-center w-[20px] h-[20px]">
                <IoIosClose />
              </span>
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                <img
                  src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                  alt="upload images"
                />
              </div>
            </div>

            <div className="imgUploadBoxWrapper">
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300 flex items-center justify-center flex-col">
                <input type="file" />
                <FcAddImage className="icon" />
                <h4>Image Upload</h4>
              </div>
            </div>
          </div>

          <div className="border-0 mt-5 flex w-100">
            <div className="ml-auto">
              <Button
                type="submit"
                className="flex items-center mr-2 py-2"
                variant="contained"
                color="primary"
              >
                <IoIosSave className="mr-1" style={{ fontSize: "25px" }} />
                <span className="text-sm capitalize">Create product</span>
              </Button>
              <Button
                type="submit"
                className="flex items-center mr-2 py-2"
                variant="contained"
                color="error"
              >
                <IoIosClose style={{ fontSize: "25px" }} />
                <span className="text-sm capitalize">Cancle</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryCreate;
