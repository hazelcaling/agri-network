import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import OpenModalLink from "../OpenModalLink/OpenModalLink";
import SignupFormModal from "../SignupFormModal";
import './AuthModal.css'

function AuthModal() {
    const { closeModal } = useModal();



  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="auth-modal-body">
            <p>Please <span className="auth-modal-login"><OpenModalLink buttonText='Log in' modalComponent={<LoginFormModal />}/></span> to create a listing.</p>
            <p>Don&apos;t have an account? <span className="auth-modal-signup"><OpenModalLink buttonText='Sign up' modalComponent={<SignupFormModal />}/></span></p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
