import {app} from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path :'./.env'
})

connectDB()
.then(()=>{
    const PORT=process.env.PORT || 3000
    app.listen(PORT, ()=>{
        console.log(`Server is running at port : ${PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB Connection failed" , err)
})
