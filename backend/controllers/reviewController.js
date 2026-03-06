import reviewModel from "../models/reviewModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Submit a new review
const submitReview = async (req, res) => {
    try {
        const { userId, docId, appointmentId, rating, reviewText } = req.body;

        // 1. Verify the appointment exists, belongs to the user & doctor, and is completed
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        if (appointment.userId.toString() !== userId || appointment.docId.toString() !== docId) {
            return res.status(403).json({ success: false, message: "Unauthorized to review this appointment" });
        }

        if (!appointment.isCompleted) {
            return res.status(400).json({ success: false, message: "Cannot review an incomplete appointment" });
        }

        // 2. Check if a review already exists for this appointment
        const existingReview = await reviewModel.findOne({ appointmentId });
        if (existingReview) {
            return res.status(400).json({ success: false, message: "You have already reviewed this appointment" });
        }

        // 3. Create the review
        const newReview = new reviewModel({
            userId,
            docId,
            appointmentId,
            rating: Number(rating),
            reviewText
        });

        await newReview.save();

        // 4. Update the aggregate ratings on the doctor profile
        const allReviews = await reviewModel.find({ docId });
        const totalReviews = allReviews.length;
        const averageRating = (allReviews.reduce((sum, rev) => sum + rev.rating, 0) / totalReviews).toFixed(1);

        await doctorModel.findByIdAndUpdate(docId, {
            averageRating: Number(averageRating),
            totalReviews
        });

        res.json({ success: true, message: "Review submitted successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get reviews for a specific doctor
const getDoctorReviews = async (req, res) => {
    try {
        const { docId } = req.params;

        // Fetch reviews and populate the user's name and image
        const reviews = await reviewModel.find({ docId })
            .populate('userId', 'name image')
            .sort({ date: -1 });

        res.json({ success: true, reviews });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { submitReview, getDoctorReviews }
