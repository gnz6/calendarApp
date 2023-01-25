import "./Login.css"
import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../calendar/hooks/useAuthStore";
import { useEffect } from "react";
import Swal from "sweetalert2"

const loginForm = {
  loginEmail: "",
  loginPassword: "",
}


const registerForm = {
  regiserName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: ""
}


export const Login = () => {

  const {startLogin, errorMessages, startRegister} = useAuthStore()
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginForm)
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerForm)

  const loginSubmit = (e)=>{
    e.preventDefault();
    startLogin({email: loginEmail, password: loginPassword})

  }

  const registerSubmit = (e) =>{
    e.preventDefault();
    if(registerPassword !== registerPassword2){
      Swal.fire("Password Registration Error", "Passwords doesnt mathc", "error" )
    }
    startRegister({name: registerName, email: registerEmail, password: registerPassword})
  }

  useEffect(()=>{
    if(errorMessages !== null) {
      Swal.fire("Authentication Error", errorMessages, "error")
    }
  },[errorMessages])

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                onChange={onLoginInputChange}

              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                onChange={onLoginInputChange}

              />
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                onChange={onRegisterInputChange}

              />
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}