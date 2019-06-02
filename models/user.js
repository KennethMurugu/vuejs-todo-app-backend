/*
Model representing a user that will be logged in and be able to interact with the system
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10

var UserSchema = new Schema({
    //This can technically be an email also
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
})

//Add some middleware to encrypt the password before we save to the database
UserSchema.pre('save', function (next) {
    var user = this
    //Only hash if the password has not been modified
    if (!user.isModified('password')) return next();

    //Generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
        if (error) return next(error);

        //Hash password using salt
        bcrypt.hash(user.password, salt, function (error, encryptedPassword) {
            if (error) return next(error);

            //Override cleartext password with hashed password
            user.password = encryptedPassword
            next()
        })
    })
})

//Comparing password
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    //Compare with bcrypt
    bcrypt.compare(candidatePassword, this.password, function (error, areTheSame) {
        if (error) return cb(error);

        cb(null, areTheSame)
    })
}

//Export model
module.exports = mongoose.model('User', UserSchema)