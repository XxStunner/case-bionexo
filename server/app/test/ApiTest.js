const request = require('supertest');
const app = require('../app');

describe('GET api/v1/institutes/by_distance', () => {
    it('Responde um JSON com as UBS mais próximas', (done) => {
        request(app)
            .get(`/api/v1/institutes/by_distance?query=-23.604936,-46.692999`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done());
    });
});