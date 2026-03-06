import appointmentModel from "../models/appointmentModel.js";
import PDFDocument from "pdfkit";

// ─── SAVE PRESCRIPTION ────────────────────────────────────────────────────────
const savePrescription = async (req, res) => {
    try {
        const { appointmentId, medicines, generalInstructions, followUpDate } = req.body;

        console.log('[PRESCRIPTION] Save request for appointment:', appointmentId);
        console.log('[PRESCRIPTION] Medicines:', medicines?.length);

        if (!appointmentId || !medicines || medicines.length === 0) {
            return res.status(400).json({ success: false, message: "appointmentId and at least one medicine are required." });
        }

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found." });
        }

        if (!appointment.isCompleted) {
            return res.status(400).json({ success: false, message: "Prescription can only be saved for completed appointments." });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {
            prescription: { medicines, generalInstructions: generalInstructions || '', followUpDate: followUpDate || '', issuedAt: new Date() }
        });

        console.log('[PRESCRIPTION] Saved successfully!');
        res.json({ success: true, message: "Prescription saved successfully!" });
    } catch (error) {
        console.error('[PRESCRIPTION ERROR]', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─── GET PRESCRIPTION (for patient to view it exists) ─────────────────────────
const getPrescription = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found." });
        if (!appointment.prescription) return res.status(404).json({ success: false, message: "No prescription for this appointment." });

        res.json({ success: true, prescription: appointment.prescription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─── DOWNLOAD PRESCRIPTION AS PDF ─────────────────────────────────────────────
const downloadPrescription = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment || !appointment.prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found." });
        }

        const { prescription, userData, docData, slotDate, slotTime } = appointment;
        const doc = new PDFDocument({ margin: 50, size: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="prescription_${appointmentId}.pdf"`);
        doc.pipe(res);

        // ─── HEADER ─────────────────────────────────────────────────────────
        // Teal background header bar
        doc.rect(0, 0, 595, 110).fill('#0D7377');

        // Logo / Brand name
        doc.fillColor('#FFFFFF')
            .fontSize(24)
            .font('Helvetica-Bold')
            .text('HealthAxis', 50, 30, { align: 'left' });

        doc.fillColor('#B2E0E2')
            .fontSize(10)
            .font('Helvetica')
            .text('Trusted Healthcare Platform', 50, 58, { align: 'left' });

        // "MEDICAL PRESCRIPTION" label top right
        doc.fillColor('#FFFFFF')
            .fontSize(11)
            .font('Helvetica-Bold')
            .text('MEDICAL PRESCRIPTION', 50, 30, { align: 'right' })
            .fontSize(9)
            .font('Helvetica')
            .fillColor('#B2E0E2')
            .text(`Date: ${new Date(prescription.issuedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 50, 48, { align: 'right' });

        // ─── DOCTOR & PATIENT INFO BAR ──────────────────────────────────────
        const infoY = 125;
        // Doctor block
        doc.fillColor('#0D7377').font('Helvetica-Bold').fontSize(10).text('CONSULTING DOCTOR', 50, infoY);
        doc.fillColor('#0F1D2E').font('Helvetica-Bold').fontSize(13).text(docData.name || 'Doctor', 50, infoY + 16);
        doc.fillColor('#6B8799').font('Helvetica').fontSize(9).text(`${docData.speciality || ''} • ${docData.degree || 'M.B.B.S'}`, 50, infoY + 33);
        doc.fillColor('#6B8799').font('Helvetica').fontSize(9).text(`Reg. No.  HA-DOC-${String(docData._id || 'N/A').slice(-6).toUpperCase()}`, 50, infoY + 46);

        // Divider line between two columns
        doc.moveTo(310, infoY - 5).lineTo(310, infoY + 60).strokeColor('#DDE4EA').stroke();

        // Patient block
        doc.fillColor('#0D7377').font('Helvetica-Bold').fontSize(10).text('PATIENT', 325, infoY);
        doc.fillColor('#0F1D2E').font('Helvetica-Bold').fontSize(13).text(userData.name || 'Patient', 325, infoY + 16);
        doc.fillColor('#6B8799').font('Helvetica').fontSize(9).text(`Appointment: ${slotDate ? slotDate.replace(/_/g, '/') : ''} at ${slotTime || ''}`, 325, infoY + 33);

        // Separator line below info bar
        const separatorY = infoY + 72;
        doc.moveTo(50, separatorY).lineTo(545, separatorY).strokeColor('#DDE4EA').lineWidth(1).stroke();

        // ─── RX SYMBOL ─────────────────────────────────────────────────────
        const rxY = separatorY + 15;
        doc.fillColor('#0D7377').font('Helvetica-Bold').fontSize(28).text('℞', 50, rxY);
        doc.fillColor('#6B8799').font('Helvetica').fontSize(9).text('PRESCRIBED MEDICATIONS', 83, rxY + 12);

        // ─── MEDICINE TABLE ─────────────────────────────────────────────────
        const tableHeaderY = rxY + 35;
        const cols = { name: 50, dosage: 200, frequency: 290, duration: 380, instr: 450 };

        // Table header background
        doc.rect(50, tableHeaderY, 495, 22).fill('#E6F4F5');
        doc.fillColor('#0D7377').font('Helvetica-Bold').fontSize(8);
        doc.text('MEDICINE / DRUG', cols.name + 4, tableHeaderY + 7);
        doc.text('DOSAGE', cols.dosage + 4, tableHeaderY + 7);
        doc.text('FREQUENCY', cols.frequency + 4, tableHeaderY + 7);
        doc.text('DURATION', cols.duration + 4, tableHeaderY + 7);
        doc.text('NOTES', cols.instr + 4, tableHeaderY + 7);

        // Table rows
        let rowY = tableHeaderY + 22;
        prescription.medicines.forEach((med, i) => {
            const bg = i % 2 === 0 ? '#FFFFFF' : '#F4F7F9';
            doc.rect(50, rowY, 495, 24).fill(bg);
            doc.fillColor('#0F1D2E').font('Helvetica-Bold').fontSize(9);
            doc.text(med.name, cols.name + 4, rowY + 8, { width: 145 });
            doc.fillColor('#1E3A4C').font('Helvetica').fontSize(9);
            doc.text(med.dosage, cols.dosage + 4, rowY + 8);
            doc.text(med.frequency, cols.frequency + 4, rowY + 8);
            doc.text(med.duration, cols.duration + 4, rowY + 8);
            doc.fillColor('#6B8799').fontSize(8).text(med.instructions || '—', cols.instr + 4, rowY + 8);
            rowY += 24;
        });

        // Table border
        doc.rect(50, tableHeaderY, 495, rowY - tableHeaderY).strokeColor('#DDE4EA').lineWidth(1).stroke();
        // Vertical column borders
        [cols.dosage, cols.frequency, cols.duration, cols.instr].forEach(x => {
            doc.moveTo(x, tableHeaderY).lineTo(x, rowY).strokeColor('#DDE4EA').lineWidth(0.5).stroke();
        });

        // ─── GENERAL INSTRUCTIONS ──────────────────────────────────────────
        if (prescription.generalInstructions) {
            const instrY = rowY + 20;
            doc.fillColor('#0D7377').font('Helvetica-Bold').fontSize(10).text('GENERAL INSTRUCTIONS', 50, instrY);
            doc.rect(50, instrY + 16, 495, 1).fill('#DDE4EA');
            doc.fillColor('#1E3A4C').font('Helvetica').fontSize(10)
                .text(prescription.generalInstructions, 50, instrY + 24, { width: 495, lineGap: 4 });
            rowY = doc.y + 10;
        }

        // ─── FOLLOW UP ─────────────────────────────────────────────────────
        if (prescription.followUpDate) {
            rowY = doc.y + 15;
            doc.roundedRect(50, rowY, 220, 34, 8).fill('#E6F4F5');
            doc.fillColor('#0D7377').font('Helvetica-Bold').fontSize(9).text('FOLLOW-UP APPOINTMENT', 62, rowY + 8);
            doc.fillColor('#0F1D2E').font('Helvetica-Bold').fontSize(11).text(prescription.followUpDate, 62, rowY + 19);
        }

        // ─── SIGNATURE LINE ─────────────────────────────────────────────────
        const sigY = doc.page.height - 110;
        doc.moveTo(370, sigY).lineTo(545, sigY).strokeColor('#0D7377').lineWidth(1).stroke();
        doc.fillColor('#0F1D2E').font('Helvetica-Bold').fontSize(10).text(docData.name || 'Doctor', 370, sigY + 5, { width: 175, align: 'center' });
        doc.fillColor('#6B8799').font('Helvetica').fontSize(8).text('Authorized Signature & Stamp', 370, sigY + 18, { width: 175, align: 'center' });

        // ─── FOOTER ─────────────────────────────────────────────────────────
        doc.rect(0, doc.page.height - 40, 595, 40).fill('#0F1D2E');
        doc.fillColor('#6B8799').font('Helvetica').fontSize(8)
            .text('This prescription is digitally generated by HealthAxis. Valid for 30 days from date of issue.', 50, doc.page.height - 26, { align: 'center', width: 495 });

        doc.end();

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export { savePrescription, getPrescription, downloadPrescription };
