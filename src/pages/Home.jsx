import Spinner from "../components/Spinner"
import {useState, useEffect, createContext,useContext} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { FaSearch, FaRegHeart,FaArrowCircleRight} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom"

const AuthContext = createContext()
const Home = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)

   const [data, setData] = useState([])
   const [Artist_Name, setArtist_Name] = useState('')
   const [isDataFetched, setIsDataFetched] = useState(false)
  
   const API_URL = `https://www.theaudiodb.com/api/v1/json/2/discography.php?s=${Artist_Name}`

    const fetchData = async () => {
        try{
        const response = await fetch (API_URL)
        const data = await response.json()
        setData(data.album)
        setIsDataFetched(true)

        } catch (error){
         console.error(error)
         setIsDataFetched(false)
        }
    }
    
    const handleButtonClick =  () => {
       if(!user){
        navigate("/register")
       } else{
        navigate("/dashboard")
       }
        
    }

   const handleSearch = (event) => {
    setArtist_Name(event.target.value)
   }

   const handleSubmit = (event) => {
    event.preventDefault()
    fetchData()   
   }

   useEffect(() => {
    setData([])
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
                value={Artist_Name}
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
        {data && data.length > 0 && 
          data.map((album,indexAlbum) => (               
                <div className="col-4 card w-50" key={indexAlbum}>
                    <h5 className="card-title">{album.strAlbum}</h5>
                        <ul>
                            {album.discography && album.discography.map((discography,discIndex) => (
                              <li key={discIndex}>{discography}</li> 
                            ))}
                        </ul>
                        <div className="button-section">                                            
                        <button 
                        id= "favorite_button"
                        className="btn btn-outline-danger"
                        onClick={handleButtonClick}> 
                         <FaRegHeart/>
                            </button>                                                                                
                        </div>
                </div>             
        ))}   
     </section>
    </>
)}

export default Home