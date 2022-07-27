const UploadImage = ({
  existingImage,
  setExistingImage,
  selectedImage,
  setSelectedImage,
  setImageModified,
}) => {
  return (
    <div className="my-3 py-3 px-5 border shadow rounded">
      <div>
        <h3>Upload image</h3>
        <p>Upload an image, such as a poster for the event</p>
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
              }}
            >
              Remove
            </button>
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
            setExistingImage(null);
            setSelectedImage(event.target.files[0]);
            setImageModified(true);
          }}
        />
      </div>
    </div>
  );
};
export default UploadImage;
