const Filter = ({ filter, handleFilterChange }) => (
    <form>
        <div>
            filter shown with <input onChange={handleFilterChange} value={filter} />
        </div>
    </form>
);

export default Filter;
