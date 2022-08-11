const router = require('express').Router()
const branch = require('../../model/branch')
const alert = require('alert')


router.get('/', (req, res) => {
    res.render('admin/branch')
})

router.post('/add', async (req, res) => {
    try {
        const data = await new branch(req.body, (err, result) => {
            if (err) throw err
        })
        console.log(data)
        await alert('Branch Added')
        data.save()
        res.redirect('/admin/dashboard')

    } catch (error) {
        console.log(error)
    }
})
module.exports = router