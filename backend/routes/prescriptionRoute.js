import express from "express";
import { savePrescription, getPrescription, downloadPrescription } from "../controllers/prescriptionController.js";
import authDoctor from "../middlewares/authDoctor.js";
import authUser from "../middlewares/authUser.js";

const prescriptionRouter = express.Router();

// Doctor: save prescription for a completed appointment
prescriptionRouter.post('/save', authDoctor, savePrescription);

// Public (patient): get prescription metadata
prescriptionRouter.get('/get/:appointmentId', authUser, getPrescription);

// Public (patient): download PDF
prescriptionRouter.get('/download/:appointmentId', downloadPrescription);

export default prescriptionRouter;
