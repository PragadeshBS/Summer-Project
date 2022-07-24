import Header from "../../components/EventCreationForm/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateEvent = () => {
  const [error, setError] = useState("");
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const updateEvent = (data) => {
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
    axios
      .patch(`/api/events/${id}`, sdata)
      .then((res) => {
        setError("");
        reset();
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    axios.get(`/api/events/${id}`).then((response) => {
      setEvent(response.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Header title={"Update event"} />
      <div className="row">
        <div className="col-lg-8">
          <div className="my-3 py-4 px-5 border shadow rounded">
            <form className="pt-3" onSubmit={handleSubmit(updateEvent)}>
              <div className="form-group">
                <label>Event Name</label>

                <input
                  type="text"
                  {...register("name", {
                    value: `${event.eventName}`,
                    required: "Name Field is Required",
                  })}
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
                    value: `${event.eventStartDate.substring(0, 16)}`,
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
                    value: `${
                      event.eventEndDate
                        ? event.eventEndDate.substring(0, 16)
                        : ""
                    }`,
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
                  {...register("venue", {
                    value: event.venue,
                    required: "Venue is Required",
                  })}
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
                  {...register("department", { value: event.dept })}
                ></input>
              </div>
              <div className="form-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  className="form-control m-3 w-75"
                  {...register("contactname", {
                    value: event.contactName,
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
                    value: event.contactPhone,
                  })}
                ></input>
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  className={`form-control m-3 w-75 ${
                    errors.contactemail ? "errorinput" : ""
                  }`}
                  {...register("contactemail", {
                    value: event.contactEmail,
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
                  {...register("otherinfo", { value: event.otherInfo })}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group ">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateEvent;
