import { Link } from "react-router-dom";

function ItemCard({ item, onDelete }) {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>

      <div className="buttons">
        <Link to={`/details/${item.id}`}>
          <button className="view">View Details</button>
        </Link>

        <button
          className="delete"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
