import React, { useState, useEffect } from "react";
import * as yup from "yup";
import formSchema from "./validate.js";

function Form(props) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeBtn) {
      props.submitForm(formState);
      setFormState({ name: "", email: "", password: "" });
      setChecked(false);
    }
  };

  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  const onInputChange = (e) => {
    const target = e.target;

    validate(target.name, target.value);

    if (target.name != "terms") {
      setFormState({ ...formState, [target.name]: target.value });
    } else {
      setChecked(!checked);
    }
  };

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setActiveBtn(valid);
    });
  }, [formState]);

  useEffect(() => {
    props.renderErrors(errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nameInput">
        Name
        <input
          id="nameInput"
          type="string"
          name="name"
          value={formState.name}
          placeholder="Full name"
          onChange={onInputChange}
        />
      </label>
      <label htmlFor="emailInput">
        Email
        <input
          id="emailInput"
          type="email"
          name="email"
          value={formState.email}
          placeholder="Email"
          onChange={onInputChange}
        />
      </label>
      <label htmlFor="passwordInput">
        Password
        <input
          id="passwordInput"
          type="password"
          name="password"
          value={formState.password}
          placeholder="Password"
          onChange={onInputChange}
        />
      </label>
      <label htmlFor="termsInput">
        Do you agree to the terms and conditions?
        <input
          id="termsInput"
          type="checkbox"
          name="terms"
          checked={checked}
          onChange={onInputChange}
        />
      </label>
      <button
        className={`btn-primary btn ${activeBtn ? "active" : "disabled"}`}
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
