// tests/BATeamInfo.test.js

import chai from 'chai'; // Assertion library
import chaiHttp from 'chai-http'; // HTTP testing
import supertest from 'supertest'; // HTTP request simulation
import app from '../app.js'; // Your Express app (adjust path as necessary)
import axios from 'axios'; // Mock Axios

const { expect } = chai; // Destructure `expect` for cleaner syntax
chai.use(chaiHttp);

import { describe, it } from 'mocha'; // Mocha functions

// Mock Axios
import sinon from 'sinon'; // Used to stub Axios for mocking
sinon.stub(axios, 'get');

