# GradMetric 🎓

### Measure Your Potential. Predict Your Future.

GradMetric is a machine learning-based web application that estimates a student's graduate university admission probability based on their academic profile.

The application analyzes important academic factors such as GRE score, TOEFL score, University Rating, Statement of Purpose (SOP), Letter of Recommendation (LOR), CGPA, and Research Experience.

It uses a trained Machine Learning model to generate admission probability predictions through an interactive web interface.

---

## 🚀 Features

- **Admission Prediction:** Estimates graduate admission probability using Machine Learning.
- **Academic Profile Analysis:** Takes GRE, TOEFL, CGPA, SOP, LOR, university rating, and research experience as inputs.
- **Multiple ML Algorithms:** Compares different regression algorithms to identify a suitable model.
- **Interactive Web Interface:** Simple and user-friendly React frontend.
- **Real-Time Predictions:** Connects the frontend with a FastAPI backend.
- **Model Information:** Displays the machine learning model used for prediction.

---

## 🛠️ Technology Stack

### Machine Learning
- Python
- NumPy
- Pandas
- Matplotlib
- Seaborn
- Scikit-learn
- Joblib

### Backend
- FastAPI
- Pydantic
- Uvicorn

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

---

## 🧠 Machine Learning Approach

The project uses supervised machine learning with regression algorithms.

The following algorithms were evaluated:

1. Linear Regression
2. Lasso Regression
3. Support Vector Regression (SVR)
4. Decision Tree Regression
5. Random Forest Regression
6. K-Nearest Neighbors Regression

After comparing model performance using cross-validation, **Linear Regression** was selected for the final application.

The model estimates admission probability based on patterns learned from historical admission data.

---

## 📊 Input Features

| Feature | Description |
|---|---|
| GRE | Graduate Record Examination score |
| TOEFL | English proficiency test score |
| University Rating | Rating of the selected university |
| SOP | Statement of Purpose rating |
| LOR | Letter of Recommendation rating |
| CGPA | Undergraduate academic performance |
| Research | Research experience (0 or 1) |

**Output:** Estimated graduate admission probability.

---

## 📁 Project Structure

```text
GradMetric/
│
├── data/
│   └── admission_predict.csv
│
├── notebooks/
│   └── admission_prediction.ipynb
│
├── models/
│   ├── gradmetric_model.pkl
│   └── model_name.pkl
│
├── backend/
│   ├── __init__.py
│   └── main.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/GradMetric.git
cd GradMetric
```

### 2. Install Backend Dependencies

```bash
pip install numpy pandas scikit-learn matplotlib seaborn joblib fastapi uvicorn pydantic
```

### 3. Start the Backend

Run this command from the main project directory:

```bash
python -m uvicorn backend.main:app --reload
```

Backend API:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

### 4. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/model-info` | Selected model information |
| POST | `/predict` | Generate admission prediction |

---

## ⚠️ Disclaimer

GradMetric provides estimated admission probabilities based on historical dataset patterns. These predictions are for educational and informational purposes only and do not guarantee university admission.

Actual admission decisions depend on several additional factors, including university requirements, applicant competition, application quality, and other criteria.

---

## 🎯 Project Objective

The main objective of GradMetric is to demonstrate how Machine Learning can be integrated with modern web technologies to build an interactive academic prediction application.

This project combines data analysis, supervised learning, model evaluation, backend API development, and frontend integration into one application.

---

## 👨‍💻 Author
Kapil Dev Joshi

B.Tech – Computer Science and Engineering

GitHub: https://github.com/kapiljoshi014

LinkedIn: https://www.linkedin.com/in/kapil-joshi-5a52b9261/

