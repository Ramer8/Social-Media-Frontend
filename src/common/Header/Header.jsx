import { CustomLink } from "../CustomLink/CustomLink";
import "./Header.css";
export const Header = () => {

  //aqui realmente leería de redux
  const token = false;

  return (
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
  );
};
