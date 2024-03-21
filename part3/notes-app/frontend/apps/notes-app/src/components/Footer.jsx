const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
    };

    const dateYear = new Date().getFullYear(); 
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki {dateYear}</em>
        </div>
    );
};

export default Footer;
