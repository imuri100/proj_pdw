const mongoose = require('mongoose')

const passwordResetSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true
    },

    token: {
        type: String,
        unique: true,
        required:true
    }
})

const passwordreset = mongoose.model('passwordReset', passwordResetSchema)

module.exports = passwordreset;