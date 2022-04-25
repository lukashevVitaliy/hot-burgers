import React from "react";
import PropTypes from "prop-types";


class EditBurgerForm extends React.Component {

	static propTypes = {
		index: PropTypes.string,
		burger: PropTypes.shape({
			name: PropTypes.string,
			price: PropTypes.number,
			status: PropTypes.string,
			desc: PropTypes.string,
			image: PropTypes.string
		}),
		updateBurger: PropTypes.func,
		deleteBurger: PropTypes.func
	}

	handleChange = (e) => {
		console.log(e.currentTarget.value);

		const updatedBurger = {
			...this.props.burger,
			[e.currentTarget.name]: e.currentTarget.name === 'price'
				? parseFloat(e.currentTarget.value) || 0
				: e.currentTarget.value
		}
		this.props.updateBurger(this.props.index, updatedBurger);
	}

	render() {
		return (
			<div className="burger-edit">
				<input
					name="name"
					type="text"
					placeholder="Name"
					autoComplete="off"
					value={this.props.burger.name}
					onChange={this.handleChange}
				/>
				<input
					name="price"
					type="text"
					placeholder="Price"
					autoComplete="off"
					value={this.props.burger.price}
					onChange={this.handleChange}
				/>
				<select
					name="status"
					className="status"
					value={this.props.burger.status}
					onChange={this.handleChange}
				>
					<option value="available">Доступно</option>
					<option value="unavailable">Убрать из меню</option>
				</select>
				<textarea
					name="desc"
					placeholder="Desc"
					value={this.props.burger.desc}
					onChange={this.handleChange}
				/>
				<input
					name="image"
					type="text"
					placeholder="Image"
					autoComplete="off"
					value={this.props.burger.image}
					onChange={this.handleChange}
				/>
				<button
					type="submit"
					onClick={() => this.props.deleteBurger(this.props.index)}
				>Удалить из меню</button>
			</div>
		)
	}
}

export default EditBurgerForm;