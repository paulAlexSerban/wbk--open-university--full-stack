import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonFrom from './components/PersonForm';
import contactsService from './services/contacts';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        console.log('effect');
        contactsService.getAll().then((initialPersons) => {
            console.log('promise fulfilled');
            setPersons(initialPersons);
        });
    }, []);

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
        if (!newName || !newNumber) {
            setErrorMessage('Name or number is missing');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return;
        }
        if (personExists(newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find((person) => person.name === newName);
                const changedPerson = { ...person, number: newNumber };
                contactsService.update(person.id, changedPerson).then((returnedPerson) => {
                    setPersons(persons.map((p) => (p.id !== changedPerson.id ? p : returnedPerson)));

                });
            }

            return;
        }
        const personObject = {
            name: newName,
            number: newNumber,
        };
        contactsService.create(personObject).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
        });
        setNewName('');
        setNewNumber('');
        setNotificationMessage(`Added ${newName}`);
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    };

    const personExists = (name) => {
        return persons.some((person) => person.name === name);
    };

    const deletePerson = (id) => {
        const person = persons.find((person) => person.id === id);
        if (window.confirm(`Delete ${person.name}?`)) {
            contactsService.deleteContact(id).then((response) => {
                setPersons(persons.filter((person) => person.id !== id));
            }).catch((error) => {
                setErrorMessage(`Information of ${person.name} has already been removed from server`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setPersons(persons.filter((person) => person.id !== id));
            });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            {notificationMessage && <Notification message={notificationMessage} type="success" />}
            {errorMessage && <Notification message={errorMessage} type="error" />}
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
            <Persons persons={personsToShow} onDelete={deletePerson} />
        </div>
    );
};

export default App;
