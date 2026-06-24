import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    monthlyIncome: "",
    riskAppetite: "",
    financialGoal: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {

      const response = await api.post(
        "/api/auth/register",
        formData
      );

      toast.success(response.data);
      setLoading(false);
      navigate("/verify-otp");

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

      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Panel */}

        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white p-12 flex flex-col justify-between">

          <div>

            <h1 className="text-5xl font-bold mb-4">
              MoneyHad AI
            </h1>

            <p className="text-slate-300 leading-8">

              Smart budgeting, expense tracking and AI powered insights.

            </p>

          </div>

          <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg">

            <h2 className="text-2xl font-semibold mb-4">
              Your Personal Finance Assistant
            </h2>

            <p className="text-slate-300">

              Track expenses, improve savings and achieve your financial goals.

            </p>

          </div>

        </div>

        {/* Right Panel */}

        <div className="p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                Create Account
              </h1>

              <p className="text-gray-500 mt-2">
                Join MoneyHad today
              </p>

            </div>

            <input
              name="name"
              placeholder="Full Name"
              className="w-full border rounded-xl p-4"
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email Address"
              className="w-full border rounded-xl p-4"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border rounded-xl p-4"
              onChange={handleChange}
            />

            <input
              name="monthlyIncome"
              placeholder="Monthly Income"
              className="w-full border rounded-xl p-4"
              onChange={handleChange}
            />

            <input
              name="financialGoal"
              placeholder="Financial Goal"
              className="w-full border rounded-xl p-4"
              onChange={handleChange}
            />

            <input
              name="riskAppetite"
              placeholder="Risk Appetite"
              className="w-full border rounded-xl p-4"
              onChange={handleChange}
            />

            <button
  disabled={loading}
  className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
>

  {loading ? "Creating Account..." : "Register"}

</button>

            <div className="text-center">

              <span className="text-gray-500">
                Already have an account?
              </span>

              <Link
                to="/"
                className="text-blue-600 font-semibold ml-2"
              >
                Login
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Register;
