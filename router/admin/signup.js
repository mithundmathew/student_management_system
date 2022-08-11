const router = require('express').Router()
const admin = require('../../model/admin')
bcrypt = require('bcrypt')
const alert = require('alert')


router.get('/signup', async (req, res) => {
    try {
        res.render('admin/signup')
    } catch (error) {
        console.log(error)
    }
})




router.post('/register', async (req, res) => {

    try {
        var result = req.body

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(result.password, salt);
        // console.log(result.password);
        result.password = hashedPassword
        const data = await new admin(result, (err, result) => {
            if (err) throw err
        })
        data.save()
        alert('successfully registered')
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})
module.exports = router