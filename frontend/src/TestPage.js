import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";

const TestPage = () => {
  const { token } = useAuthContext();
  const [formData, setFormData] = useState({
    eventStartDate: "",
    eventEndDate: "",
  });
  const handleSubmit = () => {
    axios
      .post(
        "/api/events/check-conflicts",
        {
          from: formData.eventStartDate,
          to: formData.eventEndDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="form-group">
          <label>
            Event Start Time <span className="text-danger">*</span>
          </label>
          <input
            required={true}
            type="datetime-local"
            className="form-control m-3 w-75"
            value={formData.eventStartDate}
            onChange={(e) =>
              setFormData({ ...formData, eventStartDate: e.target.value })
            }
          ></input>
        </div>
        <div className="form-group">
          <label>
            Event End Time <span className="text-danger">*</span>
          </label>
          <input
            required={true}
            type="datetime-local"
            className="form-control m-3 w-75"
            value={formData.eventEndDate}
            onChange={(e) =>
              setFormData({ ...formData, eventEndDate: e.target.value })
            }
          ></input>
        </div>
        <div>
          <button type="submit">DOne</button>
        </div>
      </form>
    </div>
  );
};
export default TestPage;
