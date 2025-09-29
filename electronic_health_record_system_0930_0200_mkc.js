// 代码生成时间: 2025-09-30 02:00:35
const express = require('express');
const { graphql } = require('gatsby');
const { buildSchema } = require('type-graphql');
const { ApolloServer } = require('apollo-server-express');

// Define the schema for our GraphQL API
const schema = await buildSchema({
  resolvers: [
    // Import resolvers from different files
    './src/resolvers/patientResolver.js',
    './src/resolvers/recordResolver.js',
  ],
});

// Define the GraphQL context
const context = {};

// Create an Apollo Server instance
const server = new ApolloServer({
  schema,
  context,
});

// Create an express app
const app = express();

// Apply the GraphQL middleware provided by Apollo Server
server.applyMiddleware({ app, path: '/graphql' });

// Start the server
app.listen(4000, () => {
  console.log('🚀 Server ready at http://localhost:4000${server.graphqlPath}');
});

/*
 * Resolvers for patients
 */
// src/resolvers/patientResolver.js
const Patient = require('./models/patientModel');

const patientResolvers = {
  Query: {
    async patients() {
      try {
        return await Patient.find();
      } catch (error) {
        throw new Error('Error fetching patients: ' + error.message);
      }
    },
    async patient(_, { id }) {
      try {
        const patient = await Patient.findById(id);
        if (!patient) {
          throw new Error('Patient not found');
        }
        return patient;
      } catch (error) {
        throw new Error('Error fetching patient: ' + error.message);
      }
    },
  },
  Mutation: {
    async addPatient(_, { name, birthdate, gender }) {
      const patient = new Patient({ name, birthdate, gender });
      try {
        await patient.save();
        return patient;
      } catch (error) {
        throw new Error('Error adding patient: ' + error.message);
      }
    },
    async updatePatient(_, { id, name, birthdate, gender }) {
      try {
        const patient = await Patient.findByIdAndUpdate(id, { name, birthdate, gender }, { new: true });
        if (!patient) {
          throw new Error('Patient not found');
        }
        return patient;
      } catch (error) {
        throw new Error('Error updating patient: ' + error.message);
      }
    },
    async deletePatient(_, { id }) {
      try {
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) {
          throw new Error('Patient not found');
        }
        return patient;
      } catch (error) {
        throw new Error('Error deleting patient: ' + error.message);
      }
    },
  },
};

/*
 * Resolvers for records
 */
// src/resolvers/recordResolver.js
const Record = require('./models/recordModel');

const recordResolvers = {
  Query: {
    async records() {
      try {
        return await Record.find();
      } catch (error) {
        throw new Error('Error fetching records: ' + error.message);
      }
    },
    async record(_, { id }) {
      try {
        const record = await Record.findById(id);
        if (!record) {
          throw new Error('Record not found');
        }
        return record;
      } catch (error) {
        throw new Error('Error fetching record: ' + error.message);
      }
    },
  },
  Mutation: {
    async addRecord(_, { patientId, diagnosis, treatment }) {
      const record = new Record({ patientId, diagnosis, treatment });
      try {
        await record.save();
        return record;
      } catch (error) {
        throw new Error('Error adding record: ' + error.message);
      }
    },
    async updateRecord(_, { id, diagnosis, treatment }) {
      try {
        const record = await Record.findByIdAndUpdate(id, { diagnosis, treatment }, { new: true });
        if (!record) {
          throw new Error('Record not found');
        }
        return record;
      } catch (error) {
        throw new Error('Error updating record: ' + error.message);
      }
    },
    async deleteRecord(_, { id }) {
      try {
        const record = await Record.findByIdAndDelete(id);
        if (!record) {
          throw new Error('Record not found');
        }
        return record;
      } catch (error) {
        throw new Error('Error deleting record: ' + error.message);
      }
    },
  },
};

/*
 * Models
 */
// src/models/patientModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true },
});

module.exports = mongoose.model('Patient', patientSchema);

// src/models/recordModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordSchema = new Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
});

module.exports = mongoose.model('Record', recordSchema);
