const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	let now = new Date().toString();

	let log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to write to file');
		}
	});
	next();
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
		name: 'user',
	});
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page',
	});
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad request'});
})

app.listen(3000);