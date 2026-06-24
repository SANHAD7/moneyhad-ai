import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {

      const response = await api.post(
        "/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );
      localStorage.setItem(
  "email",
  email
);
      localStorage.setItem(
  "name",
  email.split("@")[0]
);

      toast.success(response.data.message);

      navigate("/dashboard");
      setLoading(false);
    } catch (error) {

      toast.error(
  error.response?.data ||
  error.message
);
setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Panel */}

        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white p-12 flex flex-col justify-between">

          <div>

            <h1 className="text-5xl font-bold mb-4">
              MoneyHad AI
            </h1>

            <p className="text-slate-300 leading-8">

              Smart expense tracking and AI-powered financial insights.

            </p>

          </div>

          <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg">

            <h2 className="text-2xl font-semibold mb-4">
              AI Financial Assistant
            </h2>

            <p className="text-slate-300">

              Monitor expenses, visualize spending patterns and make smarter financial decisions.

            </p>

          </div>

        </div>


        {/* Right Panel */}

        <div className="p-12 flex items-center">

          <form
            onSubmit={handleSubmit}
            className="w-full space-y-6"
          >

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                Welcome Back
              </h1>

              <p className="text-gray-500 mt-2">
                Login to continue
              </p>

            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
  disabled={loading}
  className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
>

  {loading ? "Logging in..." : "Login"}

</button>

            <div className="text-center">

              <span className="text-gray-500">
                Don't have an account?
              </span>

              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2"
              >
                Register
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Login;