import React, { Component } from 'react';
import { Button, Grid, Container, Responsive, Sidebar, Segment, Menu, Visible, Icon} from 'semantic-ui-react';


export default class MenuButtonBar extends Component {
  constructor(props) {
      super(props);
  };
  
  state = { 
    activeItem: 'about'
  }/*
  componentWillReceiveProps({resize}) {
    this.setState({resize: resize});
  }*/
  // Method
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.listenMBB(name);
  }
  // render
  render() {
    const { activeItem } = this.state;
    const menuStyle= {
      position: 'absolute',
      width: '100%',
      display: 'flex', 
      justifyContent: 'center',
      margin: 0,
      item:{
        margin: '1em',
        width: '100%',
        color: 'transprent',
        backgroundColor: 'rgba(255,100,90,0.25)'
      }
    };
    const menuStyleResize= {
      position: 'absolute',
      width: '100%',
      display: 'flex', 
      justifyContent: 'center',
      margin: 0,
      item:{
        justifyContent: 'center',
        margin:'0.5em',
        width: '100%',
        color: 'transprent',
        backgroundColor: 'rgba(255,100,90,0.25)'
      }
    };
      if (this.props.resize){
        return(
          <Grid centered columns={5} padded style={menuStyleResize}>
              <Grid.Column >
                <Button color='red' inverted name='about' active={activeItem === 'about'} onClick={this.handleItemClick}style={menuStyleResize.item}>A</Button>
              </Grid.Column>
              <Grid.Column>
                <Button color='red' inverted name='service' active={activeItem === 'service'} onClick={this.handleItemClick}style={menuStyleResize.item}>S</Button>
              </Grid.Column>
              <Grid.Column>
                <Button color='red' inverted name='gallery' active={activeItem === 'gallery'} onClick={this.handleItemClick}style={menuStyleResize.item}>G</Button>
              </Grid.Column>
              <Grid.Column>
                <Button color='red' inverted name='lab' active={activeItem === 'lab'} onClick={this.handleItemClick}style={menuStyleResize.item}>L</Button>
              </Grid.Column>
              <Grid.Column>
                <Button color='red' inverted name='contact' active={activeItem === 'contact'} onClick={this.handleItemClick}style={menuStyleResize.item}>C</Button>
              </Grid.Column>
          </Grid>
          );
      }else{
        return (
          <Grid centered columns={7} padded style={menuStyle}>
              <Grid.Column>
                <Button color='red' inverted name='about' active={activeItem === 'about'} onClick={this.handleItemClick}style={menuStyle.item}>About</Button>
              </Grid.Column>
              <Grid.Column>
                <Button color='red' inverted name='service' active={activeItem === 'service'} onClick={this.handleItemClick}style={menuStyle.item}>Service</Button>
              </Grid.Column>
              <Grid.Column>
                <Button color='red' inverted name='gallery' active={activeItem === 'gallery'} onClick={this.handleItemClick}style={menuStyle.item}>Gallery</Button>
              </Grid.Column>
              <Grid.Column>
                <Button color='red' inverted name='lab' active={activeItem === 'lab'} onClick={this.handleItemClick}style={menuStyle.item}>Lab</Button>
              </Grid.Column>
              <Grid.Column>
                <Button color='red' inverted name='contact' active={activeItem === 'contact'} onClick={this.handleItemClick}style={menuStyle.item}>Contact</Button>
              </Grid.Column>
          </Grid>
        );
      }
  }
}