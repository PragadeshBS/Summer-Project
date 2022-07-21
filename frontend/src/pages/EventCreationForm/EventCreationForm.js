import Header from "../../components/EventCreationForm/Header";
import { useForm } from "react-hook-form";
import "./EventCreationForm.css";
import axios from "axios";
const EventCreationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const additem = (data) => {
    const sdata = {
      eventName: data.name,
      eventStartDate: data.starttime,
      eventEndDate: data.endtime,
      venue: data.venue,
      dept: data.department,
      contactName: data.contactname,
      contactPhone: data.ContactNumber,
      contactEmail: data.contactemail,
      otherInfo: data.otherinfo,
    };
    console.log(sdata);
    axios
      .post("/api/events", sdata)
      .then((res) => {
        if (res.ok) {
          console.log("success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="EventCreationPage container">
      <Header title={"Event Creation Form"} />
      <div className="row">
        <div className="col-lg-8">
          <div className="EventCreationForm  my-3 py-4 px-5 border shadow rounded">
            <form className="pt-3" onSubmit={handleSubmit(additem)}>
              <div className="form-group">
                <label>Event Name</label>

                <input
                  type="text"
                  {...register("name", { required: "Name Field is Required" })}
                  className={`form-control m-3 w-75 ${
                    errors.name ? "errorinput" : ""
                  }`}
                ></input>
                {errors.name && (
                  <span className="error w-75">{errors.name.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Event Start Time</label>
                <input
                  type="datetime-local"
                  className={`form-control m-3 w-75 ${
                    errors.starttime ? "errorinput" : ""
                  }`}
                  {...register("starttime", {
                    required: "Start time is Required",
                  })}
                ></input>
                {errors.starttime && (
                  <span className={`error w-75`}>
                    {errors.starttime.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Event End Time</label>
                <input
                  type="datetime-local"
                  className={`form-control m-3 w-75 ${
                    errors.endtime ? "errorinput" : ""
                  }`}
                  {...register("endtime", {
                    required: "End Time is Required",
                  })}
                ></input>
                {errors.endtime && (
                  <span className="error w-75">{errors.endtime.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input
                  type="text"
                  className={`form-control m-3 w-75 ${
                    errors.venue ? "errorinput" : ""
                  }`}
                  {...register("venue", { required: "Venue is Required" })}
                ></input>
                {errors.venue && (
                  <span className="error w-75">{errors.venue.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  className="form-control m-3 w-75"
                  {...register("department")}
                ></input>
              </div>
              <div className="form-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  className="form-control m-3 w-75"
                  {...register("contactname", {
                    required: "Contact Name is Required",
                  })}
                ></input>
                {errors.contactname && (
                  <span className="error w-75">
                    {errors.contactname.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="number"
                  className={`form-control m-3 w-75 ${
                    errors.ContactNumber ? "errorinput" : ""
                  }`}
                  {...register("ContactNumber", {
                    required: "Contact Number is Required",
                  })}
                ></input>
                {errors.ContactNumber && (
                  <span className="error w-75">
                    {errors.ContactNumber.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  className={`form-control m-3 w-75 ${
                    errors.contactemail ? "errorinput" : ""
                  }`}
                  {...register("contactemail", {
                    required: "Contact Email is Required",
                  })}
                ></input>
                {errors.contactemail && (
                  <span className="error w-75">
                    {errors.contactemail.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Other Info</label>
                <textarea
                  className="form-control m-3 w-75"
                  rows="8"
                  {...register("otherinfo")}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="form-group ">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
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
