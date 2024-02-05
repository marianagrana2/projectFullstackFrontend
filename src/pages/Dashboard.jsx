import { useEffect } from 'react' 
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus} from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { getAlbums,reset } from '../features/albums/albumSlice'
import AlbumItem from '../components/AlbumItem'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {albums, isLoading, isError, message} = useSelector((state) => state.album)
  

  useEffect(() => {
    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    } else if(!albums){
      dispatch(getAlbums())
    }

    return () => {
      dispatch(reset())
    }
  },[user,navigate, isError, message,dispatch])

  if(isLoading){
    return <Spinner />
  }
  return (
    <>
    <section className="heading">
      <h1>Welcome {user && user.userName}</h1>
      <p>My Favorite Artists</p>
    </section>
    <section className="content">
      {Array.isArray(albums) && albums.length > 0 ?
      (
        <div className='albums'>
          {albums.map((album) => (
            <AlbumItem key={album._id} album={album} />
          ))}
        </div>):
        (<h3>No artist added yet.</h3>)}
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