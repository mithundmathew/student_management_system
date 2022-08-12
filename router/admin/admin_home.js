require('dotenv').config()
const router = require('express').Router()
const alert = require('alert')
const student = require('../../model/student')
const admin = require('../../model/admin')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const mail = require('../../middlewares/mail')
// const {main} = require('../../middlewares/mail')
const upload = require('../../middlewares/upload')
const passport = require('passport')
require('../../middlewares/passport.config')(passport)
const { ensureAuthenticated } = require('../../middlewares/auth')
const { query } = require('express')

var generator = require('generate-password');


// router.post('/', async (req, res) => {

//     try {
//         const user = await admin.findOne({ email: req.body.email })
//         console.log(user)

//         if (!user) {
//             alert('no user found')
//         }
//         const isMatch = await bcrypt.compare(req.body.password, user.password)

//         if (isMatch === false) {
//             alert('invalid password')
//         }
//         else {

//             res.redirect('/admin/dashboard')
//         }


//     } catch (error) {
//         console.log(error)
//     }
// })


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/',
    })(req, res, next);
})




//new student registration
router.post('/new_student', ensureAuthenticated, upload, async (req, res,) => {

    try {
        var result = req.body
        result.image = req.file.filename
        const data = new student(result)
        let msg = "Succesfully completed your registration"
        mail(req.body.email, msg)
        data.save()
        alert('Successsfully Registered')
        console.log(data)
        res.redirect('/admin/dashboard')
    }
    catch (error) {
        res.send('error in admin_home.js/new student : ' + error.message)
    }
})

//admin dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {

    var query = {};

    if (req.query.searchtext) {
        // query['name'] = { $regex: req.query.searchtext, $options: 'i' }

        query = {
            $or: [
                { name: { $regex: req.query.searchtext, $options: 'i' } },
                { address: { $regex: req.query.searchtext, $options: 'i' } },
                { dob: { $regex: req.query.searchtext, $options: 'i' } },
                // { phno: { $regex: req.query.searchtext, $options: 'i' } },
                { email: { $regex: req.query.searchtext, $options: 'i' } },
                // { image: { $regex: req.query.searchtext, $options: 'i' } },

            ]
        }

    }

    ITEMS_PER_PAGE = 10
    let page = +req.query.page
    let sort = req.query.sort || "name"
    req.query.sort ? (sort == req.query.sort.split(",")) : (sort = [sort])
    let sortBy = {}
    let order = req.query.order || "asc"
    if (sort[1]) {
        sortBy[sort[0]] = sort[1]
    } else {
        sortBy[sort[0]] = order
    }

    if (!page) page = 1
    let totalItems;


    student.find(query)
        .countDocuments()
        .then(count => {
            totalItems = count;
            return student.find(query)
                .sort(sortBy)
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        })
        .then(students => {
            // console.log('total count' + totalItems)
            let lastpage = Math.ceil(totalItems / ITEMS_PER_PAGE)
            // console.log('lastpage' + lastpage);
            res.render('admin/admin_home', {
                data: students,
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                // demolim: page < (Math.ceil(totalItems / ITEMS_PER_PAGE))
                nonext: page <= lastpage

            });
        })
        .catch(err => {
            console.log(err)
        });

})





//view student 
router.get('/view/:id', ensureAuthenticated, async (req, res) => {
    try {
        var id = mongoose.Types.ObjectId(req.params.id);

        const result = await student.find({ _id: id })


        res.render('admin/student_view', { data: result[0] })



        // res.json(result)
        console.log(result)
    } catch (error) {
        console.log('error after edit: ' + error)
    }
})



//get student details for edit 
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
        var id = mongoose.Types.ObjectId(req.params.id);

        const result = await student.find({ _id: id })
        res.render('admin/student_edit', { data: result[0] })

        // res.json(result)
        console.log(result)
    } catch (error) {
        console.log('error after edit: ' + error)
    }
})


//delete student
router.get('/delete/:id', ensureAuthenticated, async (req, res) => {
    try {


        // var id = mongoose.Types.ObjectId(req.params.id);
        result = await student.findByIdAndDelete({ _id: req.params.id })
        let msg = "Profile Deleted";
        mail(result.email, msg)
        alert('Profile Deleted')
        res.redirect('/admin/dashboard')
    } catch (error) {
        console.log('error : ' + error)
    }
})




//update student
router.post('/update/:id', ensureAuthenticated, async (req, res) => {

    var id = req.params.id
    const { name, address, dob, phno, email, image } = req.body
    var query = await student.findByIdAndUpdate(id, {
        name: name,
        address: address,
        dob: dob,
        phno: phno,
        email: email,
        image: image
        // name: req.body.name,
        // age: req.body.age
    }, { new: true })
    let msg = "profile Updated"
    mail(email, msg)

    alert('profile updated')

    console.log(query)
    console.log('updated')

    res.redirect('/admin/dashboard')
})
router.get('/forgot', async function (req, res) {
    res.render('admin/forgot_pswd')
})


//reset admin pasword
router.post('/forgot_pswd', async function (req, res) {

    try {
        const newPassword = generator.generate({
            length: 10,
            numbers: true
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const Admin = await admin.findOneAndUpdate({ email: req.body.forgot_mail }, {
            password: hashedPassword
        })
        if (!Admin) {
            alert('cannot find email')
            res.redirect('/admin/forgot')
        } else {

            let msg = "Your New Passord : " + newPassword
            mail(req.body.forgot_mail, msg)
            alert('New Password Sent to Your Mail')
            res.redirect('/')
        }
    }

    catch (error) {
        throw error
    }


    // console.log(password);

})

module.exports = router