/**
 * Created by Sachini on 7/1/2017.
 */
var request = require('supertest');
var should = require('should');
var mocha = require('mocha');
var app = require('../server.js');

const agent = request.agent(app);

var prescrption =
    {
        name:'priton',strength:'2',duration:'3',frequency:'12'
    }

    var supplier={
        name:'abc', teleNo:'1121131334', email:'bcd@gmail.com',address:'akkhjfk',drugName:'a'
    }

    var drug={
        name:'ABC', category:'narcots', type:'cartoons', content:'tablet',contenType:'cards',price:'100.00',dangerLevel:'44'
    }

    var drugRequst={ name:'abc',requstedQty:'12',availableQty:'10',date:'12344',supplier:'abc',status:'pending' }


describe("SAMPLE unit test",function(){


   /* it("should get  a prescrption record",function(done){

        agent
            .get('/prescription/59581bf02b90c213b0e424b3')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Object();
                done();
            });
    });

    it("should get  prescrption record by prescrptionId",function(done){

        agent
            .get('/prescription?59581bf02b90c213b0e424b3')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Object();
                done();
            });
    });*/

    //prescriptions-sachini

    it('should add a new prescription', function(done){
        agent
        .post('/prescription')
        .send(prescription)
        .expect(201)
        .end(function (err, res) {
            _id = res.body._id;
            res.body.should.be.an.Object().and.have.property('_id');
            done();
        });
});

    it("should get all prescriptions",function(done){
        //calling ADD api
        agent
            .get('/prescription')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                done();
            });
    });

    //supliers-kalhara

    it('should add new suppliers', function(done){
        agent
            .post('/supplier')
            .send(supplier)
            .expect(201)
            .end(function (err, res) {
                _id = res.body._id;
                res.body.should.be.an.Object().and.have.property('_id');
                done();
            });
    });

    it("should get all supliers",function(done){
        //calling ADD api
        agent
            .get('/supplier')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                done();
            });
    });

    //drugs-harsha


    it('should add  new drugs', function(done){
        agent
            .post('/addH')
            .send(drug)
            .expect(201)
            .end(function (err, res) {
                _id = res.body._id;
                res.body.should.be.an.Object().and.have.property('_id');
                done();
            });
    });

    it("should get all drugs",function(done){
        //calling ADD api
        agent
            .get('/getFromIDH')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                done();
            });
    });


    //drug-requests-mihiran

    it('should add a new drug request', function(done){
        agent
            .post('/addRequest')
            .send(drug_request)
            .expect(201)
            .end(function (err, res) {
                _id = res.body._id;
                res.body.should.be.an.Object().and.have.property('_id');
                done();
            });
    });

    it("should get all drug_requests",function(done){
        //calling ADD api
        agent
            .get('/drug_request')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                done();
            });
    });


    //after(function(done) { DriverModel.remove()}).then(catch(done););


});