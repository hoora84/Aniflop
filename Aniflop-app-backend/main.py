from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from database import engine, Base, get_db
from models import User
from schemas import SignupRequest, LoginRequest


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI()


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================================
# PASSWORD HASHING
# =========================================================

password_hash = PasswordHash.recommended()


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "AniFlop FastAPI backend is running!"
    }


# =========================================================
# SIGN UP
# =========================================================

@app.post("/signup")
def signup(
    user_data: SignupRequest,
    db: Session = Depends(get_db)
):

    # -----------------------------------------
    # Check if passwords match
    # -----------------------------------------

    if user_data.password != user_data.confirm_password:

        return {
            "success": False,
            "message": "Passwords do not match."
        }


    # -----------------------------------------
    # Check if email already exists
    # -----------------------------------------

    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()


    if existing_user:

        return {
            "success": False,
            "message": "Email already registered."
        }


    # -----------------------------------------
    # Hash password
    # -----------------------------------------

    hashed_password = password_hash.hash(
        user_data.password
    )


    # -----------------------------------------
    # Create new user
    # -----------------------------------------

    new_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        password=hashed_password
    )


    # -----------------------------------------
    # Save user to database
    # -----------------------------------------

    db.add(new_user)

    db.commit()

    db.refresh(new_user)


    # -----------------------------------------
    # Return success response
    # -----------------------------------------

    return {
        "success": True,
        "message": "Account created successfully.",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email
        }
    }


# =========================================================
# LOGIN
# =========================================================

@app.post("/login")
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):

    # -----------------------------------------
    # Find user by email
    # -----------------------------------------

    user = db.query(User).filter(
        User.email == login_data.email
    ).first()


    # -----------------------------------------
    # User not found
    # -----------------------------------------

    if not user:

        return {
            "success": False,
            "message": "Invalid email or password."
        }


    # -----------------------------------------
    # Check password
    # -----------------------------------------

    password_correct = password_hash.verify(
        login_data.password,
        user.password
    )


    # -----------------------------------------
    # Password incorrect
    # -----------------------------------------

    if not password_correct:

        return {
            "success": False,
            "message": "Invalid email or password."
        }


    # -----------------------------------------
    # Login successful
    # -----------------------------------------

    return {
        "success": True,
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email
        }
    }