const mongoose =require('mongoose')


const userSchema = new mongoose.Schema({
    name:{type:String ,require:true},
    city:{type:String , require:true},
    study:{type :String},
    age:{type :Number}
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)