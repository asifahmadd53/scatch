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


app.use(cookieParser())

app.get('/',(req, res)=>{
    res.send('fksjdklsdjfl')
})

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`)
})