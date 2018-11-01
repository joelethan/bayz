const assert = require('assert');
var request = require('supertest')
var app = require('../app')
var methods = require('../api/middleware/mothods')
var token = methods.data.tokenGen({"email":"joel@gmail.com","password":"password"})


describe('index route', function(){
  it("should throw a not found error", function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  })
})

describe('POST signin', function() {
  it("should successful add a patch", function(done){
    var user={"email":"joel@gmail.com","password":"password"};
    request (app)
      .post('/auth/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('POST signin with no email', function() {
  it("should return an error", function(done){
    var user={"email":"","password":"password"};
    request (app)
      .post('/auth/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done)
  });
});

describe('POST signin with no password', function() {
  it("should return an error", function(done){
    var user={"email":"joel@gmail.com","password":""};
    request (app)
      .post('/auth/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done)
  });
});

describe('POST patch', function() {
  it("should successful add a patch", function(done){
    var patch={"patch": [{"op":"add","path":"/food", "value":"joefl"}]};
    request (app)
      .post('/protected/patch')
      .send(patch)
      .set({'Accept': 'application/json','Authorization':'Bearer '+token})
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('GET patch with no user', function() {
  it('should throw an Unauthorized error', function(done) {
    request(app)
      .get('/protected/patch')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done)
  });
});

describe('GET patch with user loggedin', function() {
  it('should throw an Unauthorized error', function(done) {
    request(app)
      .get('/protected/patch')
      .set({'Accept': 'application/json','Authorization':'Bearer '+token})
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('Broken url with no image in files', function() {
  it('should throw a Not Found error', function(done) {

    var body={"url": "https://www.somebrokenusrl.com","dest": "imadgez"}
    request (app)
      .post('/protected/image')
      .send(body)
      .set({'Accept': 'application/json','Authorization':'Bearer '+token})
      .expect('Content-Type', /json/)
      .expect(404, done)
  });
});

describe('Broken url with image in files', function() {
  it('should throw a Not Found error', function(done) {

    var body={"url": "https://www.somebrokenusrl.com","dest": "image"}
    request (app)
      .post('/protected/image')
      .send(body)
      .set({'Accept': 'application/json','Authorization':'Bearer '+token})
      .expect('Content-Type', /json/)
      .expect(201, done)
  });
});
/* 
    Before running the tests: Ensure you have an active internet connection
    Otherwise this test will fail

*/
describe('Url with no image in it', function() {
  this.timeout(3000)
  it('should throw an Internal Server error', function(done) {

    var body={"url": "https://www.google.com","dest": "imadgez"}
    request (app)
      .post('/protected/image')
      .send(body)
      .set({'Accept': 'application/json','Authorization':'Bearer '+token})
      .expect('Content-Type', /json/)
      .expect(500, done)
  });
});