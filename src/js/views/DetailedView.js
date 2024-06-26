import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const DetailedView = () => {
	const { store, actions } = useContext(Context);
	const { uid, type } = useParams();
	console.log(type);

	// Encuentra el elemento en las listas de personajes, planetas o naves espaciales
	const [item, setItem] = useState({})
	// const item = store.peopleWithDetails.find(item => item.uid === uid) ||
	// 	store.planetWithDetails.find(item => item.uid === uid) ||
	// 	store.starshipsWithDetails.find(item => item.uid === uid);

	// if (!item) {
	// 	return <div>Loading...</div>
	// }
	console.log(item);

	const handleImageError = (e) => {
		e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
	};

	const handleAddToFavorites = (item, itemType) => {
		if (!isFavorite(item, itemType)) {
			actions.addToFavorites({ ...item, type: itemType });
		}
	};

	const isFavorite = (item) => {
		return store.favorites.some(favorite => favorite.uid === item.uid);
	};

	// Renderizado condicional para los diferentes tipos de elementos
	const renderDetails = () => {
		switch (type) {
			case 'people':
				return (
					<>
						<li className="list-group-item"><strong>Birth Year:</strong> {item.birthYear || 'N/A'}</li>
						<li className="list-group-item"><strong>Gender:</strong> {item.gender || 'N/A'}</li>
						<li className="list-group-item"><strong>Height:</strong> {item.height || 'N/A'}</li>
						<li className="list-group-item"><strong>Skin Color:</strong> {item.skinColor || 'N/A'}</li>
						<li className="list-group-item"><strong>Eye Color:</strong> {item.eyeColor || 'N/A'}</li>
					</>
				);
			case 'planet':
				return (
					<>
						<li className="list-group-item"><strong>Diameter:</strong> {item.diameter || 'N/A'}</li>
						<li className="list-group-item"><strong>Gravity:</strong> {item.gravity || 'N/A'}</li>
						<li className="list-group-item"><strong>Population:</strong> {item.population || 'N/A'}</li>
						<li className="list-group-item"><strong>Climate:</strong> {item.climate || 'N/A'}</li>
						<li className="list-group-item"><strong>Terrain:</strong> {item.terrain || 'N/A'}</li>
					</>
				);
			case 'starship':
				return (
					<>
						<li className="list-group-item"><strong>Model:</strong> {item.model || 'N/A'}</li>
						<li className="list-group-item"><strong>Starship Class:</strong> {item.starship_class || 'N/A'}</li>
						<li className="list-group-item"><strong>Crew:</strong> {item.crew || 'N/A'}</li>
						<li className="list-group-item"><strong>Passengers:</strong> {item.passengers || 'N/A'}</li>
						<li className="list-group-item"><strong>Hyperdrive Rating:</strong> {item.hyperdrive_rating || 'N/A'}</li>
					</>
				);
			default:
				return null;

		}
	};
	useEffect(() => {
		if (uid && type) {
			if (type == "people" && store.peopleWithDetails.length > 0) {
				const currentDetail = store.peopleWithDetails.find(element => element.result.uid === uid)?.result.properties
				setItem(currentDetail)
			}
		}
	}, [uid, store.peopleWithDetails])

	useEffect(() => {
		console.log(uid, type);
		if (uid && type) {
			console.log(store.planetWithDetails);
			if (type == "planet" && store.planetWithDetails.length > 0) {
				const currentDetail = store.planetWithDetails.find(element => element.result.uid == uid)?.result.properties
				console.log(currentDetail);
				console.log(store.planetWithDetails);
				setItem(currentDetail)
			}
		}
	}, [uid, store.planetWithDetails])

	useEffect(() => {
		if (uid && type) {
			if (type == "starship" && store.starshipsWithDetails.length > 0) {
				const currentDetail = store.starshipsWithDetails.find(element => element.result.uid === uid)?.result.properties
				setItem(currentDetail)
			}
		}
	}, [uid, store.startshipsWithDetails])



	return (
		<div className="card col-11" data-bs-theme="dark">
			<img src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type === "planet" ? "planets" : "starships"}/${uid}.jpg`}
				className="card-img-top"
				alt={item?.name}
				onError={handleImageError} />
			<div className="card-body">
				<div className="d-flex align-content-center">
					<h1 className="card-title">{item?.name}</h1>
					<span onClick={() => handleAddToFavorites(item, type)} >
						<i className={`fa-star ${isFavorite(item, type) ? "fa-solid" : "fa-regular"} fs-1 text-warning p-2`} ></i>
					</span>
				</div>
				<p className="card-text">{item?.description || 'No description available.'}</p>
			</div>
			<ul className="list-group list-group-flush">
				{renderDetails()}
			</ul>
			<div className="card-body">
				<Link to="/" className="btn btn-success">Back Home</Link>
			</div>
		</div>
	);
};
