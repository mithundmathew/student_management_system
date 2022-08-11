const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {

    res.render('admin/admin_login')

})
// router.post('/signup',async (req,res)=>{
//     try {
//         var result = req.body

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(result.password, salt);
//         // console.log(result.password);
//         result.password = hashedPassword
//         const data = await new admin(result, (err, result) => {
//             if (err) throw err
//         })
//         data.save()
//         alert('successfully registerd')
//         console.log(data)
//         res.redirect('/')
//     }
//     catch (error) {
//         res.send('error : ' + error.message)
//     }

// })
module.exports = router