import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const TrackList = () => {
    const {albumid} = useParams()
    const [track, setTrack] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            try{
            const response = await fetch(`https://www.theaudiodb.com/api/v1/json/2/track.php?m=${albumid}`)
            if(response.ok){
                const data = await response.json()
                console.log("API Response:", data)
                if(data.track){
                    setTrack(data.track)
                }
            }
            console.log(response)
        }catch(error){
            console.error("Error fetching data:",error)
        }
            fetchData()
        }    
         
    }, [albumid])

    const displayTracks = () => {
        return track.map((track, indexTrack)=>{
            return <li key={indexTrack}>{track.strTrack}</li>
        })
    }
   
  return (
    <>
    <div>
       <h2>Tracks:</h2>
       <ul>{displayTracks()}</ul>
    </div>
    </>
  )
}

export default TrackList 