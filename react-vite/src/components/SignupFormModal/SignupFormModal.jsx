import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userType, setUserType] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  console.log('errors', errors)
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (password !== confirmPassword) {
      newErrors.confirmPassword =
      "Password do not match"
    }

    if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long";
    }

    // Email validation
    const validateEmail = email => {
      const regex = /^[a-zA-Z0-9._%+=]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email)
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

  if (Object.keys(errors).length > 0) {
    setErrors(newErrors)
    return
  }

    const serverResponse = await dispatch(
      thunkSignup({
        user_type: userType,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="modal-auth">
      <div className="modal-content-auth">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2 className="header-auth">Create a new account</h2>
        {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}
        <form onSubmit={handleSubmit} id="auth-form">
          <div className="user-type-container">
            <select name="userType" id="" className="user-type-dropdown" required value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="">Select User Type</option>
              <option value='farmer' onChange={(e) => setUserType(e.target.value)}>Farmer</option>
              <option value='buyer' onChange={(e) => setUserType(e.target.value)}>Buyer</option>
            </select>
          </div>
          <div className="form-group-auth">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group-auth">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="form-group-auth">
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="form-group-auth">
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>

          <div className="form-group-auth">
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
            />

          </div>

          <button type="submit" className="btn login">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
