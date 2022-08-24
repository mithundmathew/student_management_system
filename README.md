steps =>
    1. npm install
    2. Add .env file to add these variables
           DB_URL => db_url ('mongodb://localhost:27017/studen_managementt')
            PORT        => Port number (8080)
            USER       => Mail for sending messages for student create, edit and delete
            PASSWORD    => Password of Mail Id            
    3. Start Server Using : 
       node app.js
    4. Landing page =>
        http://localhost:8080/

>>>>Functionality

1. Register Admin (password are stored in encrypted form by using 'bcrypt' package)
2. Login after signup 
3. List Student
4. Add new Student including profile picture(using package 'multer')
5. Edit, View, Delete student Details (including profile picture)
6. Send  mail to the student after completing student registration,update and delete(using package 'nodemailer')
7. Pagination on student list
8. Filtering data based on asc and desc order
9. Search student in student list
10. Confirmation for delete
11. Forgot Password : Provide new password to the registered mail (using package 'generate-password')
12. Logout
13.Provide authentication after login ( using package 'passport' and 'passport-local')


>>>>Packages
    > bcrypt
    > dotenv
    > express
    > express-session
    > hbs
    > mongoose
    > multer
    > nodemailer
    > passport
    > passport-local
    > path
    > router
    > generate-password
    > alert
