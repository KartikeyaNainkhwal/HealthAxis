import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    docId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'appointment', required: true, unique: true }, // 1 review per appointment
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: false },
    date: { type: Number, default: Date.now }
});

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema);

export default reviewModel;
