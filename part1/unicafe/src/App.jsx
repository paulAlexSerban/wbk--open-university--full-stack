import { useState } from 'react';

const Header = ({ text, level }) => {
    const Tag = `h${level || 1}`;
    return <Tag>{text}</Tag>;
};

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;
const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = (good - bad) / total;
    const positive = (good / total) * 100;

    if (total === 0) {
        return <div>No feedback given</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <Header text="statistics" level={2} />
                    </th>
                </tr>
            </thead>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="total" value={total} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={positive + '%'} />
            </tbody>
        </table>
    );
};

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <Header text="give feedback" />
            <div>
                <Button text="good" handleClick={() => setGood(good + 1)} />
                <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
                <Button text="bad" handleClick={() => setBad(bad + 1)} />
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
}

export default App;
