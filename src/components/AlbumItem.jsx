import { useDispatch } from "react-redux";
import { deleteAlbum} from "../features/albums/albumSlice";

const AlbumItem = ({album}) => {
    const dispatch = useDispatch()

    return (
    <div className="album">
        <div className="col-4 card w-50" key={album._id}>
            <h5 className="card-title">Album:{album.strAlbum}</h5>
            <h6 className="card-text">Year:{album.intYearReleased}</h6>
            {album.strAlbum && 
            <p>Album: {album.strAlbum}</p>
            }
            <button className="close" onClick={()=> dispatch(deleteAlbum(album._id))}> X</button>
        </div>
    </div>
    )
}

export default AlbumItem