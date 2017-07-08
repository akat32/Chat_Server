var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));
var namename;
app.get('/', (req,res)=>{
  res.sendfile('register.html');
});
app.post('/namename', (req,res)=>{
  console.log(req.body.namename);
  namename = req.body.namename;
  res.sendfile('client.html');
});
var cnt=1;
io.on('connection', function(socket){
  var name = namename;
  console.log('신규 유저 등장! : ',socket.id);
  io.to(socket.id).emit('change name', name);

  socket.on('send message', (name, text)=>{
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});
Users = mongoose.model("users",UsersSchema);
http.listen(3000, function(){
  console.log('Server on Port 3000');
});
