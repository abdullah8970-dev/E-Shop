import mongoose from 'mongoose';

const forgotSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Forgot || mongoose.model("Forgot", forgotSchema);
