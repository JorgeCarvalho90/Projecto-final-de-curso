import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    products: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        vat: Number,
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
    },
    stripePaymentID: {
      type: String,
      require: true,
    },
    totalAmount: {
      type: Number,
      require: true,
    },
    orderStatus: {
      type: String,
      enum: ["processing", "completed", "shipped", "canceled"],
      default: "processing",
    },
  },
  { timestamps: true }
);
