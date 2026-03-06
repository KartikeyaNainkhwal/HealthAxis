import express from 'express';
import { submitReview, getDoctorReviews } from '../controllers/reviewController.js';
import authUser from '../middlewares/authUser.js';

const reviewRouter = express.Router();

// User routes (requires auth)
reviewRouter.post('/submit', authUser, submitReview);

// Public routes
reviewRouter.get('/doctor/:docId', getDoctorReviews);

export default reviewRouter;
