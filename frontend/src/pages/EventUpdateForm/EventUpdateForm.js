import Header from "../../components/EventCreationForm/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadImage from "../EventCreationForm/UploadImage";
import { useAuthContext } from "../../hooks/useAuthContext";
import EventConflictModal from "../../components/EventConflictModal";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

const UpdateEvent = () => {
  const { id } = useParams();

  const { token } = useAuthContext();
  const [error, setError] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [imageModified, setImageModified] = useState(false);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const [checkingConflicts, setCheckingConflicts] = useState(false);
  const [conflictsExist, setConflictsExist] = useState(false);
  const [showConflictingEvents, setShowConflictingEvents] = useState(false);
  const [conflictingEvents, setConflictingEvents] = useState([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

  const updateEvent = () => {
    if (event.eventStartDate > event.eventEndDate) {
      setError("Start time has to be lesser than end time");
      setSuccess("");
      return;
    } else {
      setError("")
    }
    if (!showSubmitBtn) {
      setCheckingConflicts(true);
      axios
        .post(
          "/api/events/check-conflicts/",
          {
            from: event.eventStartDate,
            to: event.eventEndDate,
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
        setUploading(true);
        setSuccess("");
        setError("");
        const formData = new FormData();
        formData.append("img", selectedImage);
        axios
          .post("/api/events/image", formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
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
        const dataToSend = {
          eventName: event.eventName,
          eventStartDate: event.eventStartDate,
          eventEndDate: event.eventEndDate,
          venue: event.venue,
          dept: event.dept,
          contactName: event.contactName,
          contactPhone: event.contactPhone,
          contactEmail: event.contactEmail,
          link: event.link,
          otherInfo: event.otherInfo,
          public: event.public,
        };
        if (imageModified) {
          if (selectedImage) {
            dataToSend["image"] = imgId;
          } else {
            dataToSend["image"] = "";
          }
        }
        axios
          .patch(`/api/events/${id}`, dataToSend, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setError("");
            setSuccess("Event updated successfully");
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

  const handleSubmit = (e, next) => {
    e.preventDefault();
    next();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Header title={"Update event"} />
      <div className="row">
        <div className="col-lg-8">
          <div className="my-3 py-4 px-5 border shadow rounded">
            <form
              className="pt-3"
              onSubmit={(e) => handleSubmit(e, updateEvent)}
            >
              <div className="form-group">
                <label>Event Name</label>

                <TextInput
                  trigger={["", " "]}
                  options={suggestions}
                  required={true}
                  value={event.eventName}
                  onChange={(e) => setEvent({ ...event, eventName: e })}
                  className="create-event-text-input form-control m-3 w-75"
                ></TextInput>
              </div>
              <div className="form-group">
                <label>Event Start Time</label>
                <input
                  required={true}
                  type="datetime-local"
                  className="form-control m-3 w-75"
                  value={event.eventStartDate.substr(0, 16)}
                  onChange={(e) =>
                    setEvent({ ...event, eventStartDate: e.target.value })
                  }
                ></input>
              </div>
              <div className="form-group">
                <label>Event End Time</label>
                <input
                  required={true}
                  type="datetime-local"
                  className="form-control m-3 w-75"
                  value={event.eventEndDate.substr(0, 16)}
                  onChange={(e) =>
                    setEvent({ ...event, eventEndDate: e.target.value })
                  }
                ></input>
              </div>
              <div className="form-group">
                <label>Venue</label>
                <TextInput
                  trigger={["", " "]}
                  options={suggestions}
                  required={true}
                  type="text"
                  className="create-event-text-input form-control m-3 w-75"
                  value={event.venue}
                  onChange={(e) => setEvent({ ...event, venue: e })}
                ></TextInput>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
                  value={event.dept}
                  onChange={(e) => setEvent({ ...event, dept: e.target.value })}
                  required={true}
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
                <TextInput
                  trigger={["", " "]}
                  options={suggestions}
                  required={true}
                  type="text"
                  className="create-event-text-input form-control m-3 w-75"
                  value={event.contactName}
                  onChange={(e) => setEvent({ ...event, contactName: e })}
                ></TextInput>
              </div>
              <div className="form-group">
                <label>Contact Phone</label>
                <TextInput
                  trigger={["", " "]}
                  options={suggestions}
                  type="number"
                  className="create-event-text-input form-control m-3 w-75"
                  value={event.contactPhone}
                  onChange={(e) => setEvent({ ...event, contactPhone: e })}
                ></TextInput>
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <TextInput
                  trigger={["", " "]}
                  options={suggestions}
                  type="email"
                  className="create-event-text-input form-control m-3 w-75"
                  value={event.contactEmail}
                  onChange={(e) => setEvent({ ...event, contactEmail: e })}
                ></TextInput>
              </div>

              <div className="form-group">
                <label>Link</label>
                <input
                  type="string"
                  className="form-control m-3 w-75"
                  value={event.link}
                  onChange={(e) => setEvent({ ...event, link: e.target.value })}
                ></input>
              </div>

              <div className="form-group">
                <label>Other Info</label>
                <TextInput
                  trigger={["", " "]}
                  options={suggestions}
                  className="form-control m-3 w-75"
                  rows="8"
                  value={event.otherInfo}
                  onChange={(e) => setEvent({ ...event, otherInfo: e })}
                  style={{ resize: "none" }}
                ></TextInput>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={event.public}
                    onChange={(e) =>
                      setEvent({ ...event, public: !event.public })
                    }
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
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          />
        </div>
      </div>
    </div>
  );
};
export default UpdateEvent;
