import { useDispatch } from "react-redux";
import { deleteAlbum} from "../features/albums/albumSlice";
import { useSelector } from "react-redux";

const AlbumItem = ({album}) => {
    const dispatch = useDispatch()
    const albums = useSelector((state) => state.album.albums)

    const handleDeleteAlbum = async (idAlbum) => {
        try{
            await dispatch(deleteAlbum(idAlbum))
            console.log("albumitem albumid:",deleteAlbum(idAlbum))
        }catch(error){
            console.error('Error deleting album:', error)
        }
    }
    return (
    <div className="album">
        {albums.map((currentAlbum)=> (
             <div className="col-4 card w-50" key={currentAlbum._id}>
             <h5 className="card-title">Album: {currentAlbum.albumName}</h5>
             <h6 className="card-text">Year: {currentAlbum.albumYear}</h6>
             {currentAlbum.albumName && 
             <p>Album: {currentAlbum.albumName}</p>
             }
             <button className="close" onClick={()=> handleDeleteAlbum(currentAlbum._id)}> X</button>
         </div>
        ))}
    </div>
    )
}

export default AlbumItem