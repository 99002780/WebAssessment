const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

let users = [];
let flag = 1;

function readData() {
    const filename = "data.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    users = JSON.parse(jsonContent);
}



app.get("/users/:id", (req, res) => {
    const userid = req.params.id;
    if (users.length == 0) {
        readData();
    }
    let foundRec = users.find((e) => e.userId == userid);
    if (foundRec == null)
        throw "User not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/users", (req, res) => {
    if (users.length == 0)
        readData(); 
    let body = req.body;
    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.userId == body.userId) { 
            element.userName = body.userName;
            element.userCity = body.userCity;
            element.userEmail = body.userEmail;
            element.userPhone = body.userPhone;
            saveData();
            res.send("User updated successfully");
        }
    }

})

app.post('/users', (req, res) => {
    if (users.length == 0)
        readData(); 
    let body = req.body; 



    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.userName == body.userName) { 
            res.send("User name already exists");
            flag = 0;
        }

    }


    if (flag >= 1) {
        users.push(body);
        saveData(); 
        res.send("User added successfully");
    }

})
app.delete("/users/:id", (req, res) => {
    throw "Do it UR Self!!!!";
})

app.listen(1234, () => {
    console.log("Server available at 1234");
})