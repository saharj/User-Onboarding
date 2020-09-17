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
    name: "",
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

    if (target.name !== "terms") {
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

  return (
    <form onSubmit={handleSubmit} className="card form-horizontal">
      <div className="form-group mb-2 mr-sm-2 mb-sm-0">
        <label htmlFor="nameInput">
          Name
          <input
            className="form-control col-md-12"
            id="nameInput"
            type="string"
            name="name"
            value={formState.name}
            placeholder="Full name"
            onChange={onInputChange}
          />
        </label>
      </div>
      <div className="form-group mb-2 mr-sm-2 mb-sm-0">
        <label htmlFor="emailInput">
          Email
          <input
            className="form-control col-md-12"
            id="emailInput"
            type="email"
            name="email"
            value={formState.email}
            placeholder="Email"
            onChange={onInputChange}
          />
        </label>
      </div>
      <div className="form-group mb-2 mr-sm-2 mb-sm-0">
        <label htmlFor="passwordInput">
          Password
          <input
            className="form-control col-md-12"
            id="passwordInput"
            type="password"
            name="password"
            value={formState.password}
            placeholder="Password"
            onChange={onInputChange}
          />
        </label>
      </div>
      <div className="form-group mb-3 mt-3 mr-sm-2 mb-sm-0">
        <label htmlFor="termsInput">
          Do you agree to the terms and conditions?
          <input
            className="terms"
            id="termsInput"
            type="checkbox"
            name="terms"
            checked={checked}
            onChange={onInputChange}
          />
        </label>
      </div>
      <div className="row form-check mt-3">
        <button
          className={`btn ${
            activeBtn ? "btn-success active" : "disabled btn-secondary"
          }`}
        >
          Submit
        </button>
      </div>
      {errors && (
        <div className="mt-3">
          {errors.name.length > 0 ? (
            <p className="error text-danger">{errors.name}</p>
          ) : null}
          {errors.email.length > 0 ? (
            <p className="error text-danger">{errors.email}</p>
          ) : null}
          {errors.password.length > 0 ? (
            <p className="error text-danger">{errors.password}</p>
          ) : null}
        </div>
      )}
    </form>
  );
}

export default Form;
