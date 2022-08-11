const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Admin = require('../model/admin')
const alert = require('alert')

module.exports = async function (passport) {
    passport.use(
        await new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            Admin.findOne({
                email: email
            }).then(user => {
                if (!user) {

                    alert('User Not Fount')
                    return done(null, false, { message: 'User not found' })
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {

                        return done(null, false, alert('Invalid Password'), { message: 'invalid password ' })
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, user) {
            done(err, user)
        });
    });
};