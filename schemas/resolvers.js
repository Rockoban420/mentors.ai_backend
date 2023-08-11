const { AuthenticationError } = require('apollo-server-express');
const { User, Mentor } = require('../models');


const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findById(_id).populate('currentMentor').populate('mentors');
        },
        users: async (parent) => {
            return User.find().populate('currentMentor').populate('mentors');
        },
        mentor: async (parent, { _id }) => {
            return Mentor.findById(_id);
        },
        mentors: async (parent) => {
            return Mentor.find();
        }
    },
    Mutation: {
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            return user;
        },
        addMentor: async (parent, { mentorName, intro, mentorImage }) => {
            const mentor = await Mentor.create({ mentorName, intro, mentorImage });
            return mentor;
        },
        addMentorToUser: async (parent, { mentorId, userId }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { mentors: mentorId } },
                { new: true }
            ).populate('currentMentor').populate('mentors');

            return updatedUser;
        }
    }
};

module.exports = resolvers;
