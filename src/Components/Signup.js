import React  from 'react';
import '../Styles/signup.css';
import signupimg from '../images/phone_image_placeholder.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from 'formik';
import backendUrl from '../config';
function Signup() {
  const nav = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_pw: "",
    terms: false,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
   
    password: yup
      .string()
      .matches(/[A-Za-z].*\d|\d.*[A-Za-z]/, "Password must contain letters and numbers")
      .required("Password is required"),
    
    terms: yup.bool().oneOf([true], "You must accept the Terms and Privacy Policies"),
  });

  const handleSubmit = (values, { resetForm }) => {
    axios
      .post(`${backendUrl}/api/create`, values)
      .then(response => {
        console.log(response.data);
        
        alert("Successfully Registered");
        resetForm();
        
        
        nav("/login");
       
      })
      
      .catch(error => {
        console.error("Signup error:", error);
        alert("Failed to register. Please try again.");
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={signupimg} className="signup-image" alt="Signup illustration" />
      </div>
      <div className="logo">
        <h1>Auric Treasures</h1>
      </div>
      <div className="signup-right">
        <h2>Sign up</h2>
        <p className='p'>Let's get you all set up so you can access your personal account.</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <form className="signup-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="p" className="error" />
              </div>
              <div className="form-group">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="p" className="error" />
              </div>
             
              <div className="form-group">
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="p" className="error" />
              </div>
             
              <div className="form-checkbox">
                <Field type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">
                  I agree to all the <span>Terms and Privacy Policies</span>
                </label>
                <ErrorMessage name="terms" component="p" className="error" />
              </div>
              <button type="submit" className="signup-button">
                Create account
              </button>
            </form>
          )}
        </Formik>
        <p className="signup-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p className="signup-or">Or Sign up with</p>
        <div className="signup-socials">
          <button className="social-button facebook">Facebook</button>
          <button className="social-button google">Google</button>
          <button className="social-button apple">Apple</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
