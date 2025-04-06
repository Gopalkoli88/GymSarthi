import { clearPlan, generateAIPlan } from "@/redux/aiPlanSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import Header from "@/pages/Header";
 
const AIPlanGenerator = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.aiPlan);
  const { user } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    experience: "",
    daysPerWeek: "",
    workoutType: "",
    trainingMethod: "",
    injuries: "",
    dietPreference: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateAIPlan(form));
  };

  const options = {
    gender: ["Male", "Female", "Other"],
    goal: ["Weight Loss", "Muscle Gain", "Maintenance", "Strength Training"],
    experience: ["Beginner", "Intermediate", "Advanced"],
    workoutType: ["Home", "Gym", "Outdoor"],
    trainingMethod: ["HIIT", "Cardio", "Strength", "Mixed"],
    dietPreference: ["Vegetarian", "Non-Vegetarian", "Vegan", "Keto"],
  };

  return (
    <div className="min-w-[80dvw] flex flex-col min-h-[100dvh] bg-gradient-to-br from-gray-900 to-black text-white">
       <Header user={user} />
 
      <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
            🧠 AI Workout & Diet Plan Generator
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            {Object.keys(form).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="mb-1 capitalize font-semibold">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                {options[key] ? (
                  <select
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select {key}</option>
                    {options[key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={form[key]}
                    placeholder={key}
                    onChange={handleChange}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                )}
              </div>
            ))}
            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold transition"
              >
                {loading ? "Generating..." : "Generate Plan 🚀"}
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {data && (
            <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">
                ✅ Your 7-Day Plan
              </h2>
              <div className="prose prose-invert prose-p:leading-relaxed prose-li:my-1 max-w-none">
                <ReactMarkdown>{data}</ReactMarkdown>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => dispatch(clearPlan())}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanGenerator;
