import TextEditor from "./TextEditor"
import "./styles.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import {auth,provider} from "./FirebaseConfig";
import {useState ,useEffect} from "react";
import { signInWithPopup } from "firebase/auth";

function App() {

  const [user,setUser]=useState();
  const signIn=()=>{
    signInWithPopup(auth,provider).then((result)=>{
      setUser(result.user);
    }).catch((error)=>{
      alert(error.message);
    })
  }

  return (
    <div>
    {user ? (
      <>
      <div class="text"><h3>Welcome {user.displayName} !</h3> </div>
            
    <Router>
      <Switch>

        <Route path="/" exact>
      
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router> </>):(  <div><div>
        <button class="Login" type="button" onClick={signIn}>Sign In With Google</button>   </div>
        
        <Router>
      <Switch>

        <Route path="/" exact>
      
          <Redirect to={`/documents/${uuidV4()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
     
    </div>    
        )}
 
    </div>
  )
}

export default App
