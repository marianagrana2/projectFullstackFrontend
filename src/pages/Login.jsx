import { FaSignInAlt} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login,reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {

    const [formData,setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            navigate('/dashboard')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message,navigate, dispatch])

    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }
    
    const onSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }
    if(isLoading){
        return <Spinner />
    }
  return (
    <>
    <section className="heading">
        <h1>
        <FaSignInAlt/> Login
        </h1>
        <p>Please create your account</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <input 
                type="email"
                className="form-control"
                id="email"
                name='email'
                value={email}
                placeholder='Your email here'
                onChange={onChange}
                 />
                 <input 
                type="password"
                className="form-control"
                id="password"
                name='password'
                value={password}
                placeholder='Your password here'    
                onChange={onChange}           
                 />
            </div>
            <div className="form-group">
                <button 
                type="submit" 
                className="btn btn-block"
                >
                    Login
                </button>
            </div>
            </form>
    </section>
    </>
  )
}

export default Login