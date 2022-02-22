require("dotenv").config()
require("express-async-errors")
//async errors

const express = require("express")
const app = express()

const connectDB = require("./db/connect")

const notFoundMiddleware = require("./middleware/not-found")
const errorMiddleware = require("./middleware/error-handler")

// middleware
app.use(express.json())

//routes
const productsRouter = require("./routes/products")

app.get("/", (req,res) => {
    res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>")
})

app.use("/api/v1/products", productsRouter )

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async() => {
    try{
        //connectDb
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is on port : ${port}`))
    }catch(error){

    }

}

start()