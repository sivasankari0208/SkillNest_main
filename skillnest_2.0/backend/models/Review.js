
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

serviceId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Service",
required:true
},

rating:{
type:Number,
required:true
},

comment:{
type:String,
required:true
}

});

module.exports = mongoose.model("Review",reviewSchema);
