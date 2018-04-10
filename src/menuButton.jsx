import React, { Component } from 'react'
import { Button, Grid, Container } from 'semantic-ui-react'

export default class MenuButtonBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    const menuStyle= {
      position: 'absolute',
      width: '100%',
      display: 'flex', 
      justifyContent: 'center',
      item:{
        margin: '1em',
        width: '100%',
      }
    }
    return (
      
      <Grid centered columns={7} padded style={menuStyle}>
        <Grid.Column><Button color='red' inverted name='About' active={activeItem === 'about'} onClick={this.handleItemClick} style={menuStyle.item}>About</Button></Grid.Column>
        <Grid.Column><Button color='red' inverted name='Portfolio' class='borderless'  active={activeItem === 'portfolio'} onClick={this.handleItemClick}style={menuStyle.item}>Portfolio</Button></Grid.Column>
        <Grid.Column><Button color='red' inverted name='Gallery' active={activeItem === 'gallery'} onClick={this.handleItemClick}style={menuStyle.item}>Gallery</Button></Grid.Column>
        <Grid.Column><Button color='red' inverted name='Lab' active={activeItem === 'lab'} onClick={this.handleItemClick}style={menuStyle.item}>Lab</Button></Grid.Column>
        <Grid.Column><Button color='red' inverted name='Contact' active={activeItem === 'lab'} onClick={this.handleItemClick}style={menuStyle.item}>Contact</Button></Grid.Column>
      </Grid>
    )
  }
}