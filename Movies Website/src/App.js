import Movies from './Components/Movies'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import PrivateRoute from './Components/PrivateRoute';
import AuthProvider from './Context/AuthProvider';
import Navbar from './Components/Navbar';

function App() {
  return (
    // <h1>Hello</h1>
    // <Movies />
    <>
    <Router>
     <AuthProvider>
     <Switch>
       <PrivateRoute exact path='/' component={Home}/>
       <PrivateRoute exact path='/favourite/:param' component={Movies}/>
       <Route path='/login' component={Login}/>
       <Route path='/signup' component={Signup}/>
     </Switch>
     </AuthProvider>
   </Router>
   </>
  );
} 

export default App; 