const http = require("http")
const axios = require('axios');
const cors = require('cors')



const PORT = 3000
const express = require ('express')
require('dotenv').config();

const app = express();
app.use(express.json())
const server = http.createServer(app)

app.use(cors());

app.post( '/search', async(req, res) =>{
      const query = req.body.query
      const list = await searchMovies(process.env.apiKey, query)
      console.log(list)
      res.send(list);

});


app.post('/similar', async(req, res) => {
    const id = req.body.id
    const simMovies = await fetchSimilarMovies(process.env.apiKey, id)
    console.log(simMovies)
    res.send(simMovies);
})


server.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}/`)
    });




    async function searchMovies(apiKey, query) {
        const url = 'https://api.themoviedb.org/3/search/movie';
        const params = {
          query: query,
          include_adult: 'false',
          language: 'en-US',
          page: 1
        };
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          params: params
        };
        try {
          const response = await axios.get(url, options);
          // console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching the movies:', error);
        }
      }



      async function fetchSimilarMovies(apiKey, movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/similar`;
        const params = {
          language: 'en-US',
          page: 1
        };
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          params: params
        };
        try {
          const response = await axios.get(url, options);
          // console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching similar movies:', error);
        }
      }