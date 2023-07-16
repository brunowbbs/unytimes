import "./styles.css";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="container_header">
      <h1>Unytimes</h1>

      <div className="container_info_header">
        <span>{username}</span>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}
