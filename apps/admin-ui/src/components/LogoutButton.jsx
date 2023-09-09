import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const onLogoutClicked = () => {
    localStorage.setItem("jwt", null);
    navigate("/login");
  };

  return <Button onClick={onLogoutClicked}>Logout</Button>;
};

export default LogoutButton;
