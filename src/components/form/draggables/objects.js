import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';

import TextAreaUI from './UI/textArea';
import InputUI from './UI/input';
import ButtonUI from './UI/button';
import Placeholder from './UI/placeholder';
import DropdownUI from './UI/dropdown';


const Objects = ({ id, text, index, type, moveObject, objects, setObjects, buttons, objectLength, choices, myRef, isClicked }) => {
    
    const ref = useRef(null)
    const [, drop] = useDrop({
      accept: 'control',
      hover(item, monitor) {

        if (!ref.current) {
          return
        }
        
        const dragIndex = item.index
        const hoverIndex = index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY ) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        // Time to actually perform the action

        // check if key exist
        let ifExist = checkState(item)


        if(ifExist && (item.id !== 2 && item.id !== 3 && item.id !== 1) && (hoverIndex !== 0 && hoverIndex !== objectLength-1 && hoverIndex !== objectLength-2)){
            moveObject(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        }
      },
      drop(item,monitor){

        // check if key exist
        let ifExist = checkState(item)
       
        // add item if does not exist on current state
        if(!ifExist){
            const { length } = objects;
            const id = length + 1;

            let body = {
                id: id,
                text: item.text,
                type: item.id,
                propsRef: ref
            }

            if(item.id === "Input.ChoiceSet"){
              body["choices"] = item.choices
              body["value"] = item.choices[0].title
            }

            setObjects(
                update(objects, {$splice: [[objects.length-2,0,body]]})
            )
        }
        
      }
    })

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'control', id, index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
    })

    const checkState = (item) => {

        const { length } = objects;
        const id = length + 1;
        const found = objects.some(val => val.id === item.id)
        let returnVal = true;

        if(!found) {
           returnVal = false;
        }

        return returnVal;

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

    let backgroundColor = '';

    if(isClicked){
      //backgroundColor = '#ccffcc';
      backgroundColor = '#d7ecf4';
    }

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    let style = {
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move'
    }

    let border = '1px dashed gray';

    if(id == 0) {
        style = { height: '10px' }
        border = ''
    }

    let controlComponent = ''

    if(type == 'TextBlock' || type == 'Header'){
        controlComponent = <TextAreaUI objectClick={objectClick} id={id} myRef={myRef} type={type} text={text}></TextAreaUI>
    }else if(type == 'Input'){
        controlComponent = <InputUI objectClick={objectClick} id={id} myRef={myRef} text={text}></InputUI>
    }else if(type == 'Button'){
        controlComponent = <ButtonUI objectClick={objectClick} id={id} myRef={myRef} buttons={buttons} text={text}></ButtonUI>
    }else if(type == 'Placeholder'){
        style = {
          padding:'2px 2px',
          backgroundColor: 'white',
          cursor: 'move',
          paddingBottom: '60px'
        }

        border = '';
        controlComponent = <Placeholder objects={objects} setObjects={setObjects} myRef={myRef} text={text} ></Placeholder>
    }
    else if(type == 'Input.ChoiceSet'){
        controlComponent = <DropdownUI objectClick={objectClick} myRef={myRef} id={id} text={text} choices={choices}></DropdownUI>
    }

    return (
        <div id={id} ref={ref} style={{ ...style, opacity, border, backgroundColor }}>
            {controlComponent}
        </div>
    )

}

export default Objects;