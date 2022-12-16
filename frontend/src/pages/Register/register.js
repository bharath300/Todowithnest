import { Button, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [value, setusername] = useState("");
  const [password, setpassword] = useState("");

  function submitform() {
    if (value === "" || password === "") {
      alert("please enter valid input");
    } else {
      const requesthandler = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserName: value, password: password }),
      };

      fetch("/user/add", requesthandler).then(res=> res.json()).then((data) => {if(data.message === "success"){
        navigate("/signin");
      }
      else {
        toast.success('Username taken.');
      }
    });

      
    }
  }

  return (
    <><ToastContainer/>
      <div className="Signupparent">
        <div class="signup">
          <h1>SIGN UP</h1>

          <div class="name">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <br></br>
          <div class="pwd">
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(e) => setpassword(e.target.value)}
            />{" "}
          </div>
          <br></br>
          <Button variant="contained" onClick={submitform}>
            Sign-up
          </Button>
          <br></br>
          <Link onClick={() => navigate("/signin")}>Already a user ?</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
