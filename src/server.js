import path from 'path'
import express from 'express';
import dotenv from 'dotenv';

dotenv.config()


const app = express();
const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*',(req, res) =>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'),(err)=>{
    if (err) res.status(500).send(err);
  });
});


app.listen(port, function() {
    console.log('Listening on port ', port);
  });
