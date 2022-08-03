import Header from "../../components/EventCreationForm/Header";
import { useForm } from "react-hook-form";
import "./EventCreationForm.css";
import { useState } from "react";
import axios from "axios";
import UploadImage from "./UploadImage";
import { useAuthContext } from "../../hooks/useAuthContext";
import EventConflictModal from "../../components/EventConflictModal";

const EventCreationForm = () => {
  const { token } = useAuthContext();
  const [error, setError] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

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
  const addEvent = (data) => {
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
        if (imgId) {
          sdata.image = imgId;
        }
        axios
          .post("/api/events", sdata, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setError("");
            setSuccess("Event created successfully");
            reset();
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      };

      const uploadImage = () => {
        setUploading(true);
        setSuccess("");
        setError("");
        const formData = new FormData();
        formData.append("img", selectedImage, {
          headers: { Authorization: `Bearer ${token}` },
        });
        axios
          .post("api/events/image", formData)
          .then((res) => {
            setUploading(false);
            setSuccess("Image uploaded successfully...");
            submitEventForm(res.data._id);
          })
          .catch((err) => {
            setError(err.message);
            setUploading(false);
          });
      };
      if (selectedImage) {
        uploadImage();
      } else {
        submitEventForm();
      }
    }
  };
  return (
    <div className="EventCreationPage container">
      <Header title={"Create an Event"} />
      <div className="row">
        <div className="col-lg-8">
          <div className="EventCreationForm  my-3 py-3 px-5 border shadow rounded">
            <h3>Event details</h3>
            <form className="pt-3" onSubmit={handleSubmit(addEvent)}>
              <div className="form-group">
                <label>
                  Event Name <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  {...register("name", { required: "Event name is Required" })}
                  className={`form-control m-3 w-75 ${
                    errors.name ? "errorinput" : ""
                  }`}
                ></input>
                {errors.name && (
                  <span className="error w-75">{errors.name.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Event Start Time <span className="text-danger">*</span>
                </label>
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
                <label>
                  Venue <span className="text-danger">*</span>
                </label>
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
                <select
                  {...register("department")}
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
                  <option value="OTH">Others</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Contact Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control m-3 w-75 ${
                    errors.contactname ? "errorinput" : ""
                  }`}
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
                  {...register("ContactNumber", {})}
                ></input>
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  className={`form-control m-3 w-75 ${
                    errors.contactemail ? "errorinput" : ""
                  }`}
                  {...register("contactemail", {})}
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
                  {...register("otherinfo")}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    {...register("public")}
                    defaultChecked={true}
                  />{" "}
                  Visible to others
                </label>
              </div>
              {error && <div className="alert alert-danger w-75">{error}</div>}
              {success && (
                <div className="alert alert-success w-75">{success}</div>
              )}
              {uploading && (
                <div className="alert alert-secondary w-75">
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
                    {selectedImage ? "Upload image & create event" : "Create"}
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
            setImageModified={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default EventCreationForm;
