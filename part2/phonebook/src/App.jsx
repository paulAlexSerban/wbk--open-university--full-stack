import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonFrom from './components/PersonForm';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const hook = () => {
        console.log('effect');
        axios.get('http://localhost:5000/persons').then((response) => {
            console.log('promise fulfilled');
            setPersons(response.data);
        });
    };

    useEffect(hook, []);

    console.log('render', persons.length, 'persons');

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
        axios.post('http://localhost:5000/persons', personObject).then((response) => {
            setPersons(persons.concat(response.data));
        });
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
