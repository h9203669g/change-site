import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

import _ from 'lodash'

import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility, Button, Responsive
} from 'semantic-ui-react'

import ThreeHeader from "./header/Header.js";
import MenuButtonBar from './assets/component/menuButton.jsx';
import AccorddinPannel from './assets/component/accorddinPannel.jsx';
import SocialButton from "./assets/component/socialButton.jsx";
import TabContent from "./assets/component/tabContent.jsx";
import MenuButtonOverlay from "./assets/component/menuButtonOverlay.jsx";

export default class StickyLayout extends Component {
  constructor(props) {
      super(props);
      this.state = {
        menuactive:'about',
        resize: false,
      };
   }

  listenMBB = (name)=>{
    this.setState({ menuactive: name });
  }

  handleOnUpdate = (e, { width }) => {
    if (width<833){
      this.setState({ resize: true });
    }else{
      this.setState({ resize: false });
    }
  }

  render() {
    const fontStyle = {
      fontFamily: 'Microsoft JhengHei',
    };
    const mainStyle= {
      margin: '0 -1em 0 -1em'
    }
    return (
      <Responsive
        as={Grid}
        center
        fireOnMount
        onUpdate={this.handleOnUpdate}
        style={mainStyle}
      >
        <MenuButtonBar style={fontStyle} listenMBB={this.listenMBB} resize={this.state.resize}/>
        <ThreeHeader style={fontStyle}/>
        <TabContent style={fontStyle} menuactive={this.state.menuactive}/>
        <SocialButton style={fontStyle} resize={this.state.resize}/>
      </Responsive>
    )
  }
}

ReactDOM.render(<StickyLayout />, document.getElementById('root'));
registerServiceWorker();
