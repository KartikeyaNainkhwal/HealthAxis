import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, uploadReport, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay, verifyEmail, resendCode, googleLogin } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/verify-email", verifyEmail)
userRouter.post("/resend-code", resendCode)
userRouter.post("/google-login", googleLogin)
userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.post("/upload-report", authUser, upload.single('report'), uploadReport)
userRouter.get("/appointments", authUser, listAppointment)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)
userRouter.post("/payment-razorpay", authUser, paymentRazorpay)
userRouter.post("/verifyRazorpay", authUser, verifyRazorpay)







export default userRouter;