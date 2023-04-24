//server that will scrape https://www.poznan.pl/mim/info/news/ for all <article> tags and return them as JSON response

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
	request('https://www.poznan.pl/mim/info/news/', (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);
			const articles = [];
			$('article').each((i, el) => {
				const title = $(el).find('h3').text();
				const date = $(el).find('time').text();
				const link = $(el).find('a').attr('href');
				const article = { title, date, link };
				articles.push(article);
			});
			res.json(articles);
		}
	});
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
