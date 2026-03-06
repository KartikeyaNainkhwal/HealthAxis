import mongoose from "mongoose"

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },   // e.g. "500mg"
    frequency: { type: String, required: true }, // e.g. "Twice a day"
    duration: { type: String, required: true },  // e.g. "7 days"
    instructions: { type: String, default: '' }, // e.g. "After meals"
}, { _id: false })

const prescriptionSchema = new mongoose.Schema({
    medicines: [medicineSchema],
    generalInstructions: { type: String, default: '' },
    followUpDate: { type: String, default: '' },
    issuedAt: { type: Date, default: Date.now },
}, { _id: false })

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    docId: { type: String, required: true, index: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    prescription: { type: prescriptionSchema, default: null },
    reportUrl: { type: String, default: null },      // Cloudinary URL of uploaded patient report
    reportName: { type: String, default: null },     // Original filename of the report
    paymentId: { type: String, default: null },      // Razorpay Order ID for refund reference
    refundStatus: { type: String, enum: ['none', 'partial', 'full'], default: 'none' },
    refundAmount: { type: Number, default: 0 }
})

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema)
export default appointmentModel