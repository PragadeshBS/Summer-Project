import Header from "../../components/EventCreationForm/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadImage from "../EventCreationForm/UploadImage";
import { useAuthContext } from "../../hooks/useAuthContext";
import EventConflictModal from "../../components/EventConflictModal";

const UpdateEvent = () => {
  const { id } = useParams();

  const { token } = useAuthContext();
  const [error, setError] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const [imageModified, setImageModified] = useState(false);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const [checkingConflicts, setCheckingConflicts] = useState(false);
  const [conflictsExist, setConflictsExist] = useState(false);
  const [showConflictingEvents, setShowConflictingEvents] = useState(false);
  const [conflictingEvents, setConflictingEvents] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const updateEvent = (data) => {
    if (!showSubmitBtn) {
      setCheckingConflicts(true);
      axios
        .post(
          "/api/events/check-conflicts/",
          {
            from: data.starttime,
            to: data.endtime,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setCheckingConflicts(false);
          if (res.data.conflict) {
            setConflictsExist(true);
            setConflictingEvents(res.data.events);
          } else {
            setShowSubmitBtn(true);
          }
        });
    } else {
      const uploadImage = () => {
        if (selectedImage && selectedImage.size > 5000000) {
          setError("Image size must be less than 5 MB");
          setSuccess("");
          return;
        }
        if (data.starttime > data.endtime) {
          setError("Start time has to be lesser than end time");
          setSuccess("");
          return;
        }
        setUploading(true);
        setSuccess("");
        setError("");
        const formData = new FormData();
        formData.append("img", selectedImage);
        axios
          .post("/api/events/image", formData)
          .then((res) => {
            setUploading(false);
            submitEventForm(res.data._id);
            setSuccess("Image uploaded successfully...");
          })
          .catch((err) => {
            setError(err.message);
            setUploading(false);
          });
      };

      const submitEventForm = (imgId) => {
        const sdata = {
          eventName: data.name,
          eventStartDate: data.starttime,
          eventEndDate: data.endtime,
          venue: data.venue,
          dept: data.department,
          contactName: data.contactname,
          contactPhone: data.ContactNumber,
          contactEmail: data.contactemail,
          link: data.link,
          otherInfo: data.otherinfo,
          public: data.public,
        };
        if (imageModified) {
          if (selectedImage) {
            sdata.image = imgId;
          } else {
            sdata.image = "";
          }
        }
        axios
          .patch(`/api/events/${id}`, sdata)
          .then((res) => {
            setError("");
            setSuccess("Event updated successfully");
            reset();
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      };

      if (imageModified && selectedImage) {
        uploadImage();
      } else {
        submitEventForm(existingImage);
      }
    }
  };

  useEffect(() => {
    axios.get(`/api/events/${id}`).then((response) => {
      setEvent(response.data);
      if (response.data.image) {
        setExistingImage(`/api/events/image/${response.data._id}`);
      }
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
                <select
                  {...register("department", {
                    required: "Department is required",
                  })}
                  className="form-select w-75 m-3"
                >
                  <option value="AM">Automobile Engineering</option>
                  <option value="CT">Computer Science Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="EEE">
                    Electrical and Electronics Engineering
                  </option>
                  <option value="ECE">
                    Electronics and Communication Engineering
                  </option>
                  <option value="IE">Instrumentation Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="PT">Production Technology</option>
                  <option value="OTH">Other</option>
                </select>
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
                  })}
                ></input>
              </div>

              <div className="form-group">
                <label>Link</label>
                <input
                  type="string"
                  className={"form-control m-3 w-75"}
                  {...register("link")}
                ></input>
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
              <div>
                <label>
                  <input
                    type="checkbox"
                    {...register("public")}
                    defaultChecked={event.public}
                  />{" "}
                  Visible to others
                </label>
              </div>
              {error && <div className="alert alert-danger w-75">{error}</div>}
              {success && (
                <div className="alert alert-success w-75">{success}</div>
              )}
              {uploading && (
                <div className="alert alert-secondary w-50">
                  Uploading your image...
                </div>
              )}
              {checkingConflicts && (
                <div className="alert alert-secondary w-75">
                  Checking for conflicts...
                </div>
              )}
              {conflictsExist && (
                <div>
                  <div className="alert alert-danger">
                    One or more events are occuring in the same time frame that
                    you have specified
                  </div>
                  <div className="my-2">
                    <button
                      type="button"
                      onClick={() => setShowConflictingEvents(true)}
                      className="btn btn-secondary btn-lg"
                    >
                      View conflicting events
                    </button>
                  </div>
                  <div className="my-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setConflictsExist(false);
                        setShowSubmitBtn(true);
                      }}
                    >
                      Continue
                    </button>
                  </div>
                  <EventConflictModal
                    isOpen={showConflictingEvents}
                    close={() => setShowConflictingEvents(false)}
                    events={conflictingEvents}
                  />
                </div>
              )}
              {!showSubmitBtn && !conflictsExist && (
                <div className="form-group ">
                  <button
                    type="submit"
                    className="btn btn-primary my-2 ms-1 btn-lg"
                  >
                    Next
                  </button>
                </div>
              )}
              {showSubmitBtn && (
                <div className="form-group ">
                  <button
                    type="submit"
                    className="btn btn-primary my-2 ms-1 btn-lg"
                  >
                    {selectedImage ? "Upload image & update event" : "Update"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="col-lg-4">
          <UploadImage
            existingImage={existingImage}
            setExistingImage={setExistingImage}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setImageModified={setImageModified}
          />
        </div>
      </div>
    </div>
  );
};
export default UpdateEvent;
