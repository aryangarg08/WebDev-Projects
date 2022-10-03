import React,{useState,useContext, useEffect} from 'react'
import { useHistory,Link } from 'react-router-dom';
import {AuthContext} from '../Context/AuthProvider';
import './Login.css'

function Login() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const {login,currentUser} =useContext(AuthContext);
    const history = useHistory();
     const handleSubmit = async(e)=>{
          console.log('hi');
        e.preventDefault()
        try {
          console.log('Logging in user')
          setLoading(true)
          await login(email, password)
          setLoading(false)
          history.push('/')
        } catch {
          setError("Failed to log in")
          setTimeout(()=>setError(''),2000)
          setLoading(false)
        }
      }
      useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])
    return (
        <div className="mycarda">
          <div className="cardab">
              <h2 className="h2a"><img style={{paddingRight:'1rem',marginTop:'-0.5rem'}} src="https://img.icons8.com/material/48/000000/movie-projector.png"/>WATCH TIME</h2>
              <form onSubmit={handleSubmit} >
             <div>
                <label className="labela" htmlFor=''>Email</label>
                    <input type='email' className="inputa" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label htmlFor='' className="labela">Password</label>
                    <input type='password' className="inputa" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit' className="buttona lefta" disabled={loading}>Login</button>
                <Link to="/signup"><button className="buttona righta">Signup</button></Link>
                {error?<h1>{error}</h1>:<></>}
                </form>
                </div>     
        </div>
    )
}

export default Login