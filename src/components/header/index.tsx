import "./styles.css";

import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { username, email } = useAuth();

  return (
    <div className="container_header">
      <h1>Unytimes</h1>

      <div className="container_info_header">
        <span>{username}</span>
        <button>Sair</button>
      </div>
    </div>
  );
}
