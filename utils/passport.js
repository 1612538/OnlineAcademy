const passport = require('passport');
const users = require('../models/Users');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((username, done) => {
    done(null, username);
})

passport.deserializeUser(async(username, done) => {
    //tại đây hứng dữ liệu để đối chiếu
    const user = await users.getByUsername(username);
    if (user) { //tìm xem có dữ liệu trong kho đối chiếu không
        return done(null, username)
    } else {
        return done(null, false)
    }
})

passport.use(new localStrategy(
    async(username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
        const user = await users.getByUsername(username);
        if (user) { //kiểm tra giá trị trường có name là username
            if (password == user.password) { // kiểm tra giá trị trường có name là password
                return done(null, username); //trả về username
            } else {
                return done(null, false); // chứng thực lỗi
            }
        } else {
            return done(null, false); //chứng thực lỗi
        }
    }
))

module.exports = passport;