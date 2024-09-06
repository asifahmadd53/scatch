const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path =  require('path')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose-connection')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
const ownersRouter = require('./routes/ownerRouter')
const usersRouter = require('./routes/userRouter')
const productsRouter = require('./routes/productRouters')


app.use(cookieParser())

app.use('/owners', ownersRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)

// app.use('/',(req, res)=>{
//     res.send("gjfjg")
// })

const port = process.env.PORT || 4000


app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`)
})