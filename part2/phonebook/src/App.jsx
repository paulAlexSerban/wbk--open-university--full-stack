import { useState } from 'react';

import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonFrom from './components/PersonForm';

const DUMMY_DATA = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    { name: 'John Doe', number: '39-23-6423122', id: 5 },
    { name: 'Jane Doe', number: '39-23-6423122', id: 6 },
    { name: 'John Smith', number: '39-23-6423122', id: 7 },
    { name: 'Jane Smith', number: '39-23-6423122', id: 8 },
];

const App = () => {
    const [persons, setPersons] = useState(DUMMY_DATA);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const personsToShow = filter
        ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
        : persons;

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const addPerson = (event) => {
        event.preventDefault();
        if (personExists(newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        const personObject = {
            name: newName,
            number: newNumber,
        };
        setPersons(persons.concat(personObject));
        setNewName('');
        setNewNumber('');
    };

    const personExists = (name) => {
        return persons.some((person) => person.name === name);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonFrom
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
