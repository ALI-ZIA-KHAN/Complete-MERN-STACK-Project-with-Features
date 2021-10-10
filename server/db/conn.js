const mongoose=require('mongoose');


const DB=process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true,      //dk why its running by commenting for me
    // useFindAndModify:false

}).then(()=>{
    console.log(`connection successfully done`)
}).catch((err)=>{
    console.log(`no  connection`)
})