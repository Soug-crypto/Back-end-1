const mongoose = require("mongoose");
const validator = require("validator");
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs')
const AdminSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "First Name is Required"],
        trim : true
    },
    lastName : {
        type : String,
        required : [true, "Last Name is Required"],
        trim : true
    },
    password : {
        type : String,
        required : [true, "Password is Required"],
        trim : true
    },
    email : {
        type : String,
        required : [true, "First Name is Required"],
        lowercase: true,
        trim : true,
        validate: [validator.isEmail, "Must be a valid email"]
    }
});

/**
 * @function pre invocation hashes the password of every record being saved to the database
 * @note the second parameter MUST BE a normal ES5 function , in order to set the scope for @this this to points to the respective record
 */
AdminSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

const Admin = mongoose.model("Admin" ,AdminSchema);

module.exports.createAdmin = admin => {
    return Admin.find(admin).then(data => { // check using email
        if (!data.length) {
            return Admin.create(admin);
        } else {
            return new Promise((resolve, reject) => {
                reject("Admin Duplicated");
            })
        }
    })
};
module.exports.findByIdAdmin = _id => {
    return Admin.findById(_id);
};
module.exports.findOneByIdAndRemove = _id => {
    return Admin.findByIdAndRemove(_id)
};
module.exports.findOneByIdAndUpdate = (_id, criteriaObject) => {
    return Admin.findByIdAndUpdate(_id, criteriaObject);
};
/**
 * @function findOneAdmin finds a One Admin Only, and return a Promise, with the result in the resolved function of the promise
 * @param criteriaObject The criteria that you want to search with
 * @return Promise<any>, that contain the result in the resolved function, or Error in the reject function
 * */
module.exports.findOneAdmin = criteriaObject => {
    return Admin.findOne(criteriaObject);
};
module.exports.findOneAndUpdate = (criteriaObject, updateCriteriaObject) => {
    return Admin.findOneAndUpdate(criteriaObject, updateCriteriaObject);
};