import Spinner from "../components/Spinner"
import {useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { FaSearch} from 'react-icons/fa'

const Home = () => {
   const dispatch = useDispatch()
 
   const [data, setData] = useState([])
   const [Artist_Name, setArtist_Name] = useState('')
   const [isDataFetched, setIsDataFetched] = useState(false)
   const API_URL = `https://theaudiodb.com/api/v1/json/2/discography.php?s=${Artist_Name}`

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

   const handleSearch = (event) => {
    setArtist_Name(event.target.value)
   }

   const handleSubmit = (event) => {
    event.preventDefault()
    fetchData(); 
   }

   useEffect(() => {
   }, [Artist_Name])
  return (
    <>
    <section className="heading">
        <h1>
            <FaSearch /> Search
            </h1>
        <p>Find your favorite band or artist</p>
    </section>
    <section className="form">
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
                >
                </input>
            </div>
            <div className="form-group">
            <button 
                type="submit" 
                className="btn btn-block"
                >Search
                </button>
            </div>  
        </form>
        {data && data.map((album,index) => {
            return(
                <div key={index}>
                        <h3>{album.strAlbum}</h3>
                        <ul>
                            {album.discography && album.discography.map((discography,index) =>{
                             return <li key={index}>{discography}</li> 
                            })}
                        </ul>
                </div>
            )
        })

        }
    </section>
    </>
  )
}

export default Home