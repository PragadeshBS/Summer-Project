import Header from "../../../components/events/Header";
import { useForm } from "react-hook-form";
import signupStyles from "./signupStyles.module.css";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addUser = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    axios
      .post("/api/auth/signup", data)
      .then(() => {
        reset();
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className="EventCreationPage container">
      <Header title={"Sign up"} />
      <div className="row">
        <div className="col-lg-8">
          <div className="EventCreationForm  my-3 py-4 px-5 border shadow rounded">
            <form className="pt-3" onSubmit={handleSubmit(addUser)}>
              <div className="form-group">
                <label>
                  Name <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  {...register("userName", {
                    required: "Name is Required",
                  })}
                  className={`form-control m-3 w-75 ${
                    errors.userName ? signupStyles.errorInput : ""
                  }`}
                ></input>
                {errors.userName && (
                  <span className={`${signupStyles.error} w-75`}>
                    {errors.userName.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Register Number</label>
                <input
                  type="text"
                  className={`form-control m-3 w-75 ${
                    errors.regNo ? signupStyles.errorInput : ""
                  }`}
                  {...register("regNo")}
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Mobile Number <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={`form-control m-3 w-75 ${
                    errors.mobile ? signupStyles.errorInput : ""
                  }`}
                  {...register("mobile", {
                    required: "Mobile Number is Required",
                  })}
                ></input>
                {errors.mobile && (
                  <span className={`${signupStyles.error} w-75`}>
                    {errors.mobile.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Department</label>
                <select {...register("dept")} className="form-select w-75 m-3">
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
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control m-3 w-75 ${
                    errors.email ? signupStyles.errorInput : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                ></input>
                {errors.email && (
                  <span className={`${signupStyles.error} w-75`}>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control m-3 w-75 ${
                    errors.email ? signupStyles.errorInput : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                ></input>
                {errors.password && (
                  <span className={`${signupStyles.error} w-75`}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control m-3 w-75 ${
                    errors.email ? signupStyles.errorInput : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                ></input>
                {errors.confirmPassword && (
                  <span className={`${signupStyles.error} w-75`}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group w-75 text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
