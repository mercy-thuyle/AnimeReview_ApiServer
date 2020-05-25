//Thông báo cho ứng dụng biết là phải load dữ liệu trong database ở mongo
//Check ứng dựng có bắt được database trong .env hay không
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout') 
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true}) //Không code cứng đường dẫn cho Api vì app sẽ chạy trên server không chạy trên locallhost
const database = mongoose.connection
database.on('error', error => console.error(error)) //Bắt lỗi
database.once('open',() => console.log('Connected to Database')) //Kết nối một lần đầu, thành công thì báo

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () =>{
    console.log('Server is running')
})