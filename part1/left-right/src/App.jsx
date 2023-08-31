import { useState } from 'react';

const History = (props) => {
    if (props.allClicks.length === 0) {
        return <div>the app is used by pressing the buttons</div>;
    }
    return <div>button press history: {props.allClicks.join(' ')}</div>;
};

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);
    const [total, setTotal] = useState(0);

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'));
        const updatedLeft = left + 1;
        setLeft(updatedLeft);
        setTotal(updatedLeft + right);
    };

    const handleRightClick = () => {
        setAll(allClicks.concat('R'));
        const updateRight = right + 1;
        setRight(updateRight);
        setTotal(updateRight + left);
    };

    return (
        <div>
            {left}
            <Button handleClick={handleLeftClick} text="left" />
            <Button handleClick={handleRightClick} text="right" />
            {right}
            <History allClicks={allClicks} />
        </div>
    );
};

export default App;

/**
 * It is forbidden in React to mutate state directly, since it can result in unexpected
 * side effects. Changing state has to always be done by setting the state to a new object.
 * If properties from the previous state object are not changed, they need to simply be
 * copied, which is done by copying those properties into a new object and setting that
 * as the new state.
 *
 * Example of mutating state directly:
 *  const handleLeftClick = () => {
 *    clicks.left++
 *    setClicks(clicks)
 *  }
 */
