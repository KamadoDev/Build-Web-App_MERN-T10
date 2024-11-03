const { ProductModel } = require("../models/ProductModel");
const { CategoryModel } = require("../models/CategoryModel");

const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const pLimit = require("p-limit");
const cloudinary = require("../cloudinaryConfig");

// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const productList = await ProductModel.find().populate(
      "category",
      "name color"
    );

    // Kiểm tra nếu không tìm thấy products
    if (!productList || productList.length === 0) {
      return res.status(200).json({
        success: true,
        products: "Empty product",
      });
    }

    // Trả về danh sách products
    return res.status(200).json({
      success: true,
      products: productList,
    });
  } catch (err) {
    // Xử lý lỗi nếu có
    return res.status(500).json({
      success: false,
      error: err.message || "An error occurred while fetching products",
    });
  }
});

// Tìm sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Trả về sản phẩm tương ứng id
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    // Xử lý lỗi nếu có
    return res.status(500).json({
      success: false,
      error: err.message || "An error occurred while fetching the product",
    });
  }
});

// Xóa sản phẩm
router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        error: "Product not found!",
        success: false,
      });
    }

    // Xóa các ảnh liên quan trên Cloudinary
    await Promise.all(
      product.images.map(async (image) => {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (error) {
          console.error(
            `Error deleting image with public_id ${image.public_id}:`,
            error
          );
        }
      })
    );

    // Xóa category khỏi cơ sở dữ liệu
    await ProductModel.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product and related images deleted successfully!",
    });
  } catch (err) {
    console.error("Error during Product deletion:", err);
    return res.status(500).json({
      error: err.message || "An error occurred",
      success: false,
    });
  }
});

// Tạo sản phẩm mới
router.post("/create", async (req, res) => {
  try {
    // Kiểm tra xem categoryId có hợp lệ không
    const category = await CategoryModel.findById(req.body.category);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // Giới hạn upload song song 2 hình ảnh
    const limit = pLimit(2);

    // Upload hình ảnh lên Cloudinary
    const imagesToUpload = req.body.images.map((image) => {
      return limit(async () => {
        try {
          // Upload lên Cloudinary
          const result = await cloudinary.uploader.upload(image);
          return result;
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          return null; // Trả về null nếu upload thất bại
        }
      });
    });

    const upLoadStatus = await Promise.all(imagesToUpload);

    // Kiểm tra nếu không có ảnh nào được upload thành công
    if (!upLoadStatus || upLoadStatus.length === 0) {
      return res.status(500).json({
        error: "Images cannot upload!",
        status: false,
      });
    }

    // Lưu URLs và public_id của các ảnh đã upload
    const images = upLoadStatus.map((image) => {
      return { url: image.secure_url, public_id: image.public_id };
    });

    // Tạo đối tượng Product mới
    let product = new ProductModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category, // Lưu category ID
      images: images, // Lưu cả public_id và URL của hình ảnh
      countInStock: req.body.countInStock,
      numberReviews: req.body.numberReviews,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    });

    // Lưu product vào cơ sở dữ liệu
    savedProduct = await product.save();

    // Trả về phản hồi thành công
    return res.status(201).json({
      success: true,
      product: savedProduct,
    });
  } catch (err) {
    console.error("Error during product creation:", err);
    return res.status(500).json({
      error: err.message || "An error occurred",
      success: false,
    });
  }
});

// Cập nhật sản phẩm
router.put("/:id", validateObjectId, async (req, res) => {
  try {
    const {
      images,
      name,
      description,
      price,
      brand,
      category,
      countInStock,
      numberReviews,
      rating,
      isFeatured,
      imagesToDelete,
      updatedAt,
    } = req.body;

    // Kiểm tra xem ID sản phẩm có hợp lệ không
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
        data: product,
      });
    }

    // Kiểm tra xem ID category có hợp lệ không
    if (category) {
      const newCategory = await CategoryModel.findById(category);
      if (!newCategory) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }
      product.category = newCategory;
    }

    // Kiểm tra xem ID brand có hợp lệ không
    // if (brand) {
    //   const newBrand = await BrandModel.findById(brand);
    //   if (!newBrand) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Invalid category ID",
    //     });
    //   }
    //   product.category = newBrand;
    // }

    // Kiểm tra tính hợp lệ của images
    if (images && (!Array.isArray(images) || images.length === 0)) {
      return res.status(400).json({
        error: "Images should be a non-empty array if provided!",
        success: false,
      });
    }

    // Kiểm tra tính hợp lệ của imagesToDelete
    if (imagesToDelete && !Array.isArray(imagesToDelete)) {
      return res.status(400).json({
        error: "imagesToDelete should be an array!",
        success: false,
      });
    }

    // Cập nhật các trường khác
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.countInStock =
      countInStock !== undefined ? countInStock : product.countInStock;
    product.numberReviews =
      numberReviews !== undefined ? numberReviews : product.numberReviews;
    product.rating = rating !== undefined ? rating : product.rating;
    product.isFeatured =
      isFeatured !== undefined ? isFeatured : product.isFeatured;

    // Xóa ảnh cũ nếu có
    if (imagesToDelete && Array.isArray(imagesToDelete)) {
      await Promise.all(
        imagesToDelete.map(async (publicId) => {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (error) {
            console.error(
              `Error deleting image with public_id ${publicId}:`,
              error
            );
          }
        })
      );

      // Xóa các ảnh khỏi product
      product.images = product.images.filter(
        (image) => !imagesToDelete.includes(image.public_id)
      );
    }

    // Nếu có hình ảnh mới, xử lý upload
    if (images && Array.isArray(images)) {
      const limit = pLimit(2); // Giới hạn ảnh
      const imagesToUpload = images.map((image) => {
        return limit(async () => {
          try {
            const result = await cloudinary.uploader.upload(image);
            return result;
          } catch (error) {
            console.error("Error uploading image:", error);
            return null; // Trả về null nếu upload thất bại
          }
        });
      });

      const uploadStatus = await Promise.all(imagesToUpload);

      const ImageURL = uploadStatus
        .filter((item) => item) // Lọc bỏ các ảnh bị lỗi
        .map((item) => {
          return {
            url: item.secure_url, // Sử dụng item.secure_url
            public_id: item.public_id,
          };
        });

      if (ImageURL.length === 0) {
        return res.status(500).json({
          error: "No images were uploaded successfully!",
          success: false,
        });
      }

      // Cập nhật hình ảnh trong product
      product.images.push(...ImageURL);
    }

    // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
    const productUpdate = await product.save();

    // Trả về phản hồi thành công
    return res.status(200).json({
      success: true,
      productUpdate: productUpdate,
    });
  } catch (err) {
    console.error("Error during product update:", err);
    return res.status(500).json({
      error: err.message || "An error occurred",
      success: false,
    });
  }
});

module.exports = router;
