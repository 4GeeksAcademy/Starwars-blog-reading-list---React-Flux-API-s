import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Carousell = ({ id, data, type }) => {
  const { actions, store } = useContext(Context)
  console.log(data);
  console.log(type);
  console.log(id);

  const handleAddToFavorites = (item) => {
    if (!isFavorite(item)) {
      actions.addToFavorites(item);
    }
  };

  const isFavorite = (item) => {
    return store.favorites.some(favorite => favorite.uid === item.uid);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
  };

  return (
    <div id={id} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {data.map((item, index) => (
          <div key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type === "planet" ? "planets" : "starships"}/${item.uid}.jpg`}
              className="d-block w-100"
              alt={item.name}
              onError={handleImageError} />
            <div className="carousel-caption d-md-block">
              <h1>{item.name}</h1>
              <div className="d-flex align-items-center justify-content-center">
                <span onClick={() => handleAddToFavorites(item)} >
                  <i className={`fa-star ${isFavorite(item) ? "fa-solid" : "fa-regular"} fs-1 text-warning p-2`} ></i>
                </span>
                <Link to={`/details/${type}/${item.uid}`} className="btn btn-outline-success fw-bold">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};