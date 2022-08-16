const RowCount = ({ curVal, setVal }) => {
  const options = [5, 10, 15, 20];
  return (
    <div className="row justify-content-center align-items-center mb-2 bg-dark">
      <div className="col-lg-2 mb-3 text-primary fs-5">
        <label>Events per page</label>
      </div>
      <div className="col-3 col-lg-2 mb-3">
        <select
          className="form-select bg-dark text-primary border-primary"
          value={curVal}
          onChange={(e) => {
            setVal(e.target.value);
          }}
        >
          {options &&
            options.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default RowCount;
