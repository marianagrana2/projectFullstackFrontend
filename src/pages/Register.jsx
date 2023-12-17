import { FaUser} from 'react-icons/fa'

const Register = () => {
  return (
    <>
    <section className="heading">
        <h1>
        <FaUser /> Register
        </h1>
        <p>Please create your account</p>
    </section>
    <section className="form">
        <form>
            <div className="form-group">
                <input 
                type="text"
                className="form-control"
                id="name"
                name='name'
                placeholder='Your name here'
                
                 />
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
                 <input 
                type="password"
                className="form-control"
                id="password2"
                name='password2'
                placeholder='Confirm your password'   
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

export default Register