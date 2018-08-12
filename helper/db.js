const mongoose=require('mongoose');
module.exports= () =>{
    mongoose.connect('mongodb://uskeche:987412365emre@ds111422.mlab.com:11422/movie-api',{useNewUrlParser:true});
    mongoose.connection.on('open',()=>{
        console.log("MongoDB:Connected");
    });

    mongoose.connection.on('error',(err)=>{
        console.log("MongoDB:Failed",err);
    });

    mongoose.Promise=global.Promise;
}
