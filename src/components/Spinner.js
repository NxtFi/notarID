import React from "react";

import "../assets/css/components/spinner.css"
const Spinner = () => {
	return (
		<div className="sk-chase">
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
			<div className="sk-chase-dot"></div>
		</div>
	);
};
const SpinnerDocHash = () => {
	return (
		<div className="spinner-dochash">
			<div className="bounce1"></div>
			<div className="bounce2"></div>
			<div className="bounce3"></div>
		</div>
	);
};

export { Spinner, SpinnerDocHash };
