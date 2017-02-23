var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/build'));
app.use('/build', express.static(__dirname + '/build'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

