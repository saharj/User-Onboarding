import React, { useState } from "react";
import { Container } from "reactstrap";
import axios from "axios";
import Form from "./Form";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const submitForm = ({ name, email, pass }) => {
    const data = { name, email, password: pass };
    axios
      .post("https://reqres.in/api/users", data)
      .then((res) => {
        console.log(res);
        setUsers([...users, res.data]);
      })
      .catch((err) => {
        debugger;
      });
  };

  return (
    <div className="App">
      <Form submitForm={submitForm} />
      <Container>
        {users.length > 0 &&
          users.map((user, i) => (
            <div className="card-body user" key={i}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
      </Container>
    </div>
  );
}

export default App;
