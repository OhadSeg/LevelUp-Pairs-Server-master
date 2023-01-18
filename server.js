const express = require('express')
const app = express()
const port = 8496

const {names} = require("./server-sources");

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/code', (req, res) => {
    const {firstName, lastName} = req.query;
    const fullName = `${firstName} ${lastName}`;

    if(!(fullName in names)){
        res.status(409).send({'error': "Name not found"});
        return res;
    }

    if(!names[fullName].attendance){
        res.status(409).send({'error': "You must register first to receive the code"});
        return res;
    }

    const {code} = names[fullName];
    res.status(200).send(`Hello ${fullName}, your code is: ${code}`);
  })

  app.put('/attendance', (req, res) => {
    const {firstName} = req.body;
    const {lastName} = req.body;
    const fullName = `${firstName} ${lastName}`;
    
    if(!(fullName in names)){
        res.status(409).send({'error': "Name not found"});
        return res;
    }

    if(names[fullName].attendance){
        res.status(409).send({'error': "You have already registered"});
        return res;
    }
    else{
        names[fullName].attendance = true;
        res.status(200).send("You have successfully registered");
    }
  })

  app.get('/partner', (req, res) => {
    const {firstName, lastName} = req.query;
    const {code} = req.query;
    fullName = `${firstName} ${lastName}`;
    
    if(!(fullName in names)){
        res.status(409).send({'error': "Name not found"});
        return res;
    }
    
    if(!names[fullName].attendance){
        res.status(409).send({'error': "You must register first to receive the code"});
        return res;
    }

    if(code != names[fullName].code){
        res.status(409).send({'error': "The code is incorrect"});
        return res;
    }

    const {partner} = names[fullName];
    res.status(200).send(`Your partner for the mission is: ${partner}`)
  })

  app.listen(port, () => {
    console.log(`This app listening on port ${port}`)
  })