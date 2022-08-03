const RowCount = ({ curVal, setVal }) => {
    const options = [5, 10, 15, 20];
    return (
      <div className="row justify-content-center align-items-center mb-2">
        {/* <div className="col-4"></div> */}
        <div className="col-2">
        <label>Events per page</label>
        </div>
        <div className="col-1">
        <select
        className="form-select"
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
            {/* <div className="col-4"></div> */}
      </div>
    );
  };
  
  export default RowCount;
  