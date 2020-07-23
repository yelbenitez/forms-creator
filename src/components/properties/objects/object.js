import React from 'react';
import classes from '../properties.module.css';

import TextArea from './objectType/textArea';
import Header from './objectType/header';
import Button from './objectType/button';
import Input from './objectType/input';
import Dropdown from './objectType/dropdown';

const Objects = ({id,text,type,onInputChangeHandler,buttons,deleteObjects,choices,deleteDropdownChoices,addDropdownChoices,myRef,isClicked,objects,setObjects,onInputClickHandler}) => {

    let objectComponent = '';

    let highlight = {}

    if(isClicked){
        highlight = {
            //backgroundColor:'#ccffcc'
            backgroundColor: '#d7ecf4'
        }
    }

    const objectClick = (id) => {
        
    
        let objIndex;
        let isClicked = true;

        let resetState = [
          ...objects
        ]

        for(let x = 0; x < objects.length; x++) {
            if(objects[x].id == id){
                objIndex = x;
            }
        }

        if(resetState[objIndex].isClicked){
          isClicked = false
        }

        for(let x = 0; x < objects.length; x++) {
            resetState[x].isClicked = false;
        }

        resetState[objIndex].isClicked = isClicked;

        setObjects(resetState)

    }

    if(type === "TextBlock"){
        objectComponent = <TextArea onInputClickHandler={onInputClickHandler} id={id} objectClick={objectClick} myRef={myRef} deleteObjects={deleteObjects} onInputChangeHandler={onInputChangeHandler} id={id} text={text} isClicked={isClicked}> </TextArea>
    }else if(type === "Header"){
        objectComponent = <Header onInputClickHandler={onInputClickHandler} id={id} objectClick={objectClick} myRef={myRef} onInputChangeHandler={onInputChangeHandler} id={id} text={text} isClicked={isClicked}></Header>
    }else if(type === "Button"){
        objectComponent = <Button onInputClickHandler={onInputClickHandler} id={id} objectClick={objectClick} myRef={myRef} style={classes}  onInputChangeHandler={onInputChangeHandler} buttons={buttons} isClicked={isClicked}></Button>
    }else if(type === "Input"){
        objectComponent = <Input onInputClickHandler={onInputClickHandler} id={id} objectClick={objectClick} myRef={myRef} deleteObjects={deleteObjects} onInputChangeHandler={onInputChangeHandler} id={id} text={text} isClicked={isClicked}></Input>
    }else if(type === "Input.ChoiceSet"){
        objectComponent = <Dropdown onInputClickHandler={onInputClickHandler} id={id} objectClick={objectClick} myRef={myRef} addDropdownChoices={addDropdownChoices} deleteObjects={deleteObjects} deleteDropdownChoices={deleteDropdownChoices}  onInputChangeHandler={onInputChangeHandler} id={id} choices={choices} isClicked={isClicked}></Dropdown>
    }

    return (
        <div ref={myRef} onClick={()=>objectClick(id)} className={classes.objects} style={highlight}>
            {objectComponent}
        </div>
    )


}

export default Objects;