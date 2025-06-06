import { useEffect, useState } from "react";
import "./aboutus.css";
import { FaUserGraduate, FaCode, FaChalkboardTeacher, FaQuestionCircle, FaTrophy, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Update team members for quiz app
  const groupMembers = [
    { name: "Sarika", role: "Frontend Developer", img: "/sarika photo .jpg" },
    { name: "Nidhi", role: "Backend Developer", img: "src/assets/images/shilpa.jpg" },
    { name: "Darshan", role: "UI/UX Designer", img: "src/assets/images/amar.jpg" },
  ];

  // Quiz app features/services
  const quizFeatures = [
    { icon: <FaQuestionCircle size={40} color="#7b1fa2" />, title: "Diverse Quizzes", description: "Test your knowledge with quizzes from various topics." },
    { icon: <FaTrophy size={40} color="#7b1fa2" />, title: "Leaderboard", description: "Compete with others and see your ranking." },
    { icon: <FaUserGraduate size={40} color="#7b1fa2" />, title: "Progress Tracking", description: "Track your quiz attempts and improvements." },
    { icon: <FaChalkboardTeacher size={40} color="#7b1fa2" />, title: "Learn & Improve", description: "Get explanations and learn from your mistakes." },
    { icon: <FaUsers size={40} color="#7b1fa2" />, title: "Community", description: "Join a community of quiz enthusiasts." },
    { icon: <FaCode size={40} color="#7b1fa2" />, title: "Easy to Use", description: "Simple and intuitive interface for everyone." },
  ];

  useEffect(() => {
    window.AOS?.init();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    else if (form.name.length > 20)
      newErrors.name = "Name must not exceed 20 characters.";

    if (!form.email.includes("@gmail.com"))
      newErrors.email = "Only Gmail addresses are accepted.";

    if (form.message.length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    else if (form.message.length > 200)
      newErrors.message = "Message must not exceed 200 characters.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      alert("Feedback submitted successfully!");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f3e7fa 0%, #e3f0ff 100%)",
        minHeight: "100vh",
        color: "#4a2c3b",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="container">
        <h1
          className="text-center mb-4"
          data-aos="fade-down"
          style={{ color: "#7b1fa2" }}
        >
          About Quiz Online
        </h1>
        <p
          className="text-center mb-5 fs-3 fw-semibold"
          style={{ color: "#4a148c" }}
        >
          Welcome to Quiz Online! Challenge yourself, learn new things, and compete with friends. Our mission is to make learning fun and engaging for everyone.
        </p>

        {/* Team Members */}
        <div className="row mb-5">
          {groupMembers.map((member, i) => (
            <div key={i} className="col-md-4 text-center mb-4" data-aos="zoom-in">
              <div
                className="card border-0 shadow h-100 p-4"
                style={{ backgroundColor: "rgba(123, 31, 162, 0.07)" }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mx-auto mt-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid rgb(18, 4, 23)" }}
                />
                <div className="card-body">
                  <h4 className="card-title fw-bold" style={{ color: "#880e4f" }}>{member.name}</h4>
                  <p className="fs-5" style={{ color: "#6a1b9a" }}>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz Features */}
        <h2
          className="text-center mb-4"
          data-aos="fade-up"
          style={{ color: "#7b1fa2" }}
        >
          App Features
        </h2>
        <div className="row mb-5">
          {quizFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="col-md-4 mb-4 text-center"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div
                className="p-5 border rounded shadow-sm h-100"
                style={{ backgroundColor: "rgba(123, 31, 162, 0.07)" }}
              >
                <div className="mb-3">{feature.icon}</div>
                <h5 className="fw-bold" style={{ color: "#880e4f" }}>{feature.title}</h5>
                <p className="fs-6" style={{ color: "#6a1b9a" }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <h2
          className="text-center mb-3"
          data-aos="fade-right"
          style={{ color: "#7b1fa2" }}
        >
          Send Us Feedback
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded shadow mx-auto"
          style={{ maxWidth: "600px", backgroundColor: "#f3e5f5" }}
          data-aos="fade-left"
        >
          {success && (
            <div className="alert alert-success" role="alert">
              Feedback submitted successfully!
            </div>
          )}
          <div className="mb-3">
            <label className="form-label" style={{ color: "#880e4f", fontWeight: "600" }}>Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{
                borderColor: errors.name ? "#d32f2f" : "#7b1fa2",
                boxShadow: errors.name ? "0 0 5px #d32f2f" : "none",
              }}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#880e4f", fontWeight: "600" }}>Gmail</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                borderColor: errors.email ? "#d32f2f" : "#7b1fa2",
                boxShadow: errors.email ? "0 0 5px #d32f2f" : "none",
              }}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#880e4f", fontWeight: "600" }}>Message</label>
            <textarea
              rows="4"
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                borderColor: errors.message ? "#d32f2f" : "#7b1fa2",
                boxShadow: errors.message ? "0 0 5px #d32f2f" : "none",
              }}
            />
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#7b1fa2",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;