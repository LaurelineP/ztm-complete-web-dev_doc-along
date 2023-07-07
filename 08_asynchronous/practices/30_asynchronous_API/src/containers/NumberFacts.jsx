import React, { Component } from 'react';
import { InputSet } from '../components/InputSet';
import { InputDetails } from '../utils';


class NumbersInterfaceAPI extends Component {
	constructor(){
		super()
		this.state = {
			isLoading: false,
			text: '',
			isRandom: false,
			date: '',
			math: '',
			trivia: ''
		}
		this.onInputChanged = this.onInputChanged.bind(this);
		this.onRequest 		= this.onRequest.bind(this);
	}

	onInputChanged(e){
		
		const { propertyName, value } = interfaceWithState(e);
		console.log('propertyName, value:', propertyName, value)

		const updates = resetOtherStateFields( this.state, propertyName )
		
		this.setState({
			[propertyName]: value,
			...updates
		})
	}

	async onRequest(){
		console.log('requesting...')
		const endpoint = buildRequestEndpoint(this.state);
		try {
			this.setState({ isLoading: true });
			const response 	= await fetch(endpoint);
			const data 		= await response.json();
			this.setState({ isLoading: false, text: data.text });

		} catch( error ){
			console.error(error)
			this.setState({ isLoading: false });
		}
	}
	


	render(){
		// inputs should be disable based on [ isRandom, and if another field is touched ]
		const { 
			isLoading,
			text,
			isRandom,
			date,
			math,
			trivia
		} = this.state;
		const isDisabled = this.state.isRandom
		const inputsOptions = [
			new InputDetails('checkbox', 'random', isDisabled, isRandom),
			new InputDetails('number', 'math', isDisabled, math),
			new InputDetails('number', 'anecdote', isDisabled, trivia),
			new InputDetails('date', 'date', isDisabled, date),
		];

		console.log('this.state',this.state)

	
		return (
			<>
				<h1> Fun Numbers Anecdote </h1>
				<span>{ isLoading ? 'Loading...' : text}</span>
				{
					!!inputsOptions.length && inputsOptions?.map(( inputProps, idx ) => {

						return (
							<InputSet
								key={`${idx}-${inputProps.name}`}
								onInput = { this.onInputChanged }
								{...inputProps }
							/>
						)
					})
				}
				<button onClick={this.onRequest}>Get number info</button>
			</>
		)
	}
}


export default NumbersInterfaceAPI;



function interfaceWithState(e){
	const inputName =  e.target.name;

	console.log('inputName:', inputName)

	// assigns state property according to input names
	const propertyName = inputName.includes('random')
		? 'isRandom' 
		: inputName.includes('anecdote') 
			? 'trivia'
			: inputName.split('-')[1]

	// assigns state value according to input type
	const value = e.target.type === 'checkbox' 
		? e.target.checked : e.target.value < 0 
			? 0 : e.target.value;

	return { propertyName, value }
}

function resetOtherStateFields(state, propertyName){
	// exceptions [ isRandom && current property ]
	const exceptions = [ propertyName, 'isRandom', 'text', 'isLoading'];
	const otherStateFields = Object
		.keys(state)
		.filter( f => !exceptions.includes(f));
	
	return otherStateFields.reduce((acc, curr) => {
		acc[ curr ] = '';
		return acc;
	}, {});
}

function buildRequestEndpoint( state ){
	// "random" selection prioritized
	let baseURL = "http://numbersapi.com/"
	const { date, trivia, math } = state;
	if( state.isRandom ) baseURL += "random"
	else {
		const concerned = Object
			.entries( { date, trivia, math } )
			.filter( tuple => {
				return tuple.every( value => value !== '' )
			})
			[0]
		!!concerned.length && (
			baseURL += `${concerned[ 1 ]}/${concerned[ 0 ]}`
		)
	}
	return baseURL += '?json';
}