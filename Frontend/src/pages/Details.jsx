import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await API.get(`/api/items/${id}`);
    setItem(res.data);

    };

    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="details">
      <h2>Item Details 📋</h2>

      <p><strong>ID:</strong> {item.id}</p>
      <p><strong>Name:</strong> {item.name}</p>
      <p><strong>Price:</strong> ₹{item.price}</p>
      <p><strong>Created:</strong> {item.created_at}</p>

      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default Details;
