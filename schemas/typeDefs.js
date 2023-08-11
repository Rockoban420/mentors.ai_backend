const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    name: String
    email: String
    icon_ID: String
    currentMentor: Mentor
    mentors: [Mentor]
}

type Mentor {
    _id: ID
    mentorName: String
    intro: String
    mentorImage: String
}

type Query {
    users: [User]
    user(_id: ID!): User
    mentors: [Mentor]
    mentor(_id: ID!): Mentor
}

type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addMentor(mentorName: String!, intro: String, mentorImage: String): Mentor
    addMentorToUser(mentorId: ID!, userId: ID!): User
}

`;

module.exports = typeDefs;