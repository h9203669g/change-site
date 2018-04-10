import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class SocialButton extends Component {
	handleItemClick = (e, { icon }) => this.setState({ activeItem: icon })

  render() {
  	const footStyle= {
  		position: 'absolute',
      	width: '100%',
	    display: 'flex', 
	    justifyContent: 'center',
	    padding: '0.5em',
	    bottom: '0.5em',
	    item:{
	    	margin: '1em',
	    }
    }
    return(
	 	<div style={footStyle}>
		    <Button circular color='red' inverted icon='facebook' style={footStyle.item}/>
		    <Button circular color='red' inverted icon='twitter'style={footStyle.item}/>
		    <Button circular color='red' inverted icon='linkedin' style={footStyle.item}/>
		    <Button circular color='red' inverted icon='google plus'style={footStyle.item}/>
	  	</div>
		)
	}
}