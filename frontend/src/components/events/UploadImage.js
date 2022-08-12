import axios from "axios";
import { useState } from "react";

const UploadImage = ({
  existingImage,
  setExistingImage,
  selectedImage,
  setSelectedImage,
  setImageModified,
  suggestions,
  setSuggestions,
}) => {
  const [analysing, setAnalysing] = useState(false);
  const [noSugForImg, setNoSugForImg] = useState(false);

  return (
    <div className="my-3 py-3 px-5 border shadow rounded">
      <div>
        <h3>Upload a Poster</h3>
        <div className="alert alert-success rounded p-1 my-2">
          Upload to get suggestions while filling this form!
        </div>
        <p className="small text-muted">
          Must be &lt; 5 MB, preferred ratio 16:9
        </p>
        {(existingImage || selectedImage) && (
          <div>
            <img
              width={"250px"}
              src={existingImage || URL.createObjectURL(selectedImage)}
              alt="..."
              className="d-block mx-auto rounded"
            />
            <br />
            <button
              className="btn btn-danger d-block mx-auto mb-3"
              onClick={() => {
                setExistingImage(null);
                setSelectedImage(null);
                setImageModified(true);
                setSuggestions([]);
                setNoSugForImg(false);
              }}
            >
              Remove
            </button>
          </div>
        )}
        {analysing && (
          <div className="alert alert-secondary">
            Analysing your image, this might take a few seconds...
          </div>
        )}
        {suggestions.length > 0 && (
          <div className="alert alert-success">
            Suggestions are now available!
          </div>
        )}
        {noSugForImg && (
          <div className="alert alert-danger">
            No suggestions available Upload an image that has readable text
          </div>
        )}
      </div>
      <div>
        <input
          type="file"
          required={true}
          name="img"
          accept="image/*"
          className="form-control"
          onChange={(event) => {
            setAnalysing(true);
            setSuggestions([]);
            setNoSugForImg(false);
            setSelectedImage(event.target.files[0]);
            const formData = new FormData();
            formData.append("img", event.target.files[0]);
            axios
              .post("https://ocr-backendmit.herokuapp.com/api/ocr/", formData)
              .then((res) => {
                setAnalysing(false);
                setSuggestions(res.data.res);
                if (res.data.res.length === 0) setNoSugForImg(true);
              });
            setExistingImage(null);
            setImageModified(true);
          }}
        />
      </div>
    </div>
  );
};
export default UploadImage;
