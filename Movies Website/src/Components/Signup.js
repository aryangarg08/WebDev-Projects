import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider';
import {database } from '../firebase';
import { useHistory,Link } from 'react-router-dom';
import './Signup.css'

function Signup() {
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useHistory();
    const {signup,currentUser} =useContext(AuthContext);
    const handleSignup =async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            let res = await signup(email,password);
            let uid = res.user.uid;
            console.log(uid);
            await database.users.doc(uid).set({
                email:email,
                userId:uid,
                username:name,
                movies:[]
            })
            setLoading(false);
            console.log('User has Signed up');
            history.push('/');
        }
        catch(err){
            setError(err)
            setTimeout(()=>setError(''),2000);
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
        <div className="carda">
            <h2 className="h2a"><img style={{paddingRight:'1rem',marginTop:'-0.5rem'}} src="https://img.icons8.com/material/48/000000/movie-projector.png"/>WATCH TIME</h2>
            <form onSubmit={handleSignup} >
                <div>
                    <label className="labela" htmlFor=''>UserName</label>
                    <input className="inputa" type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

                </div>
                <div>
                <label className="labela" htmlFor=''>Email</label>
                    <input className="inputa" type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                <label className="labela" htmlFor=''>Password</label>
                    <input className="inputa" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <Link to="/login"><button className="buttona lefta">Login</button></Link>
                <button className="buttona righta" type='submit' disabled={loading}>SignUp</button>
            </form>
        </div>
        </div>
    )
}

export default Signup