const express = require('express');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const app = express();

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
];

app.use(express.json());

app.get('/', (request, response) => {
    response.json({ message: 'phonebook api is working' });
});

app.get('/info', (request, response) => {
    const date = new Date();
    const template = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `;
    response.send(template);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
