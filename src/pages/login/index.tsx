import { useState } from "react";
import "./styles.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

interface ResponseData {
  email: string;
  name: string;
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setUsername, setUserEmail, setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function logar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post<ResponseData>("/auth", {
        email: email,
        password: password,
      });

      setUsername(response.data.name);
      setUserEmail(response.data.email);
      setToken(response.data.token);

      navigate("/times");
      // console.log(response);
    } catch (error) {
      alert("Erro ao fazer login, tente novamnte");
    }
  }

  return (
    <div className="container_login">
      {/* <h1>Hello World - Login</h1> */}
      <form className="form_login" onSubmit={logar}>
        <input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
