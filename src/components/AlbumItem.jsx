import { useDispatch } from "react-redux";
import { deleteAlbum} from "../features/albums/albumSlice";
import { useSelector } from "react-redux";

const AlbumItem = ({album}) => {
    const dispatch = useDispatch()
    const albums = useSelector((state) => state.album.albums)

    return (
    <div className="album">
        {albums.map((album)=> (
             <div className="col-4 card w-50" key={album._id}>
             <h5 className="card-title">Album:{album.albumName}</h5>
             <h6 className="card-text">Year:{album.albumYear}</h6>
             {album.albumName && 
             <p>Album: {album.albumName}</p>
             }
             <button className="close" onClick={()=> dispatch(deleteAlbum(album._id))}> X</button>
         </div>
        ))}
    </div>
    )
}

export default AlbumItem