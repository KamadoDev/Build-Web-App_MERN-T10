import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useEffect, useState } from "react";
import { IoIosClose, IoIosSave } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { MyContext } from "../../App";
import LinearProgress from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import { getData, postData } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";

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

const ProductCreate = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [dataCat, setDataCat] = useState([]);
  const [dataSubCat, setDataSubCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [ratingInput, setRatingInput] = useState(Number | null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    productInStock: "",
    category: "",
    sub_category: "",
    old_price: "",
    discount: "",
    isFeatured: "",
    numberReviews: 0,
    rating: 0,
    size: [],
    colors: [],
    tags: [],
    images: [],
  });

  useEffect(() => {
    setFormFields((prevFields) => ({
      ...prevFields,
      rating: ratingInput,
    }));
  }, [ratingInput]);

  const onChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Nếu trường là images, bạn không cần cập nhật images ở đây
    if (name !== "images") {
      setFormFields({ ...formFields, [name]: value });
    }
  };

  const handleSelectChange = (field, value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleItemAdd = (event, field, input, setInput) => {
    if (event.key === "Enter" && input.trim()) {
      setFormFields((prevFields) => ({
        ...prevFields,
        [field]: [...prevFields[field], input.trim()],
      }));
      setInput(""); // Xóa nội dung trường input sau khi thêm
      event.preventDefault();
    }
  };

  const handleItemDelete = (field, itemToDelete) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [field]:
        itemToDelete !== null
          ? prevFields[field].filter((item) => item !== itemToDelete)
          : [], // Xóa tất cả items nếu `itemToDelete` là null
    }));
  };

  const handleTagAdd = (event) =>
    handleItemAdd(event, "tags", tagInput, setTagInput);
  const handleTagDelete = (tagToDelete) =>
    handleItemDelete("tags", tagToDelete);
  const handleSizeAdd = (event) =>
    handleItemAdd(event, "size", sizeInput, setSizeInput);
  const handleSizeDelete = (sizeToDelete) =>
    handleItemDelete("size", sizeToDelete);
  const handleColorAdd = (event) =>
    handleItemAdd(event, "colors", colorInput, setColorInput);
  const handleColorDelete = (colorToDelete) =>
    handleItemDelete("colors", colorToDelete);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCat = await getData("/api/category");
        const resSubCat = await getData("/api/subcategory");
        setDataCat(resCat?.categories || []);
        setDataSubCat(resSubCat?.subcategories || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);
    return () => objectUrls.forEach(URL.revokeObjectURL);
  }, [files]);

  const onChangeFile = (e) => {
    const filesArr = Array.from(e.target.files);
    setFiles(filesArr);
  };
  const handleRemoveImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const createProduct = async (e) => {
    e.preventDefault();
    console.log(formFields);
    setLoading(true);
    window.scrollTo(0, 0);
    const {
      name,
      description,
      price,
      brand,
      productInStock,
      category,
      sub_category,
      old_price,
      discount,
      isFeatured,
      numberReviews = 0,
      size,
      colors,
      tags,
      rating,
    } = formFields;

    if (files.length === 0) {
      // Kiểm tra nếu không có ảnh nào được chọn
      context.setMessage("Vui lòng chọn hình ảnh!");
      context.setTypeMessage("error");
      context.setOpen(true);
      setLoading(false);
      return; // Dừng hàm nếu chưa có ảnh
    }

    // Chuẩn bị form data để gửi sản phẩm lên server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("productInStock", productInStock);
    formData.append("category", category);
    formData.append("sub_category", sub_category);
    formData.append("old_price", old_price);
    formData.append("discount", discount);
    formData.append("isFeatured", isFeatured);
    formData.append("numberReviews", numberReviews);
    formData.append("rating", rating);
    size.forEach((size) => formData.append("size", size)); // Thêm từng tag vào formData
    colors.forEach((color) => formData.append("colors", color)); // Thêm từng tag vào formData
    tags.forEach((tag) => formData.append("tags", tag)); // Thêm từng tag vào formData
    files.forEach((file) => formData.append("images", file)); // Thêm từng ảnh vào formData

    try {
      const response = await postData("/api/products/create", formData, true);
      console.log(response);
      if (response.success === true) {
        context.setMessage(response.message);
        context.setTypeMessage(response.type || "success");
        context.setOpen(true);
        navigate("/products/list");
      } else {
        context.setMessage(response.message || response.error.message);
        context.setTypeMessage(response.type || "error");
        context.setOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={createProduct}>
        {loading && <LinearProgress />}
        <div className="card shadow my-4 border-0 flex-center p-3">
          <div className="flex items-center justify-between">
            <h1 className="font-weight-bold mb-0">Create product</h1>
            <div className="ml-auto flex items-center gap-3">
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <StyledBreadcrumb
                    label="Dashboard"
                    icon={<HomeIcon fontSize="small" />}
                  />
                  <StyledBreadcrumb label="product" />
                  <StyledBreadcrumb label="create" />
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
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
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter a description"
                  onChange={onChangeInput}
                />
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
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Category"
                    name="category"
                    value={formFields.category}
                    onChange={(e) =>
                      handleSelectChange("category", e.target.value)
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {dataCat?.length ? (
                      dataCat.map((cat, index) => (
                        <MenuItem key={index} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No categories available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="sub_category">Sub Category</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    Sub Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Sub Category"
                    name="sub_category"
                    value={formFields.sub_category}
                    onChange={(e) =>
                      handleSelectChange("sub_category", e.target.value)
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {dataSubCat?.length ? (
                      dataSubCat.map((cat, index) => (
                        <MenuItem key={index} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No subcategories available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="old_price">Old Price</label>
                <TextField
                  id="old_price"
                  name="old_price"
                  label="Old Price"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter old price"
                  onChange={onChangeInput}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="isFeatured">Is Featured</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    Is Featured
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Is Featured"
                    name="isFeatured"
                    value={formFields.isFeatured}
                    onChange={(e) =>
                      handleSelectChange("isFeatured", e.target.value)
                    }
                  >
                    <MenuItem value={false}>False</MenuItem>
                    <MenuItem value={true}>True</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="productInStock">Product Stock</label>
                <TextField
                  id="productInStock"
                  name="productInStock"
                  label="Product Stock"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter product instock"
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <TextField
                  id="brand"
                  name="brand"
                  label="Brand"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter brand"
                  onChange={onChangeInput}
                />
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
                  placeholder="Please enter discount"
                  onChange={onChangeInput}
                />
              </div>
            </div>
            {/* TAGS */}
            <div className="col">
              <div className="form-group">
                <label htmlFor="oldPrice">Add Tags</label>
                <TextField
                  label="Add Tags"
                  variant="outlined"
                  fullWidth
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => handleTagAdd(e)}
                  placeholder="Press Enter to add tag"
                />
                <div className="tag-list mt-2">
                  {formFields.tags.length > 0 && (
                    <Chip
                      label="Clear All"
                      onClick={() => handleTagDelete(null)} // Xóa tất cả tags khi bấm vào "Clear All"
                      color="secondary"
                      variant="outlined"
                      style={{ marginRight: "4px", marginBottom: "4px" }}
                    />
                  )}
                  {formFields.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleTagDelete(tag)} // Xóa tag cụ thể
                      color="primary"
                      variant="outlined"
                      style={{ marginRight: "4px", marginBottom: "4px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* END TAGS */}

            {/* SIZE */}
            <div className="col">
              <div className="form-group">
                <label htmlFor="sizes">Add Sizes</label>
                <TextField
                  label="Add Sizes"
                  variant="outlined"
                  fullWidth
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  onKeyPress={(e) => handleSizeAdd(e)}
                  placeholder="Press Enter to add size"
                />
                <div className="size-list mt-2">
                  {formFields.size.length > 0 && (
                    <Chip
                      label="Clear All"
                      onClick={() => handleSizeDelete(null)} // Xóa tất cả sizes khi bấm vào "Clear All"
                      color="secondary"
                      variant="outlined"
                      style={{ marginRight: "4px", marginBottom: "4px" }}
                    />
                  )}
                  {formFields.size.map((size, index) => (
                    <Chip
                      key={index}
                      label={size}
                      onDelete={() => handleSizeDelete(size)} // Xóa size cụ thể
                      color="primary"
                      variant="outlined"
                      style={{ marginRight: "4px", marginBottom: "4px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* END SIZE */}

            {/* COLOR */}
            <div className="col">
              <div className="form-group">
                <label htmlFor="colors">Add Colors</label>
                <TextField
                  label="Add Colors"
                  variant="outlined"
                  fullWidth
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyPress={(e) => handleColorAdd(e)}
                  placeholder="Press Enter to add color"
                />
                <div className="color-list mt-2">
                  {formFields.colors.length > 0 && (
                    <Chip
                      label="Clear All"
                      onClick={() => handleColorDelete(null)} // Xóa tất cả colors khi bấm vào "Clear All"
                      color="secondary"
                      variant="outlined"
                      style={{ marginRight: "4px", marginBottom: "4px" }}
                    />
                  )}
                  {formFields.colors.map((color, index) => (
                    <Chip
                      key={index}
                      label={color}
                      onDelete={() => handleColorDelete(color)} // Xóa color cụ thể
                      color="primary"
                      variant="outlined"
                      style={{ marginRight: "4px", marginBottom: "4px" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* END COLOR */}
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <Stack spacing={1}>
                  <Rating
                    name="simple-controlled"
                    value={ratingInput}
                    onChange={(event, newValue) => {
                      setRatingInput(newValue);
                    }}
                    // precision={0.5}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow my-4 border-0 flex-center p-3">
          <h2 className="text-black/55 mb-4 capitalize text-lg">
            Upload Images
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            {previews?.length !== 0 &&
              previews?.map((image, index) => (
                <div className="imgUploadBoxWrapper" key={index}>
                  <span
                    className="remove flex items-center justify-center"
                    onClick={() => handleRemoveImage(index)} // Gọi hàm với index
                  >
                    <IoIosClose />
                  </span>
                  <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                    <img src={image} alt="Uploaded" />
                  </div>
                </div>
              ))}
            <div className="imgUploadBoxWrapper">
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300 flex items-center justify-center flex-col">
                <input
                  type="file"
                  multiple
                  name="images"
                  onChange={(e) => onChangeFile(e)}
                />
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
                <span className="text-sm capitalize">Create Product</span>
              </Button>
              <Link to="/products/list">
                <Button
                  type="button"
                  className="flex items-center mr-2 py-2"
                  variant="contained"
                  color="error"
                >
                  <IoIosClose style={{ fontSize: "25px" }} />
                  <span className="text-sm capitalize">Cancel</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductCreate;
