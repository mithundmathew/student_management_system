const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('student_login')
})
module.exports = router