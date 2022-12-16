import { Button } from "@mui/material";
import "./list.css";
import { useEffect, useState } from "react";

function List(props) {
  const [list, setdata] = useState([]);
  const [indexval, setIndex] = useState(0);
  const [flag, setFlag] = useState(false);

  const { reference, fetchflag, setFetchflag } = props;
  const IDval = JSON.parse(localStorage.getItem("id"));

  async function deletes(index) {
    const requesthandler = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    await fetch("/notes/" + index, requesthandler)
      .then((res) => res.json())
      .catch((error) => error);
    setFetchflag(!fetchflag);
    reference.current.value = " ";
  }

  function edit(item, index) {
    reference.current.value = item;
    reference.current.focus();
    setFlag(true);
    setIndex(index);
  }

  async function Change() {
    if (reference.current.value === "") {
      alert("try again");
    } else {
      const itemvalue = reference.current.value;
      const requesthandler = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: itemvalue }),
      };

      await fetch("/notes/" + indexval, requesthandler).then((res) =>
        res.json()
      );
      setFetchflag(!fetchflag);
      setFlag(false);
      reference.current.value = " ";
    }
  }

  const fetchfunction = async () => {
    await fetch("notes/" + IDval)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((item) => setdata(item));
  };

  useEffect(() => {
    fetchfunction();
  }, [fetchflag]);

  return (
    <>
      <div className="btn-container">
        {flag && (
          <Button onClick={Change} variant="contained">
            Update
          </Button>
        )}
      </div>
      <div className="main-container">
        <div className="cover">
          TODO
          {list.map((item, index) => (
            <div className="holder">
              {index + 1}.{item.name}
              <div class="btncover">
                {!flag && (
                  <Button
                    onClick={() => deletes(item.id)}
                    variant="contained"
                    color="error"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div class="btncover">
                <Button
                  onClick={() => edit(item.name, item.id)}
                  variant="contained"
                  color="info"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default List;
