import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosClose, IoIosSave } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { MyContext } from "../../App";

import LinearProgress from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
import { getData, postData, putData } from "../../utils/api";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const ProductEdit = (props) => {
  const productID = props.productID;
  const context = useContext(MyContext);
  const [dataCat, setDataCat] = useState([]);
  const [dataSubCat, setDataSubCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [ratingInput, setRatingInput] = useState(Number | null);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    price: 0,
    old_price: 0,
    discount: 0,
    brand: "",
    category: "",
    sub_category: "",
    images: [],
    productInStock: 0,
    isFeatured: false,
    tags: [],
    size: [],
    colors: [],
    rating: 0,
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file, // Lưu trữ file thực tế
    }));

    if (newImages.length > 0) {
      setFormFields((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages], // Thêm các ảnh mới vào mảng images
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const image = formFields.images[index];
    const productID_ = productID;
    console.log("object: " + productID_);
    console.log("object: " + image.public_id);
    if (image.public_id) {
      const idImage = image.public_id;
      removeImageFromCloudinary(idImage, productID_);
    } else {
      setFormFields((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index), // Remove by index
      }));
    }
  };

  const removeImageFromCloudinary = async (public_id, productID_) => {
    setLoading(true);
    try {
      const response = await postData(`/api/products/upload/remove`, {
        public_id,
        productID_,
      });
      console.log(`Image with public_id ${public_id} removed.`);
      if (response.success === true) {
        context.setMessage(response.message);
        context.setTypeMessage(response.type || "success");
        context.setOpen(true);
        fetchData();
      } else {
        context.setMessage(response.message);
        context.setTypeMessage(response.type || "error");
        context.setOpen(true);
      }
    } catch (error) {
      console.error(`Error removing image: ${error}`);
    } finally {
      setLoading(false);
    }
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

  const fetchData = useCallback(async () => {
    window.scrollTo(0, 0);
    try {
      const [resProduct, resCat, resSubCat] = await Promise.all([
        getData(`/api/products/${productID}`),
        getData(`/api/category`),
        getData(`/api/subcategory`),
      ]);

      // Xử lý dữ liệu sản phẩm
      if (resProduct) {
        const productData = resProduct.product;
        const imagesWithPublicId = productData.images.map((image) => ({
          ...image,
          public_id: image.public_id || null,
        }));

        // Cập nhật formFields và ratingInput
        setFormFields((prevFields) => ({
          ...prevFields,
          ...productData,
          images: imagesWithPublicId,
        }));

        console.log("ratin", productData.rating)
        // Set giá trị ratingInput để hiển thị đúng rating hiện có
        setRatingInput(productData.rating || 0); // Giá trị mặc định là 0 nếu không có
      }

      // Xử lý danh mục và danh mục con
      if (resCat) setDataCat(resCat.categories);
      if (resSubCat) setDataSubCat(resSubCat.subcategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [productID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formFields);

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
      numberReviews,
      size,
      colors,
      tags,
      rating,
    } = formFields;

    // Check for required fields and valid values
    if (price < 0 || productInStock < 0) {
      return alert("Price and productInStock must be positive numbers!");
    }

    // kiểm tra ảnh
    if (formFields.images.length === 0) {
      context.setMessage("Vui lòng chọn hình ảnh!");
      context.setTypeMessage("error");
      context.setOpen(true);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("old_price", old_price);
    formData.append("discount", discount);
    formData.append("brand", brand);
    formData.append("productInStock", productInStock);
    formData.append("category", category);
    formData.append("sub_category", sub_category);
    formData.append("isFeatured", isFeatured);
    formData.append("numberReviews", numberReviews);
    formData.append("rating", rating);

    // Add tags to formData
    tags.forEach((tag) => formData.append("tags", tag));
    size.forEach((size) => formData.append("size", size)); // Thêm từng tag vào formData
    colors.forEach((color) => formData.append("colors", color)); // Thêm từng tag vào formData

    // Add images - both local files and existing images (public_id)
    formFields.images.forEach((image) => {
      if (image.file) {
        // If the image is a newly uploaded file, add it to formData
        formData.append("files", image.file);
      } else if (image.public_id) {
        // If the image is an existing image, just add its public_id to the list
        formData.append("image_public_ids[]", image.public_id);
      }
    });

    try {
      const response = await putData(`/api/products/${productID}`, formData);
      console.log(response);
      if (response.success) {
        context.setMessage(response.message);
        context.setTypeMessage(response.type || "success");
        context.setOpen(true);
        context.setOpenDraw(false);
      } else {
        context.setMessage(response.message || response.error.message);
        context.setTypeMessage(response.type || "error");
        context.setOpen(true);
      }
    } catch (error) {
      console.log("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={editProduct}>
        <div className="card shadow my-4 border-0 flex-center p-3">
          <div className="flex items-center justify-between">
            <h1 className="font-weight-bold mb-0">
              _ID: <strong className="text-indigo-400">{productID}</strong>
            </h1>
          </div>
        </div>
        {loading && <LinearProgress />}
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
                  value={formFields.name}
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
                  value={formFields.description}
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
                  value={formFields.price}
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
                    value={formFields.category}
                    label="Category"
                    name="category"
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
                    value={formFields.sub_category}
                    label="Sub Category"
                    name="sub_category"
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
                  value={formFields.old_price}
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
                    value={formFields.isFeatured}
                    label="Is Featured"
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
                  type="number"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter product instock"
                  onChange={onChangeInput}
                  value={formFields.productInStock}
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
                  value={formFields.brand}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="discount">Discount</label>
                <TextField
                  id="discount"
                  name="discount"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Please enter discount"
                  onChange={onChangeInput}
                  value={formFields.discount}
                />
              </div>
            </div>
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
          <div className="row">
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
        </div>

        <div className="card shadow my-4 border-0 flex-center p-3">
          <h2 className="text-black/55 mb-4 capitalize text-lg">
            Upload Images
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            {formFields.images.map((image, index) => (
              <div className="imgUploadBoxWrapper" key={index}>
                <span
                  className="remove flex items-center justify-center"
                  onClick={() => handleRemoveImage(index)} // Gọi hàm với index
                >
                  <IoIosClose />
                </span>
                <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300">
                  <img src={image.url} alt="Uploaded" />
                </div>
              </div>
            ))}
            <div className="imgUploadBoxWrapper">
              <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300 flex items-center justify-center flex-col">
                <input
                  type="file"
                  multiple
                  name="image"
                  onChange={handleImageUpload}
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
                <span className="text-sm capitalize">
                  {loading === true ? "Editing..." : "Edit product"}
                </span>
              </Button>
              <Button
                onClick={() => context.setOpenDraw(false)}
                type="button"
                className="flex items-center mr-2 py-2"
                variant="contained"
                color="error"
              >
                <IoIosClose style={{ fontSize: "25px" }} />
                <span className="text-sm capitalize">Cancel</span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

// Khai báo kiểu dữ liệu cho các props
ProductEdit.propTypes = {
  productID: PropTypes.string.isRequired,
};

export default ProductEdit;
