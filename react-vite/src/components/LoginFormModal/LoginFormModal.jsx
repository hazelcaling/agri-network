import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
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

  const demoUserFarmer = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  const demoUserBuyer = () => {
    setEmail('bobbie@aa.io')
    setPassword('password')
  }

  return (
    <div className="modal-auth">
      <div className="modal-content-auth">
        <span className="close" onClick={closeModal}>&times;</span>
      <h2 className="header-auth">Log In</h2>
      <form onSubmit={handleSubmit} id="auth-form">
        <div className="form-group-auth">
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
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
        <button type="submit" className="btn login">Log In</button>
        <button onClick={demoUserFarmer} className="btn farmer-buyer">Demo User Farmer</button>
        <button onClick={demoUserBuyer} className="btn farmer-buyer">Demo User Buyer</button>
      </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
