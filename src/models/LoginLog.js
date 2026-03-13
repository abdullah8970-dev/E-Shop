import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: String,
  loginTime: { type: Date, default: Date.now },
  ip: String,
});

export default mongoose.models.LoginLog ||
mongoose.model("LoginLog", loginLogSchema);
