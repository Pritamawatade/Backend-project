// const express = require('express'); // common js importing module
import express from "express"; // module js import 

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            name: 'luffy',
            age: 17,
            joke: 'luffy is lazy'
        },
        {
            name: 'luffy',
            age: 18,
            joke: 'luffy is lazy'
        },
        {
            name: 'luffy',
            age: 19,
            joke: 'luffy is lazy'
        },
        {
            name: 'luffy',
            age: 20,
            joke: 'luffy is lazy'
        }
    ]

    res.send(jokes);
});
 
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



