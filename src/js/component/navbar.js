import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Fav } from "../views/Fav";
import logo from "../../img/star-wars-logo.png";

export const Navbar = () => {
	const { store } = useContext(Context);

	return (
		<nav className="navbar navbar-dark bg-dark mb-3 p-3">
			<Link to="/">
				<img src={logo}
					alt="Star Wars Logo"
					className="navbar-brand mb-0 h1"
					style={{ height: '50px' }} />
			</Link>
			<div className="ml-auto">
				<Fav />
			</div>
		</nav>
	);
};
