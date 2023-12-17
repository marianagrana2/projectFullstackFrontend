import Spinner from "../components/Spinner"

const Home = () => {
  return (
    <>
    <section className="heading">
        <h1>Search</h1>
        <p>Find your favorite band or artist</p>
    </section>
    <section className="form">
        <form>
            <div className="form-group">
                <input
                type="text"
                className="form-control"
                id="searchValue"
                name='searchValue' 
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
    </section>
    
    </>
  )
}

export default Home