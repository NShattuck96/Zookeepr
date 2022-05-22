const express = require('express');
const { appendFile } = require('fs');
const PORT = process.env.PORT || 80
const app = express();
const { animals } = require('./data/animals');

function filterByQuery(query, animalsArray) {
    let personalityTraitsarray = [];
    //Note animalsArray saved as filteredResults HERE
    let filteredRelsults = animalsArray;
    if (query.personalityTraits) {
        //Save personalityTraits as a dedicated Array
        //If personalityTraits is a string, place it into a new array and save. 
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsarray = [query.personalityTraits];
        } else {
            personalityTraitsarray = query.personalityTraits;
        }
    //Loop through each trait in the personalityTraits array:
    personalityTraitsarray.forEach (trait => {
        filteredRelsults = filteredRelsults.filter (
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
    });
    };

    if (query.diet) {
        filteredRelsults = filteredRelsults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredRelsults = filteredRelsults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredRelsults = filteredRelsults.filter(animal => animal.name === query.name);
    }
    //Return the filtered Results: 
    return filteredRelsults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id) [0];
    return result
};

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


