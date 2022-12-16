import { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import List from "../List/list";
import "./add.css";

function Add() {
  const navigate = useNavigate();
  const [val, setval] = useState("");

  const [fetchflag, setFetchflag] = useState(false);
  const textRef = useRef("");

  const IDval=JSON.parse(localStorage.getItem("id"))
  const submitForm = async () => {
    if ( textRef.current.value===""){
      alert("try again");
    }
    else{
    const requesthandler = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: val, user: IDval}),
    };

    await fetch("/notes/add", requesthandler).then((response) =>
      response.json()
    );
    setFetchflag(!fetchflag);
  setval(" ");
  }
  };

  async function logout() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch("/user/logout", requestOptions);
    localStorage.clear();
    navigate("/signin");
  }


  return (
    <>
      <div className="holderblock">
        <Button variant="contained" color="inherit" onClick={logout}>
          Logout
        </Button>
      </div>
      <h1>Listapp</h1>
      <div className="container">
        <h3>Enter item:</h3>

        <input
          ref={textRef}
          onChange={(e) => setval(e.target.value)}
          id="outlined-basic"
          value={val}
          label="role"
          variant="outlined"
        />
        <div>
          <Button variant="contained" onClick={submitForm}>
            Add
          </Button>
        </div>
      </div>

      <List 
      reference={textRef} fetchflag={fetchflag} setFetchflag={setFetchflag}></List>
    </>
  );
}

export default Add;
