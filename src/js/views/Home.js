import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Carousell } from "../component/Carousell.js";

export const Home = () => {
	const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getPeople()
		actions.getPlanets()
		actions.getStarships()
	}, [])
	// console.log(store.peopleList);
	// console.log(store.peopleWithDetails);
	console.log(store.planetList);
	// console.log(store.starshipsList);
	console.log(store.starshipList);

	const carouselsData = [
		{ id: "characterCarousel", data: store.peopleList, type: "people" },
		{ id: "planetCarousel", data: store.planetList, type: "planet" },
		{ id: "starshipCarousel", data: store.starshipList, type: "starship" }
	];

	return (
		<div>
			{carouselsData.map((carouselsData, index) => (
				<Carousell
					key={index}
					id={carouselsData.id}
					data={carouselsData.data}
					type={carouselsData.type}
				/>
			))}
		</div>
	);
};
