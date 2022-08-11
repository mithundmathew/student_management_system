
const router = require('express').Router()



router.get('/', async (req, res) => {
    res.render('admin/student_reg')
})


module.exports = router