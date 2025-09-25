import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin :["https://resq-2-45pv.onrender.com"],
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended:true , limit : "16kb"}))  // data receive

app.use(cookieParser())



import userRouter from "./routes/user.routes.js"
import DisasterRouter from "./routes/disaster.routes.js"
import donationRouter from "./routes/donation.routes.js"
import alertRouter from "./routes/alert.routes.js"
import resourceRouter from "./routes/resource.routes.js"
import volunteerAssignmentRouter from "./routes/volunteerassignment.routes.js"







app.use("/api/v1/user", userRouter);
app.use("/api/v1/disaster", DisasterRouter)
app.use("/api/v1/donation" , donationRouter)
app.use("/api/v1/alert", alertRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/volunteer-assignment", volunteerAssignmentRouter);




export {app}