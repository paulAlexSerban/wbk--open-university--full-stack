import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
    const [counter, setCounter] = useState(0);
    console.log('rendering with counter value', counter);

    const increaseByOne = () => {
        console.log('increasing, value before', counter);
        setCounter(counter + 1);
    };

    const decreaseByOne = () => {
        console.log('decreasing, value before', counter);
        setCounter(counter - 1);
    };

    const setToZero = () => {
        console.log('resetting to zero, value before', counter);
        setCounter(0);
    };

    console.log('rendering...', counter);

    return (
        <div>
            <Display counter={counter} />
            <Button handleClick={increaseByOne} text="plus" />
            <Button handleClick={setToZero} text="zero" />
            <Button handleClick={decreaseByOne} text="minus" />
        </div>
    );
};

export default App;

/**
 * React's own official tutorial suggests:
 * "In React, it’s conventional to use onSomething names for props which represent
 * events and handleSomething for the function definitions which handle those events
 */
