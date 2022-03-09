import express from 'express';
import fetch from "node-fetch";

const app = express();

const PORT = '8080';

app.get('/news', async function (req, res) {

  const newsData = await fetch('https://newsdata.io/api/1/news?apikey=pub_5257b286ff40d984dfea206caea9b5dbb764&q=car&language=en&category=business,sports,technology')
  const data = await newsData.json()
  res.send(data.results);
});

app.listen(PORT, () => {
  console.log(`Server listening at port - ${PORT}`);
});
