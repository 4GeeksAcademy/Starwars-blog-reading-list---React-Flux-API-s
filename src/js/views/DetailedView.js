import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const DetailedView = () => {
	const { store, actions } = useContext(Context);
	const { uid, type } = useParams();
	const navigate = useNavigate();
	const [item, setItem] = useState({})


	const getCurrentDetails = (type) => {
		const typeMap = {
			people: store.peopleWithDetails,
			planet: store.planetWithDetails,
			starship: store.starshipsWithDetails
		};

		const detailsList = typeMap[type];
		return detailsList ? detailsList.find(element => element.result.uid === uid) : null;
	};

	useEffect(() => {
		if (uid && store.peopleWithDetails.length > 0 && store.planetWithDetails.length > 0 && store.starshipsWithDetails) {
			const currentDetail = getCurrentDetails(type)
			console.log(currentDetail);
			setItem(currentDetail ? currentDetail.result : {});
		}
	}, [uid, type, store.peopleWithDetails, store.planetWithDetails, store.starshipsWithDetails]);



	const navigateTo = (direction) => {
		const typeMap = {
			people: store.peopleWithDetails,
			planet: store.planetWithDetails,
			starship: store.starshipsWithDetails
		};

		const currentDetailsList = typeMap[type] || [];
		const currentIndex = currentDetailsList.findIndex(element => element.result.uid === uid);
		const newIndex = (currentIndex + direction + currentDetailsList.length) % currentDetailsList.length;
		const newUid = currentDetailsList[newIndex].result.uid;
		navigate(`/details/${type}/${newUid}`);
	};


	console.log(item);
	const handleImageError = (e) => {
		e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
	};

	const handleAddToFavorites = (item) => {
		if (!isFavorite(item)) {
			actions.addToFavorites({ ...item, name: item.properties?.name, type });
		}
	};

	const isFavorite = (item) => {
		return store.favorites.some(favorite => favorite.uid === item.uid && favorite.type === type);
	};

	// Renderizado condicional para los diferentes tipos de elementos
	const renderDetails = () => {
		const properties = item.properties || {};
		switch (type) {
			case 'people':
				return (
					<>
						<li className="list-group-item"><strong>Birth Year: </strong>
							{properties.birth_year || 'N/A'}</li>
						<li className="list-group-item"><strong>Gender: </strong>
							{properties.gender || 'N/A'}</li>
						<li className="list-group-item"><strong>Height: </strong>
							{properties.height || 'N/A'}</li>
						<li className="list-group-item"><strong>Skin Color: </strong>
							{properties.skin_color || 'N/A'}</li>
						<li className="list-group-item"><strong>Eye Color: </strong>
							{properties.eye_color || 'N/A'}</li>
					</>
				);
			case 'planet':
				return (
					<>
						<li className="list-group-item"><strong>Diameter: </strong>
							{properties.diameter || 'N/A'}</li>
						<li className="list-group-item"><strong>Gravity: </strong>
							{properties.gravity || 'N/A'}</li>
						<li className="list-group-item"><strong>Population: </strong>
							{properties.population || 'N/A'}</li>
						<li className="list-group-item"><strong>Climate: </strong>
							{properties.climate || 'N/A'}</li>
						<li className="list-group-item"><strong>Terrain: </strong>
							{properties.terrain || 'N/A'}</li>
					</>
				);
			case 'starship':
				return (
					<>
						<li className="list-group-item"><strong>Model: </strong>
							{properties.model || 'N/A'}
						</li>
						<li className="list-group-item"><strong>Starship Class: </strong>
							{properties.starship_class || 'N/A'}
						</li>
						<li className="list-group-item"><strong>Crew: </strong>
							{properties.crew || 'N/A'}
						</li>
						<li className="list-group-item"><strong>Passengers: </strong>
							{properties.passengers || 'N/A'}
						</li>
						<li className="list-group-item"><strong>Hyperdrive Rating: </strong>
							{properties.hyperdrive_rating || 'N/A'}
						</li>
					</>
				);
			default:
				return null;

		}
	};


	return (
		<div className="card col-11 mx-auto" data-bs-theme="dark">
			<img src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type === "planet" ? "planets" : "starships"}/${uid}.jpg`}
				className="card-img-top"
				alt={item.properties?.name}
				onError={handleImageError}
			/>
			<div className="card-body">
				<div className="d-flex align-content-center">
					<h1 className="card-title">{item.properties?.name}</h1>
					<span onClick={() => handleAddToFavorites(item)}>
						<i className={`fa-star 
						${isFavorite(item) ? "fa-solid" : "fa-regular"} 
						fs-1 text-warning p-2`}
						></i>
					</span>
				</div>
				<p className="card-text">
					{item.description || 'No description available.'}
				</p>
			</div>
			<ul className="list-group list-group-flush">
				{renderDetails()}
			</ul>
			<div className="card-body">
				<Link to="/" className="btn btn-success">Back Home</Link>
			</div>
			<div className="card-body d-flex justify-content-between">
				<button
					className="btn btn-outline-secondary col-5"
					onClick={() => navigateTo(-1)}
				>Previous</button>
				<button
					className="btn btn-outline-secondary col-5"
					onClick={() => navigateTo(1)}
				>Next</button>
			</div>

		</div>
	);
};

//COMMENTS

// const getCurrentDetails = (type) => {
// 	if (type == "people") {
// 		return store.peopleWithDetails.find(element => element.result.uid === uid)
// 	} else if (type == "planet") {
// 		return store.planetWithDetails.find(element => element.result.uid === uid)
// 	} else if (type == "starship") {
// 		return store.starshipsWithDetails.find(element => element.result.uid === uid)
// 	}

// };

// const getCurrentDetailsList = (store, type) => {
// 	return {
// 		'people': store.peopleWithDetails,
// 		'planet': store.planetWithDetails,
// 		'starship': store.starshipsWithDetails
// 	}[type] || [];
// };

// useEffect(() => {
// 	const currentDetailsList = getCurrentDetailsList(store, type);
// 	if (uid && currentDetailsList.length > 0) {
// 		const currentDetail = currentDetailsList.find(element => element.result.uid === uid);
// 		console.log(currentDetail);
// 		setItem(currentDetail ? currentDetail.result : {});
// 	}
// }, [uid, type, store]);

// const navigateTo = (direction) => {
// 	let currentDetailsList = [];
// 	if (type == "people") {
// 		currentDetailsList = store.peopleWithDetails
// 	} else if (type == "planet") {
// 		currentDetailsList = store.planetWithDetails
// 	} else if (type == "starship") {
// 		currentDetailsList = store.starshipsWithDetails
// 	}
// 	const currentIndex = currentDetailsList.findIndex(element => element.result.uid === uid);
// 	const newIndex = (currentIndex + direction + currentDetailsList.length) % currentDetailsList.length;
// 	const newUid = currentDetailsList[newIndex].result.uid;
// 	navigate(`/details/${type}/${newUid}`);
// };


// const navigateTo = (direction) => {
// 	const currentDetailsList = getCurrentDetailsList(store, type);
// 	const currentIndex = currentDetailsList.findIndex(element => element.result.uid === uid);
// 	const newIndex = (currentIndex + direction + currentDetailsList.length) % currentDetailsList.length;
// 	const newUid = currentDetailsList[newIndex].result.uid;
// 	navigate(`/details/${type}/${newUid}`);
// };