import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  return (
    <header className="header">
      <div className="brand">
        <button onclick="openMenu()">
          &#9776;
        </button>
        <Link to="/">amazona</Link>
      </div>
      <div className="header-links">
        <Link to='/cart'>Cart</Link>
        <a href="cart.html">{ userInfo }</a>
        { userInfo ?  <Link to="/profile"> {userInfo.name} </Link> : <Link to="/signin">Sign In</Link>
        }
      </div>
    </header>
  );
}

export default Header;
