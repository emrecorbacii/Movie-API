const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../app');

chai.use(chaiHttp);

describe('Node Server',()=>{
    it('(POST /) add movie to db',(done)=>{
        chai.request(server)
        .get('/api/movies')
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        });
    });
});