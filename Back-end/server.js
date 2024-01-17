const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const urlencodedParser = express.urlencoded({extended: false});
// DECLARE JWT-secret 
const JWT_Secret = 'your_secret_key';

var mockUser = { email: 'morzac1@gmail.com', password: 'sT6ohz'};

var testTwo = { userName:'USER HELLO!!!'};
const jsonUser={
	"hasError": true,
	"errors": [
		"string"
	],
	"total": 0,
	"data": {
		"userInfo": {
			"userId": '1', // ID пользователя
			"userName": "Arina", // Имя пользователя
			"userAvatar": "assets/arina.jpg", // ссылка на аватерку
			"userRole": 0 // Роль пользоваетля
		},
		"tokens": {
			"token": "string",
			"refreshToken": "string"
		}
	}
}
app.get('/api/login', (req, res) => res.send(jsonUser))

app.get("/api", function(req, res){
	res.send("Главная страница");
});
app.post('/api/authenticate', (req, res) => {
	
	if (req.body) {
		var user = req.body;
		console.log(user)
		
		if (mockUser.email===req.body.email && mockUser.password === req.body.password ) {
			var token = jwt.sign(user, JWT_Secret);
			res.status(200).send({
				signed_user: user,
				token: token
			});
		}
		
		else {
			res.status(403).send({
				errorMessage: 'Authorisation required!'
			});
		}
		} else {
		res.status(403).send({
			errorMessage: 'Please provide email and password'
		});
	}
	
});



app.listen(82, () => console.log('Server started on port 82'));