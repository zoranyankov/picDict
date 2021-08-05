const mongoose = require('mongoose');

const picWordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: [true, 'Word is required!'],
    },
    pictureUrl: {
        type: String,
        required: [true, 'Picture-URL is required!'],
        validate: {
                validator: function(v) {
                    return v.match(/^https?/i);
                },
                message: props => `${props.value} is not a valid Url`,
            },
    },
    // category: {
    //     type: String,
    //     required: [true, 'Category is required!'],
    // },
    // difficulty: {
    //     type: String,
    //     required: [true, 'DificultyLevel is required!'],
    // },
    // picWord: {
    //     type: String,
    //     required: [true, 'PicWord is required!'],
    //     minlength: 3,
    //     maxlength: 100,
    // },
    // correct_answer: {
    //     type: String,
    //     required: [true, 'need to specify correct answer'],
    //     minlength: 3,
    //     maxlength: 100,
    // },
    // incorrect_answers: [{
    //     type: String,
    //     required: [true, 'need to specify at lease one wrong answer'],
    //     minlength: 3,
    //     maxlength: 100,
    // }],
    creatorId: {
        type: String,
        required: [true, 'CreatorId is required!'],
    },
    creatorName: {
        type: String,
        required: [true, 'creatorName is required!'],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model('PicWord', picWordSchema);