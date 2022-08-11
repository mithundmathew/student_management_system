require('dotenv').config()
const admin_login = require('./router/admin/admin_login')
const admin_home = require('./router/admin/admin_home')
const student_reg = require('./router/admin/student_reg')
const signup = require('./router/admin/signup')
const branch = require('./router/admin/branch')
const passport = require('passport')
require('./middlewares/passport.config')(passport)
const { ensureAuthenticated } = require('./middlewares/auth')

const flash = require('express-flash')
const session = require('express-session')


require('dotenv').config()
const port = process.env.PORT;
const db = process.env.DB_URL

const router = require('router')

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const hbs = require('hbs')
const path = require('path')
const { json } = require('express')
const { userInfo } = require('os')
const admin = require('./model/admin')


// app.use(express.static('images'))
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(db, () => console.log('db connected'))
mongoose.connection.on('error', () => console.error('connection err'))

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())







app.use('/', admin_login)

app.use('/admin', signup)
app.use('/admin/new', signup)
app.use('/admin_home', admin_home)
app.use('/admin', admin_home)
app.use('/student_reg', student_reg)

app.use('/logout', ensureAuthenticated, async (req, res, next) => {
    // req.logout()
    req.session.destroy(function (err) {
        res.redirect('/')
    })
});

app.use('/branch', branch)


app.listen(port, () => console.log('server running on port', port))
module.exports = app