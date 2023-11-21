const express = require("express");
const fs = require("fs");
let data = require("./studentData.json");

const app = express();
app.use(express.json());

// Fetch all Students
app.get("/studentData", (req, res) => {
  res.send(`Total Students : ${data.length} \n ${JSON.stringify(data)}`);
});

//Create New User
app.post("/students", (req, res) => {
  const newData = req.body;
  data.push(newData);
  fs.writeFileSync("./studentData.json", JSON.stringify(data));
  res.send("Student Data Added Successfully");
});

//get particular RollNumber Student
app.get("/students/:userRollNumber", (req, res) => {
  let exist = false;
  for (const stud of data) {
    if (parseInt(req.params.userRollNumber) === stud.RollNumber) {
      res.send(stud);
      exist=true;
    }
  }
  if(!exist){
    res.send("No Student Exist with this Roll Number");
  }
});

//UpdateExistingData
app.put("/students/:id",(req,res)=>{
  const rollNumber = parseInt(req.params.id);
  const updatedData = req.body;
  
  const index = data.findIndex((student)=>{
    return(student.RollNumber===rollNumber);
  });
  console.log(index);

  if(index>0){
      data[index]=updatedData;
      fs.writeFileSync("./studentData.json",JSON.stringify(data));
      res.send("Student Details Updated Successfully");
      // res.send(std);
  }
  else{
    res.send("Student Don't Exist");
  }
})

//Delete All Student Data
app.delete("/students/deleteAll",(req, res) => {
  data="[]";
  fs.writeFileSync('./studentData.json',data);
  res.send("Data Deleted Successfully");
});

// Delete a Particular RollNumber data
app.delete("/students/:rollnumber",(req,res)=>{
    const Student = parseInt(req.params.rollnumber);
    const newData = [];
    if(data.length===0){
      res.send("No Such Student Exist");
    }
    for(const detail of data){
      if(detail.RollNumber!=Student){
        newData.push(detail);
      }
    }
    fs.writeFileSync("./studentData.json", JSON.stringify(newData)); 
    if(newData.length===data.length){
      res.send("No Such Student Exist");
    }
    else{
      res.send("Student Deleted Successfully");
    }    
});

// Listening to Server
app.listen(3000, () => {
  console.log(`Listening to 3000`);
});
