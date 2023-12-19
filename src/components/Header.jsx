import {FaSignInAlt, FaSignOutAlt, FaUser, FaMusic} from 'react-icons/fa'
import {Link,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
    }
  return (
    <header className='header'>
        <div className='logo'>
            <Link to="/">Music Seeker</Link>
        </div>
        <ul>
            {user ? (
                <>
                <ul>
                    <li>
                        <Link to='/dashboard'>
                            <FaMusic />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                </button>
                </li>
                </ul>
               
                </>
            ):
            (<>
             <li>
            <Link to="/login">
                <FaSignInAlt /> Login
            </Link>
            </li>
            <li>
            <Link to="/register">
                <FaUser /> Register
            </Link>
            </li></>)}
           
        </ul>
    </header>
  )
}

export default Header