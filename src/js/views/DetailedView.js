import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const DetailedView = () => {
	const { store, actions } = useContext(Context);
	const { uid, type } = useParams();
	console.log(type);

	// Encuentra el elemento en las listas de personajes, planetas o naves espaciales
	const [item, setItem] = useState({})
	// // Below for 
	// const types = ["people", "planet", "starship"];
	useEffect(() => {
		const currentDetailsList = {
			'people': store.peopleWithDetails,
			'planet': store.planetWithDetails,
			'starship': store.starshipsWithDetails
		}[type];

		if (uid && currentDetailsList.length > 0) {
			const currentDetail = currentDetailsList.find(element => element.result.uid === uid);
			setItem(currentDetail ? currentDetail.result : {});
		}
	}, [uid, type, store]);


	console.log(item.id);
	// const handleImageError = (e) => {
	// 	e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
	// };

	// const handleAddToFavorites = (item, itemType) => {
	// 	if (!isFavorite(item, itemType)) {
	// 		actions.addToFavorites({ ...item, type: itemType });
	// 	}
	// };

	// const isFavorite = (item) => {
	// 	return store.favorites.some(
	// 		favorite => favorite.uid === item.uid && favorite.type === currentType);
	// };

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
	console.log(item?.result?.model);

	// const handleNext = () => {
	// 	const currentIndex = types.indexOf(currentType);
	// 	const newIndex = (currentIndex + 1) % types.length;
	// 	setCurrentType(types[newIndex]);
	// };

	// const handlePrev = () => {
	// 	const currentIndex = types.indexOf(currentType);
	// 	const newIndex = (currentIndex - 1 + types.length) % type.length;
	// 	setCurrentType(types[newIndex]);
	// };


	// useEffect(() => {
	// 	if (uid && type) {
	// 		if (type == "people" && store.peopleWithDetails.length > 0) {
	// 			const currentDetail = store.peopleWithDetails.find(element => element.result.uid === uid)?.result
	// 			setItem(currentDetail)
	// 		}
	// 	}
	// }, [uid, store.peopleWithDetails])

	// useEffect(() => {
	// 	console.log(uid, type);
	// 	if (uid && type) {
	// 		console.log(store.planetWithDetails);
	// 		if (type == "planet" && store.planetWithDetails.length > 0) {
	// 			const currentDetail = store.planetWithDetails.find(element => element.result.uid == uid)?.result
	// 			console.log(currentDetail);
	// 			console.log(store.planetWithDetails);
	// 			setItem(currentDetail)
	// 		}
	// 	}
	// }, [uid, store.planetWithDetails])

	// useEffect(() => {
	// 	if (uid && type) {
	// 		if (type == "starship" && store.starshipsWithDetails.length > 0) {
	// 			const currentDetail = store.starshipsWithDetails.find(element => element.result.uid === uid)?.result
	// 			setItem(currentDetail)
	// 		}
	// 	}
	// }, [uid, store.startshipsWithDetails])



	return (
		<div className="card col-11" data-bs-theme="dark">
			<img src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type === "planet" ? "planets" : "starships"}/${uid}.jpg`}
				className="card-img-top"
				alt={item.properties?.name}
			//onError={handleImageError} 
			/>
			<div className="card-body">
				<div className="d-flex align-content-center">
					<h1 className="card-title">{item.properties?.name}</h1>
					<span
					//onClick={() => handleAddToFavorites(item, type)} 
					>
						<i
						//className={`fa-star ${isFavorite(item, type) ? "fa-solid" : "fa-regular"} fs-1 text-warning p-2`} 
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
				//onClick={() => navigate(`/details/${direction.previous}`)}
				>Previous</button>
				<button
					className="btn btn-outline-secondary col-5"
				//onClick={handleNext}
				>Next</button>
			</div>

		</div>
	);
};
//Fix next buttons at DetailedView

//donde esta el undefined mon 1 jul

//AL cargal una vista detallada pierde los datos de detailLists
//Subir description un nivel 
//centrar detailed 

//detailed view de back up +s
//el nuevo se conecta c