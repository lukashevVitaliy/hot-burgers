import React from "react";
import PropTypes from "prop-types";

import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
import sampleBurgers from '../sample-burgers';
import Burger from './Burger';
import base from '../base';
import SignIn from "./Auth/SignIn";
import firebase from "firebase/app";

class App extends React.Component {

	static propTypes = {
		match: PropTypes.object
	}

	state = {
		burgers: {},
		order: {}
	}

	componentDidMount() {
		const { params } = this.props.match;

		const localStorageRef = localStorage.getItem(params.restaurantId);

		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}

		this.ref = base.syncState(`${params.restaurantId}/burgers`, {
			context: this,
			state: 'burgers'
		})
	}

	componentDidUpdate() {
		const { params } = this.props.match;
		localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref)
	}

	addBurger = (burger) => {
		//1. копия объекта стейт
		const burgers = { ...this.state.burgers };
		//2. добавить новый бургер в переменную
		burgers[`burger #${Date.now()}`] = burger;
		//3. записать новый объект бургерс в стейт
		this.setState({ burgers });
	}

	updateBurger = (key, updatedBurger) => {
		// 1. копия объекта стейт
		const burgers = { ...this.state.burgers };
		// 2. обновляем нужный бургер
		burgers[key] = updatedBurger;
		//3. записать новый объект бургерс в стейт
		this.setState({ burgers });
	}

	deleteBurger = (key) => {
		// 1. копия объекта стейт
		const burgers = { ...this.state.burgers };
		// 2. Удаляем бургер
		burgers[key] = null;
		//3. записать новый объект бургерс в стейт
		this.setState({ burgers });
	}

	loadSampleBurgers = () => {
		this.setState({ burgers: sampleBurgers })
	}

	addToOrder = (key) => {
		// 1. копия объекта стейт
		const order = { ...this.state.order };
		// 2. добавить ключ к заказу со значением 1, либо обновить тек. значение
		order[key] = order[key] + 1 || 1;
		// 3. записать новый объект order в стейт
		this.setState({ order });
	}

	deleteFromOrder = (key) => {
		// 1. копия объекта стейт
		const order = { ...this.state.order };
		// 2. Удаляем бургер
		delete order[key];
		// 3. записать новый объект order в стейт
		this.setState({ order });
	}

	// logout
	handleLogout = async () => {
		await firebase.auth().signOut();
		window.location.reload();
	}


	render() {
		return (
			<SignIn>
				<div className="burger-paradise">
					<div className="menu">
						<Header title="Very Hot Burger" />
						<ul className="burgers">
							{Object.keys(this.state.burgers).map(key => {
								return (
									<Burger
										key={key}
										index={key}
										details={this.state.burgers[key]}
										addToOrder={this.addToOrder}
									/>
								)
							})}
						</ul>
					</div>
					<Order
						burgers={this.state.burgers}
						order={this.state.order}
						deleteFromOrder={this.deleteFromOrder}
					/>
					<MenuAdmin
						addBurger={this.addBurger}
						loadSampleBurgers={this.loadSampleBurgers}
						burgers={this.state.burgers}
						updateBurger={this.updateBurger}
						deleteBurger={this.deleteBurger}
						handleLogout={this.handleLogout}
					/>
				</div>
			</SignIn>
		)
	}
}

export default App;