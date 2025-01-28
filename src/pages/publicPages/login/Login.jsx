import InputField from "@components/Input";
import Spinner from "@components/Spinner";
import { paths } from "@routes/paths";
import useAuthStore, { getLoggedInUserPath } from "@store/authStore";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {
    login,
    error,
    isLoading,
    setError,
    user,
    isAuthenticated,
    validateAuth,
  } = useAuthStore();


  const [authLoading, setAuthLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: values.email,
      password: values.password,
    };
    await login(data, navigate);
  };

  useEffect(() => {
    const verifyAuth = async () => {
      setAuthLoading(true);
      try {
        await validateAuth(); 
     
      } finally {
        setAuthLoading(false);
      }
    };

    verifyAuth();
  }, [validateAuth]);

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate(getLoggedInUserPath(user));
    }
  }, [user, isAuthenticated, navigate]);

  if (authLoading) {
    return <Spinner />;
  }


  return (
    <section className="">
      <div className="bg-room bg-cover bg-center h-screen lg:h-[560px] relative flex justify-center items-center  ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}

        <div className=" z-20 w-[80%] lg:w-[40%] bg-accent p-5 rounded-md shadow-2xl ">
          <h3 className="h3 text-white flex items-center gap-x-2 justify-center">
            Login
            <FaLock
              title="Secured by Next securities"
              className="text-black"
            />{" "}
          </h3>
          <form action="" method="post" onSubmit={handleSubmit}>
            <InputField
              placeholder="Email"
              name='email'
              value={values.email}
              onChange={handleChange}
              autoFocus
              error={error}
            />
            <InputField
              placeholder="Password"
              name='password'
              value={values.password}
              onChange={handleChange}
              error={error}
            />
            <button type="submit" className="btn btn-secondary hover:bg-black/65 w-full py-2 rounded-sm mb-4 ">
              {isLoading ? "Please Wait..." : "Submit"}
            </button>
            <p>
              Forgotten Password ?{" "}
              <Link to={paths.ForgotPassword} className="">
                click here
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
