import React, { useCallback } from 'react';
import Objects from './objects';
import update from 'immutability-helper';

const style = {
    width: 390,
    minWidth: 300,
    minHeight: 40,
    border: '5px solid #D3D3D3'
}

const Container = ({objects,setObjects}) => {
    
    const objectLength = objects.length;

    const moveObject = useCallback(
      (dragIndex, hoverIndex) => {

        console.log(dragIndex, hoverIndex);
        const dragObject = objects[dragIndex]
        setObjects(
          update(objects, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragObject],
            ],
          }),
        )
      },
    )

    const renderObject = (object, index) => {

      let buttons = '';
      let choices = '';

      if(object.type == 'Button'){
        buttons = object.buttons;
      }

      if(object.type == 'Input.ChoiceSet'){
        choices = object.choices;
      }

      return (
        <Objects
          key={object.id}
          index={index}
          id={object.id}
          text={object.text}
          highlight={object.isClicked}
          type={object.type}
          moveObject={moveObject}
          objects={objects}
          setObjects={setObjects}
          buttons={buttons}
          objectLength={objectLength}
          choices={choices}
          myRef={object.propsRef}
          isClicked={object.isClicked}
        />
      )
    }
    return (
      <> 
          <div style={style}>{
              objects.map((object, i) => renderObject(object, i))
              }
          </div>
      </>
    )
  
}

export default Container;