import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function VerifyOtp() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    try {

      const response = await api.post(
        "/api/auth/verify-otp",
        {
          email,
          otp
        }
      );

      toast.success(response.data);
      setLoading(false);
      navigate("/");

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

              Secure email verification for your account.

            </p>

          </div>

          <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-lg">

            <h2 className="text-2xl font-semibold mb-4">
              Verify Your Email
            </h2>

            <p className="text-slate-300">

              Enter the OTP sent to your email to activate your MoneyHad account.

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
                Verify OTP
              </h1>

              <p className="text-gray-500 mt-2">
                Activate your account
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
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
            disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 font-semibold transition"
            >
            {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center">

              <span className="text-gray-500">
                Already verified?
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

export default VerifyOtp;
