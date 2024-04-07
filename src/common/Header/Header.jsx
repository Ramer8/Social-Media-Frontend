import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CustomLink } from "../CustomLink/CustomLink"
import "./Header.css"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { logout, userData } from "../../app/slices/userSlice"

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const rdxUser = useSelector(userData)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(rdxUser, " passport credentials")
  }, [rdxUser])

  return (
    <>
      <div className="headerDesign">
        <CustomLink title="Home" destination="/" />

        {rdxUser?.credentials.token ? (
          <div className="menu">
            <CustomLink
              title={"Profile"}
              destination="/profile"
              className={`${
                location.pathname === "/profile" ? "menuHighlighted" : "menu"
              }`}
            />
            <div onClick={() => dispatch(logout({ credentials: "" }))}>
              <CustomLink
                title={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                }
                destination="/"
              />
            </div>
          </div>
        ) : (
          <div className="menu">
            <CustomLink
              title={"Login"}
              destination="/login"
              className={`${
                location.pathname === "/login" ? "menuHighlighted" : "menu"
              }`}
            />
            <CustomLink
              title="Register"
              destination="/register"
              className={`${
                location.pathname === "/register" ? "menuHighlighted" : "menu"
              }`}
            />
          </div>
        )}
      </div>
      <Outlet />
    </>
  )
}
