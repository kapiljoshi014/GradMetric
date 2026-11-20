# Import required libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd
import joblib
from pathlib import Path


# Find the main GradMetric project folder
BASE_DIR = Path(__file__).resolve().parent.parent

# Location of saved ML model
MODEL_PATH = BASE_DIR / "models" / "gradmetric_model.pkl"
MODEL_NAME_PATH = BASE_DIR / "models" / "model_name.pkl"


# Load the trained ML model
model = joblib.load(MODEL_PATH)

# Load the selected model name
model_name = joblib.load(MODEL_NAME_PATH)


# Create FastAPI application
app = FastAPI(
    title="GradMetric API",
    description="Graduate University Admission Prediction System",
    version="1.0"
)


# Allow local React frontend to communicate with FastAPI
# This supports localhost and 127.0.0.1 on different ports.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Define student input details
class StudentDetails(BaseModel):

    GRE: float = Field(ge=290, le=340)
    TOEFL: float = Field(ge=92, le=120)
    University_Rating: float = Field(ge=1, le=5)
    SOP: float = Field(ge=1, le=5)
    LOR: float = Field(ge=1, le=5)
    CGPA: float = Field(ge=6.8, le=9.92)
    Research: int = Field(ge=0, le=1)


# Home endpoint
@app.get("/")
def home():

    return {
        "message": "Welcome to GradMetric API!",
        "status": "Backend is running"
    }


# Model information endpoint
@app.get("/model-info")
def model_info():

    return {
        "project": "GradMetric",
        "model_used": model_name,
        "purpose": "Graduate University Admission Prediction"
    }


# Prediction endpoint
@app.post("/predict")
def predict_admission(student: StudentDetails):

    # Convert student details into a DataFrame
    input_data = pd.DataFrame([{
        "GRE": student.GRE,
        "TOEFL": student.TOEFL,
        "University Rating": student.University_Rating,
        "SOP": student.SOP,
        "LOR": student.LOR,
        "CGPA": student.CGPA,
        "Research": student.Research
    }])

    # Generate prediction using trained model
    prediction = float(model.predict(input_data)[0])

    # Convert probability into percentage
    percentage = prediction * 100

    # Return prediction to frontend
    return {
        "model_used": model_name,
        "predicted_probability": round(prediction, 4),
        "predicted_percentage": round(percentage, 2),
        "message": "Prediction generated successfully"
    }
