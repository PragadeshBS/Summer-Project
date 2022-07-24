import { useState } from "react";
import axios from "axios";

const UploadImage = ({ setImageId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("img", selectedImage);
    axios
      .post("api/events/image", formData)
      .then((res) => {
        setUploading(false);
        setImageId(res.data._id);
        setSuccess("Image uploaded successfully");
      })
      .catch((err) => {
        setError(err.message);
        setUploading(false);
      });
  };
  return (
    <div className="my-3 py-3 px-5 border shadow rounded">
      <div>
        <h3>Upload image</h3>
        <p>Upload an image, such as a poster for the event</p>
        {selectedImage && (
          <div>
            <img
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
              className="d-block mx-auto rounded"
            />
            <br />
            <button
              className="btn btn-danger d-block mx-auto mb-3"
              onClick={() => setSelectedImage(null)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            required={true}
            name="img"
            className="form-control"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
          <div className="my-2">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {uploading && (
              <div className="alert alert-secondary">
                Uploading your image...
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="my-2 btn btn-success"
          >
            Upload image
          </button>
        </form>
      </div>
    </div>
  );
};
export default UploadImage;
