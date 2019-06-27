const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 创建架构
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// 创建并且导出模型
module.exports = User = mongoose.model('users', UserSchema)