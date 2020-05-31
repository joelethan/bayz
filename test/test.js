// Import the dependencies for testing
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { server } from "../app";
import { constants } from "./constants";

var methods = require('../api/middleware/mothods')
var token = methods.data.tokenGen(constants.user)

// Configure chai
chai.use(chaiHttp);
chai.should()

describe('index route', ()=>{
    it("OK, test root endpoint", done => {
        chai.request(server)
            .get('/')
            .then((res)=>{
                res.should.have.status(404)
                done()
        })
    })
})

describe('POST signin', () => {
    it("should return an error when no email", (done)=>{
        var user={"email":"","password":"password"};
        chai.request(server)
            .post('/auth/login')
            .send(user)
            .then((res)=>{
                expect(res).to.have.status(500);
                done()
            })
    })
    it("should return an error when no password", (done)=>{
        var user={"email":"johndoe@gmail.com","password":""};
        chai.request(server)
            .post('/auth/login')
            .send(user)
            .then((res)=>{
                expect(res).to.have.status(500);
                done()
            })
    })
    it("should return a token if good credentials", (done)=>{
        var user={"email":"johndoe@gmail.com","password":"password"};
        chai.request(server)
            .post('/auth/login')
            .send(user)
            .then((res)=>{
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text)).to.have.property('token')
                assert.typeOf(res, 'object');
                
                done()
            })
    })
})

describe('POST patch', ()=> {
    it("should have a body of the new patch", (done)=>{
        chai.request(server)
            .post('/protected/patch')
            .send(constants.patch1)
            .set({'Content-Type': 'application/json','Authorization': token})
            .then((res)=>{
                expect(JSON.parse(res.text)).to.have.property('patch')
                expect(res).to.have.status(200);
                done()
            })
    })
    
    it("should throw an error if no original body", (done)=>{
        chai.request(server)
            .post('/protected/patch')
            .send(constants.patch2)
            .set({'Content-Type': 'application/json','Authorization': token})
            .then((res)=>{
                expect(JSON.parse(res.text)).to.have.property('message')
                expect(res).to.have.status(500);
                assert.equal(JSON.parse(res.text).message, 'patch or body or doc not found!!');
                done()
            })
    })
    
    it("should throw an error if no token/invalid token", (done)=>{
        chai.request(server)
            .post('/protected/patch')
            .send(constants.patch1)
            .set({'Content-Type': 'application/json','Authorization': 'token'})
            .then((res)=>{
                expect(JSON.parse(res.text)).to.have.property('message')
                assert.equal(JSON.parse(res.text).message, 'Auth failed');
                expect(res).to.have.status(401);
                done()
            })
    })
})

describe('Create Image thumbnail', function() {
    it('should throw an error if url is broken', function(done) {
        var body={"url": "https://www.somebrokenusrl.com","imageName": "imagename"}
        chai.request(server)
        .post('/protected/image')
        .send(body)
        .set({'Accept': 'application/json','Authorization':token})
        .then((res)=>{
            expect(res).to.have.status(404);
            expect(JSON.parse(res.text)).to.have.property('message')
            assert.equal(JSON.parse(res.text).message, 'url broken, No image found ');
            done()
        })
    })

    it('should throw an error if url has no image', function(done) {
        var body={"url": "https://www.google.com","imageName": "imagename"}
        chai.request(server)
        .post('/protected/image')
        .send(body)
        .set({'Accept': 'application/json','Authorization':token})
        .then((res)=>{
            expect(res).to.have.status(500);
            expect(JSON.parse(res.text)).to.have.property('message')
            assert.equal(JSON.parse(res.text).message, 'url has no image!!!! ');
            done()
        })
    })

    it('should throw an error if no token/invalid token', function(done) {
        var body={"url": "https://www.google.com","imageName": "imagename"}
        chai.request(server)
        .post('/protected/image')
        .send(body)
        .set({'Accept': 'application/json','Authorization':'token'})
        .then((res)=>{
            expect(JSON.parse(res.text)).to.have.property('message')
            assert.equal(JSON.parse(res.text).message, 'Auth failed');
            expect(res).to.have.status(401);
            done()
        })
    })

    it('should create image thumbnail with right inputs', function(done) {
        var body={"url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg","imageName": "imagename"}
        chai.request(server)
        .post('/protected/image')
        .send(body)
        .set({'Accept': 'application/json','Authorization':token})
        .then((res)=>{
            expect(JSON.parse(res.text)).to.have.property('message')
            assert.equal(JSON.parse(res.text).message, 'Image downloaded, Thumbnail created ');
            expect(res).to.have.status(201);
            done()
        })
    })
})
