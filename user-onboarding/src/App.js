import React, { useState } from "react";
import axios from "axios";
import Form from "./Form";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(null);

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

  const renderErrors = (error) => {
    setErrors(error);
  };

  return (
    <div className="App">
      <Form submitForm={submitForm} renderErrors={renderErrors} />
      {errors && (
        <div>
          <p>Errors</p>
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
          {errors.email.length > 0 ? (
            <p className="error">{errors.email}</p>
          ) : null}
          {errors.password.length > 0 ? (
            <p className="error">{errors.password}</p>
          ) : null}
        </div>
      )}
      <div>
        {users.length > 0 &&
          users.map((user, i) => (
            <div key={i}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
