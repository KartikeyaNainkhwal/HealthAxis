import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import prescriptionRouter from './routes/prescriptionRoute.js'
import contactRouter from './routes/contactRoute.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
const port = process.env.PORT || 4000

// Connect services
connectDB()
connectCloudinary()

// CORS — allow both frontend and admin dev ports + production Vercel URLs
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  // Production Vercel deployments
  'https://health-axis-seven.vercel.app',
  'https://health-axis-1rmk.vercel.app',
  // Wildcard pattern for any future Vercel preview deployments
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`))
    }
  },
  credentials: true,
}))

// Body parsers (must come before routes)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/', (req, res) => res.json({ success: true, message: 'HealthAxis API is running' }))

// API routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/review', reviewRouter)
app.use('/api/prescription', prescriptionRouter)
app.use('/api/contact', contactRouter)

// Centralized error handler (must be last)
app.use(errorHandler)

app.listen(port, () => console.log(`✅ HealthAxis server running on port ${port}`))
