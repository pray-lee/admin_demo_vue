const mongoose = require('mongoose')
const Schema = mongoose.Schema
// handle mongoose warning. see `https://mongoosejs.com/docs/deprecations.html`
mongoose.set('useFindAndModify', false);

const ProfileSchema = new Schema({
    type: {
        type: 'string',
        require: true
    },
    income: {
        type: 'string',
        required: true
    },
    expend: {
        type: 'string',
        required: true
    },
    cash: {
        type: 'string',
        required: true
    },
    describe: {
        type: 'string',
    },
    remark: {
        type: 'string',
    },
    date: {
        default: Date.now(),
        type: Date
    }
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)