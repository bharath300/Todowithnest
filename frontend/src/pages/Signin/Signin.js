import { Button, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState} from 'react';
import "./signin.css";

function Signin() {
  const navigate = useNavigate();
  const [value, setusername] = useState("");
  const [idval, setid] = useState("");
  const [password, setpassword] = useState("");

  function submitform() {
    if((value==="") || (password ==="")){
      alert("please enter valid input")
    }
    else{
    localStorage.setItem("flag", true);

    const requesthandler = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserName:value, password:password }),
    };
    fetch('user/check', requesthandler).then((res)=>res.json()
    
    ).then((idval) => {
      if(idval){
        setid(idval);
      localStorage.setItem('id',idval)
      navigate("/add");
      }
      else
      {
        alert("enter correct username & password")
      }
      
    });


}
  }



  function move() {
    navigate("/");

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
          <Link onClick={move}>Not a user?</Link>
        </div>
      </div>
    </>
  );
}

export default Signin;
