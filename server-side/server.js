var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var response = {};

var userAttempt = 0;
	
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));



/**
 * Login
 */
app.post('/login', function (req, res) {
	response = req.body;
	userAttempt = 0;
	if(response.userName === 'admin' && response.password === 'admin') {
		res.send({ message : 'success' });
	} else {
		res.send({ message : 'error' });
	}
});

/**
 * userAttempt
 */
app.post('/userAttempt', function (req, res) {
	
	response = req.body;
	console.log('response' + response.data);
	if(response.data === 'test') {
		userAttempt = 0;
	} else {
		userAttempt = userAttempt + 1;
	}
	
	if (userAttempt >=3 ) {
		res.send({ message : 'You tried three attempt. Redirecting to login page' });
	} else if(userAttempt === 0) {
		res.send({ message : 'success' });
	} else {
		res.send({ message : 'Wrong number entered! User attempt: ' +userAttempt });
	}
});



app.listen(PORT, function () {
  console.log('Server listening on '+PORT);
});