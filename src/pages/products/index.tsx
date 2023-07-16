import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface Data {
  available: boolean;
  categoryId: string;
  description: string;
  name: string;
  price: number;
  urlImage: string;
  _id: string;
}

export default function Products() {
  const { id } = useParams();
  const { token } = useAuth();

  const [products, setProducts] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProducts() {
    try {
      const response = await api.get<Data[]>(`/products/${id}`, {
        headers: { Authorization: token },
      });
      setProducts(response.data);
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
      <h1>Produtos do time</h1>

      {isLoading && <h3>Carregando...</h3>}

      {products.length < 1 && !isLoading && <h1>Nenhum produto encontrado</h1>}

      {products.map((product) => (
        <Link to={`/details/${product._id}`} key={product._id}>
          <div style={{ width: 200 }}>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <img src={product.urlImage} width={100} />
          </div>
        </Link>
      ))}
    </div>
  );
}
