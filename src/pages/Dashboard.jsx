import { useEffect } from 'react' 
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus} from 'react-icons/fa'
import Spinner from '../components/Spinner'

const Dashboard = () => {


  return (
    <>
    <section className="heading">
      <h1>Welcome</h1>
      <p>My Favorite Artists</p>
    </section>
    <section className="content">
      <h3>No artist added yet.</h3>
      <Link to='/'>
      <button 
      type='submit'
      className='btn btn-block'
      ><FaPlus /> Add Artist
      </button>
      </Link>
    </section>

    </>
  )
}

export default Dashboard