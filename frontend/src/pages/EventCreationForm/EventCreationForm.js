import Header from "../../components/EventCreationForm/Header";
import { useForm } from "react-hook-form";
import "./EventCreationForm.css";
import { useState } from "react";
import axios from "axios";
import UploadImage from "./UploadImage";
import { useAuthContext } from "../../hooks/useAuthContext";

const EventCreationForm = () => {
  const { token } = useAuthContext();
  const [error, setError] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const addEvent = (data) => {
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
        otherInfo: data.otherinfo,
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
      formData.append("img", selectedImage);
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
                <input
                  type="text"
                  className="form-control m-3 w-75"
                  {...register("department")}
                ></input>
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
                <label>Other Info</label>
                <textarea
                  className="form-control m-3 w-75"
                  rows="8"
                  {...register("otherinfo")}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              {uploading && (
                <div className="alert alert-secondary w-50">
                  Uploading your image...
                </div>
              )}
              <div className="form-group ">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  {selectedImage ? "Upload image & create event" : "Create"}
                </button>
              </div>
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
