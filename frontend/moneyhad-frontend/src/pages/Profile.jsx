import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Profile() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    api.get(
      "/api/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {

      setProfile(response.data);

    });

  }, []);

  if (!profile) {

    return (
      <h1>Loading...</h1>
    );

  }

  return (

    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-10">
          Profile 👤
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-2xl">

          <div className="flex justify-center mb-10">

            <div className="w-28 h-28 rounded-full bg-purple-600 text-white flex items-center justify-center text-4xl font-bold">

              {profile.name
                .split(" ")
                .map(word => word[0])
                .join("")
                .toUpperCase()}

            </div>

          </div>


          <div className="space-y-8">

            <div>

              <p className="text-gray-500">
                Name
              </p>

              <h1 className="text-2xl font-bold">
                {profile.name}
              </h1>

            </div>


            <div>

              <p className="text-gray-500">
                Email
              </p>

              <h1 className="text-xl">
                {profile.email}
              </h1>

            </div>


            <div>

              <p className="text-gray-500">
                Monthly Income
              </p>

              <h1 className="text-xl text-green-600 font-bold">
                ₹{profile.monthlyIncome}
              </h1>

            </div>


            <div>

              <p className="text-gray-500">
                Financial Goal
              </p>

              <h1 className="text-xl">
                {profile.financialGoal}
              </h1>

            </div>


            <div>

              <p className="text-gray-500">
                Risk Appetite
              </p>

              <h1 className="text-xl">
                {profile.riskAppetite}
              </h1>

            </div>


            <button
              className="bg-red-500 text-white px-8 py-4 rounded-xl hover:bg-red-600"
              onClick={() => {

                localStorage.clear();

                window.location.href = "/";

              }}
            >

              Logout

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;