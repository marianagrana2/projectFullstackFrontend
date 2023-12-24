import { useState, useEffect } from 'react'
import { FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register,reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {

    const [formData,setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        password2: ''
    })

    const {userName, email, password, password2} = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            navigate('/login')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if(password !== password2){
            toast.error("Passwords don't match, please try again.")
        }else {
            const userData = {
                userName,
                email,
                password
            }
            dispatch(register(userData))
        }
    }
    if(isLoading){
        return <Spinner />
    }

  return (
    <>
    <section className="heading">
        <h1>
        <FaUser /> Register
        </h1>
        <p>Please create your account</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                type="text"
                className="form-control"
                id="userName"
                name='userName'
                value={userName}
                placeholder='Your name here'
                onChange={onChange}               
                 />
                 <input 
                type="email"
                className="form-control"
                id="email"
                name='email'
                value={email}
                placeholder='email@example.com'
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
                 <input 
                type="password"
                className="form-control"
                id="password2"
                name='password2'
                value={password2}
                placeholder='Confirm your password'  
                onChange={onChange} 
                 />
            </div>
            <div className="form-group">
                <button 
                type="submit" 
                className="btn1 btn-block1"
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