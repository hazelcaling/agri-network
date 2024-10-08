import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link, useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  return (
    <>
      <button onClick={toggleMenu} className="profile-button">
        {user ? <FaUserCircle /> : <FaBars />}
      </button>
      {showMenu && (
        <ul className={'profile-dropdown'} ref={ulRef}>
          {user ? (
            <>
              <div className="menu-item no-hover">Hello, {user.first_name} {user.last_name} / {user.user_type.toUpperCase()}</div>
              {user.user_type === 'farmer' ? (
                <div className="menu-item">
                  <Link to='user/products' >Manage Listings</Link>
                </div>) : (
                <div className="menu-item">
                  <Link to='user/buyer-requests' >Manage Listings</Link>
                </div>)
              }
              <button onClick={logout}>Log Out</button>
            </>
          ) : (
            <>
              <div>
                <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />
              </div>
              <div>
                <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
              </div>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
