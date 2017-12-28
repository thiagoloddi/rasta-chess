import React, { Component } from 'react';
import { Button } from 'react-materialize';

export default class Welcome extends Component{

	render(){

		return(
			<section className='welcome'>
				<div>
					<Button node='a' waves="light" href="/play">Jogar</Button>
					<Button node='a' waves="light" href="/simulation">Simulação</Button>
				</div>
			</section>
		);
	}
}
