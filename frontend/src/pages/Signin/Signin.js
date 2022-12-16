import { Button, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState} from 'react';
import Cookies from 'js-cookie';
import "./signin.css";

function Signin() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  async function submitform() {
    if((username==="") || (password ==="")){
      alert("please enter valid input")
    }
    else{
    const requesthandler = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserName:username, password:password }),
    };

    fetch('user/check', requesthandler).then(res=>res.json()).then(async (data) => {
      
      if(data.message==="success"){
      
        const cookie=await fetch('user/session',
        {
          headers: { 'Authorization': `Bearer ${Cookies.get('Auth_token')}` }
        });
        const cookieResult=await cookie.json();
      localStorage.setItem("id",cookieResult.id)
      localStorage.setItem("flag", true);
      navigate("/add");
      }
      else
      {
        alert("enter correct username & password")
      }
      
    });

}
  }


  return (
    <>
      <div className="Signinparent">
        <div class="signin">
          <h1>SIGN IN</h1>

          <div class="name">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={(e)=>setusername(e.target.value)}
            />
          </div>
          <br></br>
          <div class="pwd">
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(e)=>setpassword(e.target.value)}
            />{" "}
          </div>
          <br></br>
          <Button variant="contained" onClick={submitform}>
            Submit
          </Button>
          <br></br>
          <Link onClick={()=> navigate("/")}>Not a user?</Link>
        </div>
      </div>
    </>
  );
}

export default Signin;
