import Header from "../../components/EventCreationForm/Header";

const EventCreationForm = () => {
  return (
    <div className="EventCreationPage container">
      <Header title={"Event Creation Form"} />
      <div className="row">
        <div className="col-8">
          <div className="EventCreationForm  my-3 py-4 px-5 border shadow rounded">
            <form className="pt-3">
              <div className="form-group">
                <label>Event Name</label>

                <input type="name" className="form-control m-3 w-75"></input>
              </div>
              <div className="form-group">
                <label>Event Start Time</label>
                <input
                  type="datetime-local"
                  className="form-control m-3 w-75"
                ></input>
              </div>
              <div className="form-group">
                <label>Event End Time</label>
                <input
                  type="datetime-local"
                  className="form-control m-3 w-75"
                ></input>
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input type="name" className="form-control m-3 w-75"></input>
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="name" className="form-control m-3 w-75"></input>
              </div>
              <div className="form-group">
                <label>Contact Name</label>
                <input type="name" className="form-control m-3 w-75"></input>
              </div>
              <div className="form-group">
                <label>Contact Phone</label>
                <input type="number" className="form-control m-3 w-75"></input>
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input type="email" className="form-control m-3 w-75"></input>
              </div>

              <div className="form-group">
                <label>Other Info</label>
                <input type="name" className="form-control m-3 w-75"></input>
              </div>
              <div className="form-group ">
                <button type="submit" class="btn btn-primary my-2 ms-1 btn-lg">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCreationForm;
