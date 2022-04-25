import React, { useState } from "react";
import restaurants from "../sample-restaurants";
import PropTypes from "prop-types";


const Landing = (props) => {

	const [display, setDisplay] = useState(false);
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');

	const displayList = () => {
		setDisplay({ display: !display })
	}

	const getTitle = (restaurant) => {
		const { title, url } = restaurant;
		setDisplay(false);
		setTitle(title);
		setUrl(url);
	}

	const goToRestaurant = () => {
		props.history.push(`/restaurant/${url}`);
	}

	return (
		<div className="restaurant_select">
			<div
				className="restaurant_select_top"
				onClick={displayList}
			>
				<div className="restaurant_select_top-header font-effect-shadow-multiple">
					{title || "Выбери ресторан"}
				</div>
				<div className="arrow_picker">
					<div className="arrow_picker-up"></div>
					<div className="arrow_picker-down"></div>
				</div>
			</div>

			{display && <div className="restaurant_select_bottom">
				<ul>
					{
						restaurants.map(restaurant => {
							return <li onClick={() => getTitle(restaurant)} key={restaurant.id}>{restaurant.title}</li>
						})
					}
				</ul>
			</div>}

			{title && !display && <button onClick={goToRestaurant}>Перейти в ресторан</button>}
		</div>
	)
}

Landing.propTypes = {
	history: PropTypes.object
}

export default Landing;


// class Landing extends React.Component {

// 	static propTypes = {
// 		history: PropTypes.object
// 	}

// 	state = {
// 		display: false,
// 		title: '',
// 		url: ''
// 	}

// 	displayList = () => {
// 		const { display } = this.state;
// 		this.setState({ display: !display })
// 	}

// 	getTitle = (restaurant) => {
// 		const { title, url } = restaurant;
// 		this.setState({
// 			title,
// 			url,
// 			display: false
// 		})
// 	}

// 	goToRestaurant = () => {
// 		const { url } = this.state;
// 		this.props.history.push(`/restaurant/${url}`)
// 	}

// 	render() {

// 		return (
// 			<div className="restaurant_select">
// 				<div
// 					className="restaurant_select_top"
// 					onClick={this.displayList}
// 				>
// 					<div className="restaurant_select_top-header font-effect-outline">
// 						{this.state.title || "Выбери ресторан"}
// 					</div>
// 					<div className="arrow_picker">
// 						<div className="arrow_picker-up"></div>
// 						<div className="arrow_picker-down"></div>
// 					</div>
// 				</div>

// 				{this.state.display && <div className="restaurant_select_bottom">
// 					<ul>
// 						{
// 							restaurants.map(restaurant => {
// 								return <li onClick={() => this.getTitle(restaurant)} key={restaurant.id}>{restaurant.title}</li>
// 							})
// 						}
// 					</ul>
// 				</div>}

// 				{this.state.title && !this.state.display && <button onClick={this.goToRestaurant}>Перейти в ресторан</button>}
// 			</div>
// 		);
// 	}
// }

// export default Landing;