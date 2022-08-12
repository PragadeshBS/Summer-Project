import Header from "../../../components/events/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/forgot-password", {
        email,
      })
      .then(() => {
        setShowMsg(true);
        setEmail("");
      });
  };
  return (
    <div className="EventCreationPage container">
      <Header title={"Reset password"} />
      <div className="row">
        <div className="col-lg-8">
          <div className="EventCreationForm  my-3 py-4 px-5 border shadow rounded">
            <form className="pt-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="ms-5">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="form-control mx-auto m-3 w-75"
                  required={true}
                ></input>
              </div>
              <div className="form-group w-75 text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Done
                </button>
              </div>
              {showMsg && (
                <div className="my-2 alert alert-success">
                  Check your email for further instructions
                </div>
              )}
              <div>
                <Link to="/login">
                  <span className="text-muted small">Back to login</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
