import LoginForm from "./LoginForm"
import "./login.scss"

const Login = () => {
  return (
    <div className="login">
      <div className="left">
        <img src="http://t0.gstatic.com/images?q=tbn:ANd9GcTvZUsvw0q9lcOUjEEFXhvpPX2_5FPo23HTB5fIBhPrA1WdDR2y&s" alt="" className="image" />
      </div>
      <div className="right">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login