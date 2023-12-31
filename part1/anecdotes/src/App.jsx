import { useState } from 'react';

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'The best way to get a project done faster is to start sooner.',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Even the best planning is not so omniscient as to get it right the first time.'
];

const Header = ({ text, level = 1 }) => {
    const Tag = `h${level}`;
    return <Tag>{text}</Tag>;
};

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;
const Anecdote = ({ text }) => <q>{text}</q>;
const Paragraph = ({ text }) => <p>{text}</p>;

const App = () => {
    const anecdotesLength = anecdotes.length;
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(new Array(anecdotesLength).fill(0));


    const maxVotes = Object.keys(points).reduce((a, b) => (points[a] > points[b] ? a : b));

    const handleNext = () => {
        const random = Math.floor(Math.random() * anecdotesLength);
        setSelected(random);
    };

    const handleVote = () => {
        const copy = [...points];
        copy[selected] += 1;
        setPoints(copy);
    };

    return (
        <div>
            <div>
                <Header text="Anecdote of the day" level={1} />
                <Anecdote text={anecdotes[selected]} />
                <Paragraph text={`This anecdote has ${points[selected]} points`} />
                <div>
                    <Button text="vote" handleClick={handleVote} />
                    <Button text="next anecdote" handleClick={handleNext} />
                </div>
            </div>

            <div>
                <Header text="Anecdote with most votes" level={2} />
                <Anecdote text={anecdotes[maxVotes]} />
                <Paragraph text={`This anecdote has ${points[maxVotes]} points`} />
            </div>
        </div>
    );
};

export default App;
