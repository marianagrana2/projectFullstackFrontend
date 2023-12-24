import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
const AlbumDetails = () => {
    const {idAlbum} = useParams()
    const [data, setData] = useState([])
    const [albumid, setAlbumid] = useState('')
    const [isDataFetched, setIsDataFetched] = useState(false)
    
    console.log(albumid, idAlbum)
    const API_URL = `https://theaudiodb.com/api/v1/json/2/track.php?m=${albumid}`


    const fetchData = async () => {
        try{
            const response = await fetch (API_URL)
            const data = await response.json()
            setData(data.track)
            setIsDataFetched(true)
        }catch(error){
         console.error(error)
         setIsDataFetched(false)
        }
    }

    useEffect(()=> {
        setAlbumid(idAlbum);
        console.log(setAlbumid)
        if(albumid.trim()=== "") {
            setData([])
            setIsDataFetched(false)
            return
        }
        
    fetchData() 
}, [albumid]) 
  return (
    <>
    <section className="container">
        <div className="card">
            <div className="card-title">
                <h3>{isDataFetched && data.length > 0 ? data[0].strAlbum : "Loading..."}</h3>
            </div>
            <div className="card-body">
            <div className="row">
                <div className="col-me-4">
                    <div className="col-md-8">
                    <h4>Tracks:</h4>
                    </div>
                    <div className="card-body">
                        {isDataFetched && data.length > 0 ?(
                            <ul key={albumid}>
                            {data.map((trackItem) => (                            
                                   <li key={trackItem.id}>
                                    Track: {trackItem?.strTrack}
                                    </li>
                            ))}     
                        </ul>                          
                        ) :(
                           <p>{isDataFetched ? "No tracks information available." : "Loading..."}</p>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default AlbumDetails