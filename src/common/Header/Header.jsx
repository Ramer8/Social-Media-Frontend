import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CustomLink } from "../CustomLink/CustomLink"
import "./Header.css"
export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  let decoded = JSON.parse(localStorage.getItem("decoded"))

  const logOut = () => {
    localStorage.removeItem("decoded")
    decoded = ""
    navigate("/login")
  }
  const token = false

  return (
    <>
      <div className="headerDesign">
        <CustomLink title="Home" destination="/" />
        {token ? (
          <div className="menu">
            <CustomLink title="name" destination="/profile" />
            <CustomLink title="Log-out" destination="/" />
          </div>
        ) : (
          <div className="menu">
            <CustomLink title="Login" destination="/login" />
            <CustomLink title="Register" destination="/register" />
          </div>
        )}
      </div>
      <Outlet />
    </>
  )
}
