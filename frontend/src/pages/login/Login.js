import Header from "../../components/EventCreationForm/Header";
import { useForm } from "react-hook-form";
import loginStyles from "./loginStyles.module.css";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const { user } = useAuthContext();
  const { login, error, isLoading } = useLogin();
  const [searchParams] = useSearchParams();
  const flow = searchParams.get("flow");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addUser = async (data) => {
    await login(data);
  };

  if (user) {
    return <Navigate to={flow ? `/${flow}` : "/"} />;
  }

  return (
    <div className="EventCreationPage container">
      <Header title={"Login"} />
      {isLoading && <div>Loading...</div>}
      <div className="row">
        <div className="col-lg-8">
          <div className="EventCreationForm  my-3 py-4 px-5 border shadow rounded">
            {flow && (
              <div className="alert alert-info w-75 text-center mx-auto">
                Login to continue...
              </div>
            )}
            <form className="pt-3" onSubmit={handleSubmit(addUser)}>
              <div className="form-group">
                <label className="ms-5">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control mx-auto m-3 w-75 ${
                    errors.email ? loginStyles.errorInput : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                ></input>
                {errors.email && (
                  <span className={`${loginStyles.error} w-75`}>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label className="ms-5">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control m-3 mx-auto w-75 ${
                    errors.email ? loginStyles.errorInput : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                ></input>
                {errors.password && (
                  <span className={`${loginStyles.error} w-75`}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group w-75 text-center">
                <button
                  type="submit"
                  className="btn btn-primary my-2 ms-1 btn-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
