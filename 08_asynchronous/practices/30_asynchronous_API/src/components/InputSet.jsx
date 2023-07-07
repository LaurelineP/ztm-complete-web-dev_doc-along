import React, { Component } from 'react';
import './InputSet.scss'

class InputSet extends Component {

	render(){
		const {name: _name, isDisabled, type, onInput, value, isRandom }  = this.props
		const name = `input-${_name}`;
		return (
			<div className = "InputSet">
				<div className="InputSet-container">

					<label htmlFor={name}>{this.props.name}</label>

					<input
						type={type}
						disabled={type === 'checkbox' ? isRandom : isDisabled}
						name={name}
						onInput={onInput}
						value={value}
						/>
				</div>
			</div>
		)
	}
}

export { InputSet };