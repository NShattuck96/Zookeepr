const express = require('express');
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

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});


