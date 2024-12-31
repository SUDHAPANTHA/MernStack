// const mongoose = require("mongoose");
import mongoose from "mongoose"; //This is of ESG
const studentSchema = new mongoose.Schema({
  name: String,
  // age:Number,
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

const StudentModel = mongoose.model("student", studentSchema);

export default StudentModel;

// JS OBJECT
// let std = {
//     name: "Pratiush", //string
//     age: 21, //num
//     city:"Ktm",
//     isActive: true // boolesn
// }

// let teacher = {
//     name: "ram", //string
//     age: 22, //num
//     city:"Ktm",
//     isActive: true ,
//     address: {
//         temp:"ktm",
//         per: "pkh"
//     },
//     phone : [9887374737,983746373]
// }

// console.log(std);
