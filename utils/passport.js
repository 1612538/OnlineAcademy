const passport = require('passport');
const users = require('../models/Users');
const admins = require('../models/Admins');
const teachers = require('../models/Teachers');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.username);
})

passport.deserializeUser(async(username, done) => {
    //tại đây hứng dữ liệu để đối chiếu
    const user = await users.getByUsername(username);
    const admin = await admins.getByUsername(username);
    const teacher = await teachers.getByUsername(username);
    if (user) { //tìm xem có dữ liệu trong kho đối chiếu không
        user.type = 1;
        return done(null, user)
    } else {
        if (teacher) {
            teacher.type = 2;
            return done(null, teacher)
        } else {
            if (admin) {
                admin.type = 3;
                return done(null, admin)
            } else
                return done(null, false)
        }
    }
})

passport.use(new localStrategy(
    async(username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
        const user = await users.getByUsername(username);
        const teacher = await teachers.getByUsername(username);
        const admin = await admins.getByUsername(username);
        if (user) { //kiểm tra giá trị trường có name là username
            if (password == user.password) { // kiểm tra giá trị trường có name là password
                return done(null, user);
            } else {
                return done(null, false); // chứng thực lỗi
            }
        } else {
            if (teacher) { //kiểm tra giá trị trường có name là teacher
                if (password == teacher.password) { // kiểm tra giá trị trường có name là password
                    return done(null, teacher);
                } else {
                    return done(null, false); // chứng thực lỗi
                }
            } else {
                if (admin) { //kiểm tra giá trị trường có name là admin
                    if (password == admin.password) { // kiểm tra giá trị trường có name là password
                        return done(null, admin);
                    } else {
                        return done(null, false); // chứng thực lỗi
                    }
                } else {
                    return done(null, false); //chứng thực lỗi
                }
            }
        }
    }
))

module.exports = passport;