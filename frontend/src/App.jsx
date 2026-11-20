import { useState } from "react";
import "./App.css";

function App() {

  // Store all student input details
  const [formData, setFormData] = useState({
    GRE: "",
    TOEFL: "",
    University_Rating: "",
    SOP: "",
    LOR: "",
    CGPA: "",
    Research: "0"
  });

  // Store prediction result
  const [prediction, setPrediction] = useState(null);

  // Store success or error message
  const [message, setMessage] = useState("");

  // Track loading state
  const [loading, setLoading] = useState(false);


  // Handle changes in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    // Clear old results when user changes inputs
    setPrediction(null);
    setMessage("");
  };


  // Send student details to FastAPI backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setPrediction(null);
    setMessage("");

    try {

      // Send POST request to FastAPI
      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          // Convert input values into numbers
          body: JSON.stringify({
            GRE: Number(formData.GRE),
            TOEFL: Number(formData.TOEFL),
            University_Rating: Number(formData.University_Rating),
            SOP: Number(formData.SOP),
            LOR: Number(formData.LOR),
            CGPA: Number(formData.CGPA),
            Research: Number(formData.Research)
          })
        }
      );

      // Convert backend response into JavaScript object
      const data = await response.json();

      // Handle backend validation or server errors
      if (!response.ok) {
        const errorDetails = Array.isArray(data.detail)
          ? data.detail.map((item) => item.msg).join(", ")
          : data.detail || data.message || "Prediction failed";

        throw new Error(errorDetails);
      }

      // Save prediction result
      setPrediction(data);

      setMessage("Your prediction was generated successfully!");

    } catch (error) {

      // Display error if request fails
      setMessage("Error: " + error.message);

    } finally {

      // Stop loading indicator
      setLoading(false);
    }
  };


  return (

    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar">

        <div className="logo">
          Grad<span>Metric</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#predict">Prediction</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <a href="#predict" className="nav-button">
          Get Started
        </a>

      </nav>


      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="hero-tag">
            MACHINE LEARNING POWERED ADMISSION ANALYSIS
          </p>

          <h1>
            Your Academic Journey,
            <br />
            <span>Measured Intelligently.</span>
          </h1>

          <p className="hero-description">
            Discover your graduate admission potential using
            academic performance, university preferences and
            machine learning.
          </p>

          <a href="#predict" className="primary-button">
            Analyze My Profile →
          </a>

        </div>


        {/* Hero Preview Card */}
        <div className="hero-card">

          <p className="card-label">
            GRADMETRIC ANALYTICS
          </p>

          <h2>Academic Profile</h2>

          <div className="profile-stat">
            <span>GRE Score</span>
            <strong>337</strong>
          </div>

          <div className="profile-stat">
            <span>TOEFL Score</span>
            <strong>118</strong>
          </div>

          <div className="profile-stat">
            <span>CGPA</span>
            <strong>9.65</strong>
          </div>

          <div className="profile-stat">
            <span>Research</span>
            <strong>Yes</strong>
          </div>

          <div className="preview-result">
            <span>Admission Potential</span>
            <h2>95.84%</h2>
          </div>

          <p className="preview-note">
            Illustrative sample prediction
          </p>

        </div>

      </section>


      {/* Features Section */}
      <section className="features" id="features">

        <div className="section-heading">

          <p>WHY GRADMETRIC?</p>

          <h2>
            Understand Your Academic Potential
          </h2>

          <span>
            Make informed decisions with machine learning.
          </span>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <span className="feature-number">01</span>

            <h3>Machine Learning</h3>

            <p>
              Uses a trained Linear Regression model to
              estimate graduate admission probability.
            </p>

          </div>


          <div className="feature-card">

            <span className="feature-number">02</span>

            <h3>Academic Analysis</h3>

            <p>
              Evaluate important factors such as GRE,
              TOEFL, CGPA and research experience.
            </p>

          </div>


          <div className="feature-card">

            <span className="feature-number">03</span>

            <h3>Data-Driven Insights</h3>

            <p>
              Explore your academic profile with simple
              and understandable results.
            </p>

          </div>

        </div>

      </section>


      {/* Prediction Form Section */}
      <section className="prediction-section" id="predict">

        <div className="prediction-container">

          <div className="section-heading">

            <p>ADMISSION PREDICTION</p>

            <h2>
              Let's Analyze Your Profile
            </h2>

            <span>
              Enter your academic details to explore
              your graduate admission potential.
            </span>

          </div>


          <form className="prediction-form" onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* GRE Score */}
              <div className="form-group">

                <label htmlFor="GRE">GRE Score</label>

                <input
                  type="number"
                  id="GRE"
                  name="GRE"
                  placeholder="Enter GRE score"
                  min="290"
                  max="340"
                  value={formData.GRE}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* TOEFL Score */}
              <div className="form-group">

                <label htmlFor="TOEFL">TOEFL Score</label>

                <input
                  type="number"
                  id="TOEFL"
                  name="TOEFL"
                  placeholder="Enter TOEFL score"
                  min="92"
                  max="120"
                  value={formData.TOEFL}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* University Rating */}
              <div className="form-group">

                <label htmlFor="University_Rating">
                  University Rating
                </label>

                <select
                  id="University_Rating"
                  name="University_Rating"
                  value={formData.University_Rating}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select Rating</option>
                  <option value="1">1 - Low</option>
                  <option value="2">2 - Below Average</option>
                  <option value="3">3 - Average</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>

                </select>

              </div>


              {/* SOP Rating */}
              <div className="form-group">

                <label htmlFor="SOP">SOP Rating</label>

                <input
                  type="number"
                  id="SOP"
                  name="SOP"
                  placeholder="Enter SOP rating"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.SOP}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* LOR Rating */}
              <div className="form-group">

                <label htmlFor="LOR">LOR Rating</label>

                <input
                  type="number"
                  id="LOR"
                  name="LOR"
                  placeholder="Enter LOR rating"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.LOR}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CGPA */}
              <div className="form-group">

                <label htmlFor="CGPA">CGPA</label>

                <input
                  type="number"
                  id="CGPA"
                  name="CGPA"
                  placeholder="Enter your CGPA"
                  min="6.8"
                  max="9.92"
                  step="0.01"
                  value={formData.CGPA}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Research Experience */}
              <div className="form-group full-width">

                <label htmlFor="Research">
                  Research Experience
                </label>

                <select
                  id="Research"
                  name="Research"
                  value={formData.Research}
                  onChange={handleChange}
                  required
                >

                  <option value="0">
                    No Research Experience
                  </option>

                  <option value="1">
                    Yes, I have Research Experience
                  </option>

                </select>

              </div>

            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >

              {loading
                ? "Analyzing Your Profile..."
                : "Analyze My Profile →"}

            </button>


            {/* Success or Error Message */}
            {message && (
              <p
                className={
                  prediction
                    ? "success-message"
                    : "error-message"
                }
              >
                {message}
              </p>
            )}

          </form>


          {/* Prediction Result */}
          {prediction && (

            <div className="result-card">

              <p className="result-label">
                YOUR GRADMETRIC RESULT
              </p>

              <h2>
                {prediction.predicted_percentage}%
              </h2>

              <h3>
                Predicted Admission Probability
              </h3>

              <div className="result-details">

                <p>
                  <span>Model Used</span>
                  <strong>{prediction.model_used}</strong>
                </p>

                <p>
                  <span>Predicted Probability</span>
                  <strong>
                    {prediction.predicted_probability}
                  </strong>
                </p>

              </div>

              <p className="result-disclaimer">
                This is a machine learning estimate based on
                historical data. It is not a guarantee of admission.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">

        <div className="section-heading">

          <p>THE PROCESS</p>

          <h2>How GradMetric Works</h2>

        </div>


        <div className="steps-grid">

          <div className="step-card">

            <span>01</span>

            <h3>Enter Your Details</h3>

            <p>
              Provide your academic information
              through the prediction form.
            </p>

          </div>


          <div className="step-card">

            <span>02</span>

            <h3>Model Analysis</h3>

            <p>
              The trained machine learning model
              analyzes your academic profile.
            </p>

          </div>


          <div className="step-card">

            <span>03</span>

            <h3>View Your Prediction</h3>

            <p>
              Receive an estimated admission probability
              based on the supplied details.
            </p>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="footer">

        <h2>
          Grad<span>Metric</span>
        </h2>

        <p>
          Measure Your Potential. Predict Your Future.
        </p>

        <p className="footer-copy">
          © 2026 GradMetric. Academic Machine Learning Project.
        </p>

      </footer>

    </div>

  );
}

export default App;
