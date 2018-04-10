import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

import _ from 'lodash'

import {
  Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility, Button
} from 'semantic-ui-react'

import ThreeHeader from "./header/Header.js";
import MenuButtonBar from './assets/component/menuButton.jsx';
import AccorddinPannel from './assets/component/accorddinPannel.jsx';
import SocialButton from "./assets/component/socialButton.jsx";
import TabContent from "./assets/component/tabContent.jsx";

export default class StickyLayout extends Component {
  constructor(props) {
      super(props);
      this.state = {menuactive:'about'};
   }

  listenMBB = (name)=>{
    this.setState({ menuactive: name });
  }

  render() {
    return (
      <div>
        <MenuButtonBar listenMBB={this.listenMBB}/>
        <ThreeHeader />
        <TabContent menuactive={this.state.menuactive}/>
        <SocialButton/>
      </div>
    )
  }
}

ReactDOM.render(<StickyLayout />, document.getElementById('root'));
registerServiceWorker();
