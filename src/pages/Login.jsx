import { FaSignInAlt} from 'react-icons/fa'

const login = () => {
  return (
    <>
    <section className="heading">
        <h1>
        <FaSignInAlt/> Login
        </h1>
        <p>Please create your account</p>
    </section>
    <section className="form">
        <form>
            <div className="form-group">
            <input 
                type="email"
                className="form-control"
                id="email"
                name='email'
                placeholder='Your email here'
                 />
                 <input 
                type="password"
                className="form-control"
                id="password"
                name='password'
                placeholder='Your password here'               
                 />
            </div>
            <div className="form-group">
                <button 
                type="submit" 
                className="btn btn-block"
                >
                    Submit
                </button>
            </div>
            </form>
    </section>
    </>
  )
}

export default login