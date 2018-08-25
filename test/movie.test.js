const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../app');

chai.use(chaiHttp);
let token,movieId;
describe('/api/movies tests',()=>{
    before((done)=>{
        chai.request(server)
        .post('/auth')
        .send({username:'uskeche', password:'4321'})
        .end((err,res)=>{
            token = res.body.token;
            done();
        });
    });
    describe('/GET Movies',()=>{
            it('it should be GET all the movies',(done)=>{
                chai.request(server)
                .get('/api/movies')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                         done();
                });
            });
         });

    describe('/POST Movies',()=>{
            it('it should be POST the movie',(done)=>{
                chai.request(server)
                .post('/api/movies')
                .send({title:'Shawsank Redemption',category:'Drama'})
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    movieId=res.body._id;
                         done();
                });
            });
         });   
    describe('/GET :Movie_id',()=>{
            it('it should be GET the movie from id',(done)=>{
                chai.request(server)
                .get('/api/movies/'+ movieId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('_id').eql(movieId);
                         done();
                });
            });
         }); 
    describe('/PUT :Movie_id',()=>{
            it('it should be UPDATE the movie given by id',(done)=>{
                chai.request(server)
                .put('/api/movies/'+ movieId)
                .send({category:'Action'})
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql('Shawsank Redemption');
                    res.body.should.have.property('category').eql('Action');
                    res.body.should.have.property('_id').eql(movieId);
                         done();
                });
            });
         });
       
    describe('/DELETE :Movie_id',()=>{
            it('it should be DELETE the movie given by id',(done)=>{
                chai.request(server)
                .delete('/api/movies/'+ movieId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);

                         done();
                });
            });
         });          
    });

