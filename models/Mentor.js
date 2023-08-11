const mongoose = require('mongoose');

const { Schema } = mongoose;

const mentorSchema = new Schema({
    mentorName: {
        type: String,
        required: true,
        trim: true,
    },
    intro: {
        type: String,
    },
    mentorImage: {
        type: String,
    },

});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
