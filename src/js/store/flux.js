const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			peopleList: [],
			peopleWithDetails: [],
			planetList: [],
			planetWithDetails: [],
			starshipList: [],
			starshipsWithDetails: [],
			favorites: []
		},
		actions: {

			getPeople: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/people");
					let data = await response.json();
					let peopleList = data.results;
					console.log(peopleList);
					let peopleWithDetails = [];

					for (let people of peopleList) {
						let result = await fetch(`${people.url}`);
						let data = await result.json();
						peopleWithDetails.push(data);
					}

					let store = getStore();
					setStore({ ...store, peopleWithDetails, peopleList });
					console.log("Got people successfully", peopleWithDetails);

				} catch (error) {
					console.error("Error while getting peoples", error);
				}
			},


			getPlanets: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/planets");
					let data = await response.json();
					let planetList = data.results;
					console.log(planetList);
					let planetWithDetails = [];

					for (let planet of planetList) {
						let result = await fetch(`${planet.url}`);
						let data = await result.json();
						planetWithDetails.push(data);
					}

					let store = getStore();
					setStore({ ...store, planetWithDetails, planetList });
					console.log("Got planets successfully");
				} catch (error) {
					console.error("Error while getting planets", error);
				}
			},

			getStarships: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/starships");
					let data = await response.json();
					let starshipList = data.results;
					let starshipsWithDetails = [];

					for (let starship of starshipList) {
						let result = await fetch(`${starship.url}`);
						let data = await result.json();
						starshipsWithDetails.push(data);
					}
					let store = getStore();
					setStore({ ...store, starshipsWithDetails, starshipList });
					console.log("Got starships successfully");
				} catch (error) {
					console.error("Error while getting starships", error);
				}
			},

			addToFavorites: (item) => {
				const store = getStore();
				const newFavorites = [...store.favorites, item];
				setStore({ ...store, favorites: newFavorites });
			},

			removeFavorite: (item) => {
				const store = getStore();
				const newFavorites = store.favorites.filter(favorite => favorite.uid !== item.uid);
				setStore({ ...store, favorites: newFavorites });
			}

		}
	};
};

export default getState;
