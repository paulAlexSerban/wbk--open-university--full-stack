import Part from './Part';

const Content = (props) => {
    return (
        <>
            {props.parts.map((part, index) => (
                <Part key={index} part={part.name} exercises={part.exercises} />
            ))}
        </>
    );
};

export default Content;
