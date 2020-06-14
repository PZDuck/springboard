const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json())

app.post('/', async function(req, res, next) {
  try {
    // collect promises for each developer to resolve them all at once
    let promises = req.body.developers.map(async developer => {
      return await axios.get(`https://api.github.com/users/${developer}`);
    });

    let output = []

    // send all collected promises simultaneously and create a JSON object for each one
    await Promise.all(promises)
      .then(response => response.forEach(developer => output.push({"bio": developer.data.bio, "name": developer.data.name})))
      .catch(err => console.log(err))
    return res.json(output)    
  } catch (err) {
    next(err);
  }
});

module.exports = app
