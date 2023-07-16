import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Header from "../../components/header";

interface Data {
  name: string;
  urlImage: string;
  _id: string;
}

export default function DetailsProduct() {
  const { id } = useParams();
  const { token } = useAuth();

  const [product, setProduct] = useState<Data>({} as Data);
  const [, setIsLoading] = useState(true);

  async function getProducts() {
    try {
      const response = await api.get<Data>(`/product/${id}`, {
        headers: { Authorization: token },
      });
      setProduct(response.data);
      // setProduct(response.data);
    } catch (error) {
      if (token) {
        alert("houve um erro ao buscar os produtos");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <h3>{product.name}</h3>
      <img src={product.urlImage} />
    </div>
  );
}
