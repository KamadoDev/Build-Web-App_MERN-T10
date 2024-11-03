const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  brand: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
  countInStock: { type: Number, required: true },
  numberReviews: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date },
});

// Tạo virtual cho thuộc tính id
ProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Cấu hình JSON để bao gồm các thuộc tính ảo (virtuals)
ProductSchema.set("toJSON", {
  virtuals: true,
});

// Xuất cả ProductModel và ProductSchema
module.exports = {
  ProductModel: mongoose.model("Product", ProductSchema),
  ProductSchema: ProductSchema,
};
