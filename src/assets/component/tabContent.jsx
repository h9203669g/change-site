import React, { Component } from 'react';
import { Tab,Menu } from 'semantic-ui-react';
import nl2br from 'react-newline-to-break';

  const tabContentData = require('../json/tabcontent.json');
  const tabAboutData = require('../json/tababout.json');
  const tabServiceData = require('../json/tabservice.json');
  const tabGalleryData = require('../json/tabgallery.json');
  const tabLabData = require('../json/tablab.json');
  const tabContactData = require('../json/tabcontact.json');

   const tabStyle = {
      position: 'absolute',
      top: '20%',
      left:'10%',
      width: '80%',
      height: '60vh',
      justifyContent: 'center',
      

      MenuItem:{

        backgroundColor:'rgba(255,100,90,0)',
        border: 'none',
        color:'rgba(255,100,90,1)',
      },
      MenuItemActive:{
         backgroundColor:'rgba(255,100,90,0.25)',
         border: 'solid rgba(255,100,90,1) 0.125em',
         color: 'white',
      },

      Pane:{
        border: 'solid rgba(255,100,90,1) 0.125em',
        borderRadius: '0.5em',
        padding: '1em',
        backgroundColor:'rgba(255,100,90,0.25)',
        color:'white',
      }
    }
    const contentIndex = (ref)=>{
      switch(ref){
        case 'about':
          return 0;
        case 'service':
          return 1;
        case 'gallery':
          return 2;
        case 'lab':
          return 3;
        case 'contact':
          return 4;
        default:
          return 0;
      }
    };
    
   const textarray = (ref)=>{
      var refpara = '<List>';
      for(let i= 0; i<ref.length;i+=1){
        refpara+='<List.Item>'+ref[i]+'</List.Item>';
      }
      return refpara+'</List>';
    };
    
export default class TabContent extends Component {

  constructor(props) {
      super(props);
  }
  
  componentWillReceiveProps({menuactive}) {
    this.loadState();
  }
  handleTabChange = (e, data) => {
    var ci = contentIndex(this.props.menuactive);
    for(let i = 0;i<data.panes.length;i+=1){
      if  (i == data.activeIndex){
        data.panes[i].menuItem=<Menu.Item style={tabStyle.MenuItemActive} >{tabContentData[ci][i].titleEn}</Menu.Item>;
      }else{
        data.panes[i].menuItem=<Menu.Item style={tabStyle.MenuItem}>{tabContentData[ci][i].titleEn}</Menu.Item>;
      }      
    }
  }
  loadState = ()=> {

      switch (this.props.menuactive){
      case 'about':
        var tabAbout=[];
        //initial 
        tabAbout.push({menuItem: <Menu.Item className="about" style={tabStyle.MenuItemActive} >{tabContentData[0][0].titleEn}</Menu.Item>, 
                        render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[0][0].contentEn)}</Tab.Pane>});
        //others
        for(let i=1;i<tabContentData[0].length;i+=1){
          tabAbout.push({menuItem: <Menu.Item className="about" style={tabStyle.MenuItem} >{tabContentData[0][i].titleEn}</Menu.Item>, 
                        render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[0][i].contentEn)}</Tab.Pane>});
        }
        return tabAbout;
      case 'service':
        var tabService=[];
        //initial 
        tabService.push({menuItem: <Menu.Item style={tabStyle.MenuItemActive} >{tabContentData[1][0].titleEn}</Menu.Item>, 
                          render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[1][0].contentEn)}</Tab.Pane>}); 
        //others
        for(let i=1;i<tabContentData[1].length;i+=1){
          tabService.push({menuItem: <Menu.Item style={tabStyle.MenuItem} >{tabContentData[1][i].titleEn}</Menu.Item>, 
                          render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[1][i].contentEn)}</Tab.Pane>});
        }
        return tabService;
      case 'gallery':
        var tabGallery=[];
        tabGallery.push({menuItem: <Menu.Item style={tabStyle.MenuItemActive} >{tabContentData[2][0].titleEn}</Menu.Item>, 
                          render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[2][0].contentEn)}</Tab.Pane>}); 
        for(let i=1;i<tabContentData[2].length;i+=1){
          tabGallery.push({menuItem: <Menu.Item style={tabStyle.MenuItem} >{tabContentData[2][i].titleEn}</Menu.Item>, 
                          render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[2][i].contentEn)}</Tab.Pane>});
        }
        return tabGallery;
      case 'lab':
        var tabLab=[];
        tabLab.push({menuItem: <Menu.Item style={tabStyle.MenuItemActive} >{tabContentData[3][0].titleEn}</Menu.Item>, 
                      render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[3][0].contentEn)}</Tab.Pane>}); 
        for(let i=1;i<tabContentData[3].length;i+=1){
          tabLab.push({menuItem: <Menu.Item style={tabStyle.MenuItem} >{tabContentData[3][i].titleEn}</Menu.Item>, 
                      render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[3][i].contentEn)}</Tab.Pane>});
        }
        return tabLab;
      case 'contact':
        var tabContact=[];
        tabContact.push({menuItem: <Menu.Item style={tabStyle.MenuItemActive} >{tabContentData[4][0].titleEn}</Menu.Item>, 
                        render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[4][0].contentEn)}</Tab.Pane>}); 
        for(let i=1;i<tabContentData[4].length;i+=1){
          tabContact.push({menuItem: <Menu.Item style={tabStyle.MenuItem} >{tabContentData[4][i].titleEn}</Menu.Item>, 
                        render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[4][i].contentEn)}</Tab.Pane>});
        }
        return tabContact;
      default:
        var tabAbout=[];
        tabAbout.push({menuItem: <Menu.Item style={tabStyle.MenuItemActive} >{tabContentData[0][0].titleEn}</Menu.Item>, 
                        render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[0][0].contentEn)}</Tab.Pane>}); 
        for(let i=0;i<tabContentData[0].length;i+=1){
          tabAbout.push({menuItem: <Menu.Item style={tabStyle.MenuItem} >{tabContentData[0][i].titleEn}</Menu.Item>, 
                        render: () => <Tab.Pane style={tabStyle.Pane}>{nl2br(tabContentData[0][i].contentEn)}</Tab.Pane>});
        }
        return tabAbout;
      }
  }

  render() {
    return(
      <div>
        <Tab inverted menu={{ fluid: true, vertical: true, tabular: 'right', borderless: true}} 
              style={tabStyle}
              panes={this.loadState()}
              onTabChange={this.handleTabChange}
              />
        
      </div>
    )
  }
}
