const { CategoryModel } = require("../models/CategoryModel");
const express = require("express");
const router = express.Router();
const validateObjectId = require("../middlewares/validateObjectId");
const pLimit = require("p-limit");
const cloudinary = require("../cloudinaryConfig");


// Lấy tất cả Category
router.get("/", async (req, res) => {
  try {
    const categoryList = await CategoryModel.find();

    // Kiểm tra nếu không tìm thấy category
    if (!categoryList || categoryList.length === 0) {
      return res.status(404).json({
        success: true,
        message: "Empty category",
      });
    }

    // Trả về danh sách category
    return res.status(200).json(categoryList);
  } catch (err) {
    // Xử lý lỗi nếu có
    return res.status(500).json({
      success: false,
      error: err.message || "An error occurred while fetching categories",
    });
  }
});


// Tìm category theo ID
router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Trả về category tương ứng id
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    // Xử lý lỗi nếu có
    return res.status(500).json({
      success: false,
      error: err.message || "An error occurred while fetching the category",
    });
  }
});


// Xóa category
router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        error: "Category not found!",
        success: false,
      });
    }

    // Xóa các ảnh liên quan trên Cloudinary
    await Promise.all(
      category.images.map(async (image) => {
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
    await CategoryModel.findByIdAndDelete(categoryId);

    return res.status(200).json({
      success: true,
      message: "Category and related images deleted successfully!",
    });
  } catch (err) {
    console.error("Error during category deletion:", err);
    return res.status(500).json({
      error: err.message || "An error occurred",
      success: false,
    });
  }
});


// Thêm mới category
router.post("/create", async (req, res) => {
  try {
    const { images, name, color } = req.body;

    // Kiểm tra tính hợp lệ của images
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        error: "Images should be a non-empty array!",
        success: false,
      });
    }

    const limit = pLimit(2); // giới hạn ảnh
    const imagesToUpload = images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      });
    });

    const uploadStatus = await Promise.all(imagesToUpload);

    const ImageURL = uploadStatus.map((item) => {
      return {
        public_id: item.public_id,
        url: item.secure_url,
      };
    });

    if (ImageURL.length === 0) {
      return res.status(500).json({
        error: "No images were uploaded successfully!",
        success: false,
      });
    }

    // Tạo đối tượng Category mới
    let category = new CategoryModel({
      name,
      images: ImageURL, // Lưu cả public_id và URL
      color,
    });

    category = await category.save();

    return res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    console.error("Error during category creation:", err);
    return res.status(500).json({
      error: err.message || "An error occurred",
      success: false,
    });
  }
});


// Chỉnh sửa category theo ID
router.put("/:id", validateObjectId, async (req, res) => {
  try {
    const { images, name, color, imagesToDelete } = req.body;
    const categoryId = req.params.id; // Lấy ID từ URL

    // Kiểm tra tính hợp lệ của ID
    if (!categoryId) {
      return res.status(400).json({
        error: "Category ID is required!",
        success: false,
      });
    }

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

    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        error: "Category not found!",
        success: false,
      });
    }

    // Cập nhật tên và màu sắc
    if (name) category.name = name;
    if (color) category.color = color;

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

      // Xóa các ảnh khỏi category
      category.images = category.images.filter(
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

      // Cập nhật hình ảnh trong category
      category.images.push(...ImageURL);
    }

    // Lưu lại các thay đổi
    await category.save();

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    console.error("Error during category update:", err);
    return res.status(500).json({
      error: err.message || "An error occurred",
      success: false,
    });
  }
});

module.exports = router;
