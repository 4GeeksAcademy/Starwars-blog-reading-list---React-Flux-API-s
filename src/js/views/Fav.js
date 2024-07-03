import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Fav = () => {
	const { store, actions } = useContext(Context);

	const handleRemoveFavorite = (item) => {
		actions.removeFavorite(item);
	};

	return (
		<div className="dropdown">
			<button className="btn btn-outline-warning dropdown-toggle"
				type="button"
				id="favoritesDropdown"
				data-bs-toggle="dropdown"
				aria-expanded="false">
				Favorites
			</button>
			<ul className="dropdown-menu" aria-labelledby="favoritesDropdown">
				{store.favorites.length > 0 ? (
					store.favorites.map((favorite, index) => (
						<li className="d-flex align-content-between" key={index}>
							<Link className="dropdown-item" to={`/detail/${favorite.type}/${favorite.uid}`}>
								{favorite.name}
							</Link>
							<span
								onClick={() => handleRemoveFavorite(favorite)}
								className="text-danger ms-2"
							>
								<i className="fas fa-trash-alt"></i>
							</span>
						</li>
					))
				) : (
					<li className="dropdown-item">No favorites added</li>
				)}
			</ul>
		</div>
	);
};
