import React, { useState, useRef } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/UI/navbar';
import './App.css';

import Form from './components/form/form';
import Library from './components/library/library';
import Properties from './components/properties/properties';

function App() {

  const [objects, setObjects] = useState([
    {
      id: 1,
      text: 'Sample Title',
      isClicked: false,
      type: 'Header',
      propsRef: useRef(null),
    },
    {
       id: 3,
       text: 'Drag and add object here or click to add',
       isClicked: false,
       type: 'Placeholder',
       propsRef: useRef(null)
    },  
    {
      id: 2,
      text: 'Button',
      isClicked: false,
      type: 'Button',
      propsRef: useRef(null),
      buttons:[
         {
          id:'btn1',
          text: 'Submit'
         },
         {
          id:'btn2',
          text: 'Cancel'
         }
      ]
    }
  ])

  // temporary for adaptive card json schema generate
  const [schema,setSchema] = useState({
      "type": "AdaptiveCard",
      "body": [],
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.2"
  })


  return (
    <div className="layout">
        <React.Fragment>
          <CssBaseline/>
          <NavBar/>
            <div className="body">
                <div className="formPallete">
                  <Form objects={objects} setObjects={setObjects} ></Form>
                </div>
                <div className="objectPallete">
                  <Library></Library>
                </div>
                <div className="propertiesPallete">
                  <Properties objects={objects} setObjects={setObjects} schema={schema} setSchema={setSchema}></Properties>
                </div>
            </div>
        </React.Fragment>
    </div>
  );
}

export default App;
