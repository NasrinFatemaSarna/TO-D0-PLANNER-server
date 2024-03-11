const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
    {
    title: {type: String},
    description: {type: String},
    email: {type: String},
    status: {type: String},
    cratedDate: {type: Date, default: Date.now()}

},
{versionKey: false});
const TodoModel = mongoose.model('todos', todoSchema)
module.exports = TodoModel