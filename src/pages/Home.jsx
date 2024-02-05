import Spinner from "../components/Spinner"
import {useState, useEffect, createContext,useContext} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { FaSearch, FaRegHeart,FaArrowCircleRight} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom"
import albumService from "../features/albums/albumService"
import axios from "axios"

const AuthContext = createContext()
const Home = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const {albums, isLoading, isError, message} = useSelector((state) => state.album)

   const [data, setData] = useState([])
   const [artistName, setArtistName] = useState('')
   const [albumsResults, setAlbumsResults] = useState([])
   const [isDataFetched, setIsDataFetched] = useState(false)

  
    const handleButtonClick = async (index) => {
       if(!user){
        navigate("/register")
       } else{
        //Aqui tiene que llamar a la api y despues guardar el album en base de datos y mostrar en pantalla.
        try{
        
            const albumData = albumsResults[index]
            const artistName = albumData.strArtist

            const config ={
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            
            console.log("User desde frontend:", user)
            //Muestra el strAlbum en consola. 
            console.log(albumData)
            const albumName = albumData.strAlbum
            const  albumYear = albumData.intYearReleased

            const postResponse = await albumService.addAlbum({albumName, albumYear}, user.token)
            
         
            setIsDataFetched(true)
            
            navigate("/dashboard")
           }catch(error){
               console.error(error)
               setIsDataFetched(false)
           }
       
       }
        
    }

   const handleSearch = (event) => {
    setArtistName(event.target.value)
   }

   // Llamada a la API 
   const handleSubmit = async (event) => {
    event.preventDefault()  
    try{
     const response = await axios.get(`http://localhost:3005/api/v1/albums?artistName=${artistName}`)
     setAlbumsResults(response.data.albums)
     
    
    }catch(error){
        console.error(error)
        setIsDataFetched(false)
    }
   }

   useEffect(() => {
    setAlbumsResults([])
    setIsDataFetched(false)
   
   }, [user, navigate,dispatch])
  
  return (
    <>
    <section className="heading">
        <h1>
            <FaSearch /> Search
            </h1>
        <p>Find your favorite band or artist</p>
    </section>
    <section className="content">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                type="text"
                className="form-control"
                id="searchValue"
                name='searchValue' 
                value={artistName}
                onChange={handleSearch}
                placeholder='Search Artist or Band'
                />
            </div>
            <div className="form-group">
            <button 
                type="submit" 
                className="btn1 btn-block1"
                >Search
                </button>
            </div>  
        </form>
        </section>
        <section className="results">
        {albumsResults.map((album,index) => (          
                <div className="col-4 card w-50" key={album._id}>
                    <h5 className="card-title">{album.strAlbum}</h5>
                    <h6 className="card-text">{album.intYearReleased}</h6>
                        <ul>
                            {album.discography && album.discography.map((discography,discIndex) => (
                              <li key={discIndex}>{discography}</li> 
                            ))}
                        </ul>
                        <div className="button-section">                                            
                        <button 
                        id="favorite_button"
                        className="btn btn-outline-danger"
                        onClick={() => handleButtonClick(index)}> 
                         <FaRegHeart/>
                        </button>                                                                                
                        </div>
                </div>  
            ))}  
     </section>
    </>
)}

export default Home