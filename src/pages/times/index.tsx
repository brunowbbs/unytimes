import { useEffect, useState } from "react";
import Header from "../../components/header";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

interface Data {
  image: string;
  name: string;
  _id: string;
}

export default function Times() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [times, setTimes] = useState<Data[]>([]);

  async function getTimes() {
    try {
      const response = await api.get<Data[]>("/teams", {
        headers: {
          Authorization: token,
        },
      });
      setTimes(response.data);
    } catch (error) {
      if (token) {
        alert("Houve um erro ao buscar os times");
      }
    }
  }

  useEffect(() => {
    getTimes();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header />
      <h1>Hello World - Times</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {times.map((time) => (
          <Link to={`/products/${time._id}`}>
            <div style={{ width: 200 }} key={time._id}>
              <p>{time.name}</p>
              <img width={100} src={time.image} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
