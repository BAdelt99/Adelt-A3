const express = require('express');
const app = express();

// install session module first using 'npm install express-session'
var session = require('express-session'); 
app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}))

app.get('/', songs);                  
app.get('/add', add);
app.get('/sort', sort);
app.get('/remove', removes);
app.get('/clear', clear);
app.listen(process.env.PORT,  process.env.IP, startHandler)

function startHandler()
{
  console.log('Server listening on port ' + process.env.PORT)
}

const song = [];

function add(req, res)
{
  let result = {};
  try
  {
      
      
    if (req.query.song != undefined)  
      req.session.song = req.query.song;
     result = {'Songs' : song}; 
     song.push(req.query.song);
     
     if (req.query.song == undefined)
      result = {'Songs' : song}; 
     
     
  
      
      
  }
  catch (e)
  {
     result = {'error' : e.message};
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
  res.end('');
}

function sort(req, res)
{
  let result = {};
  song.sort(song);
  result = {'songs' : song};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
   res.end('');
}

function songs(req, res)
{
  let result = {};
  result = {'songs' : song};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
   res.end('');
}

function removes(req, res)
{
  let result = {};
  let i = song.indexOf(req.query.song);
    if(i != -1) {
  	song.splice(i, 1);
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  result = {'songs' : song};
  res.write(JSON.stringify(result));
   res.end('');
}

function clear(req, res)
{
  let result = {};
  song.length = 0;
  result = {'songs' : song};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(result));
   res.end('');
}
