import { clearPlan, generateAIPlan } from "@/redux/aiPlanSlice";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/pages/Header";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import rehypeHighlight from "rehype-highlight"; // For syntax highlighting
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AIPlanGenerator = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.aiPlan);
  const { user } = useSelector((state) => state.user);
  const planRef = useRef(null); // PDF section reference

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

  const handleExportPDF = async () => {
    const element = planRef.current;
    if (!element) return;
  
    const originalScroll = window.scrollY;
  
    // Ensure everything is visible before rendering
    window.scrollTo(0, 0);
  
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      scrollY: -window.scrollY,
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight,
    });
  
    window.scrollTo(0, originalScroll); // Reset scroll after rendering
  
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
    let heightLeft = pdfHeight;
    let position = 0;
  
    // For multipage PDF support
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();
  
    while (heightLeft > 0) {
      position -= pdf.internal.pageSize.getHeight();
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
  
    pdf.save("AI_Fitness_Plan.pdf");
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
            <div
              ref={planRef}
              className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-green-400 mb-4">
                ✅ Your fitness Plan
              </h2>
              <div className="prose prose-invert prose-p:leading-relaxed prose-li:my-1 max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {data}
                </ReactMarkdown>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => dispatch(clearPlan())}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 mr-3 rounded text-white"
                >
                  Clear
                </button>
                <button
                  onClick={handleExportPDF}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                >
                  Export as PDF 📄
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
