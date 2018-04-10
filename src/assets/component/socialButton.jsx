import React, { Component } from 'react'
import { Grid, Button, Segment } from 'semantic-ui-react'

export default class SocialButton extends Component {
	handleItemClick = (e, { icon }) => this.setState({ activeItem: icon })

  render() {
  	const footStyle= {
  		position: 'absolute',
      	width: '100%',
	    display: 'flex', 
	    justifyContent: 'center',
	    margin: '1em ',
	    bottom: '0.5em',
	    item:{
	    	margin: '1em 1em 0em 1em',
	    },
		seg:{
			color: 'rgba(255,100,90,1)'
		},
		span:{
			margin: '0em 0.5em 1em 0.5em',
		}
    }
    const footStyleResize= {
  		position: 'absolute',
      	width: '100%',
	    display: 'flex', 
	    justifyContent: 'center',
	    margin: '0.5em ',
	    bottom: '0em',
	    item:{
	    	margin: '0.25em 0.5em -1.5em 0.5em',
	    },
		seg:{
			color: 'rgba(255,100,90,1)'
		},
		span:{
			margin: '0',
		}
    }
    if (this.props.resize){
        return(
          <Grid cenered style={footStyleResize}>
			 	<Grid.Row>
					    <Button circular color='red' inverted icon='facebook' style={footStyleResize.item}/>
					    <Button circular color='red' inverted icon='twitter'style={footStyleResize.item}/>
					    <Button circular color='red' inverted icon='linkedin' style={footStyleResize.item}/>
					    <Button circular color='red' inverted icon='google plus'style={footStyleResize.item}/>
				</Grid.Row>
				<Grid.Row style={footStyleResize.seg}>
	            	<span style={footStyleResize.span}>&copy; CHANGE DUO STUDIO</span><span style={footStyleResize.span}>｜</span><span style={footStyleResize.span}>TEL：(02)2321-5563</span><span style={footStyleResize.span}>｜</span><span style={footStyleResize.span}>FAX：(02)2321-4317</span>
	            </Grid.Row>
		  </Grid>
          );
      }else{
	    return(
		 	<Grid cenered style={footStyle}>
		 		<Grid.Row>
				    <Button circular color='red' inverted icon='facebook' style={footStyle.item}/>
				    <Button circular color='red' inverted icon='twitter'style={footStyle.item}/>
				    <Button circular color='red' inverted icon='linkedin' style={footStyle.item}/>
				    <Button circular color='red' inverted icon='google plus'style={footStyle.item}/>
			    </Grid.Row>
			    <Grid.Row style={footStyle.seg}>
	            	<span style={footStyle.span}>&copy; CHANGE DUO STUDIO</span><span style={footStyle.span}>｜</span><span style={footStyle.span}>TEL：(02)2321-5563</span><span style={footStyle.span}>｜</span><span style={footStyle.span}>FAX：(02)2321-4317</span>
	            </Grid.Row>
		  	</Grid>
			);
		}
	}
}