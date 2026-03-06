const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

/* MongoDB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});


/* Schema */
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

const User = mongoose.model("User", userSchema);


/* CREATE */
app.post("/users", async (req,res)=>{
    const user = new User(req.body);
    const result = await user.save();
    res.json(result);
});


/* GET ALL */
app.get("/users", async (req,res)=>{
    const users = await User.find();
    res.json(users);
});


/* GET ONE */
app.get("/users/:id", async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.json(user);
});


/* UPDATE */
app.put("/users/:id", async (req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.json(user);
});


/* DELETE */
app.delete("/users/:id", async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({message:"User Deleted"});
});


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});