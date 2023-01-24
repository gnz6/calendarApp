const { Schema, model } = require('mongoose');

const CalendarSchema = new Schema({

    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = model('Calendar', CalendarSchema);