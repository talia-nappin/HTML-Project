//server that will scrape https://www.poznan.pl/mim/info/news/ for all <article> tags and return them as JSON response

//implement cors to allow cross-origin requests

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	request('https://www.poznan.pl/mim/info/news/', (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);
			const articles = [];
			$('article').each((i, el) => {
				const title = $(el).find('h2').text();
				const date = $(el).find('time').text();
				const link = $(el).find('a').attr('href');
				const content = $(el).find('p').text();
				const article = { title, link, content, date };
				articles.push(article);
			});
			res.json(articles);
		}
	});
});

const port = 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
