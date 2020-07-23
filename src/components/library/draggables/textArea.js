import React from 'react';
import { useDrag } from 'react-dnd';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import classes from '../library.module.css';

const TextArea = () => {

    const [collectedProps, drag] = useDrag({
        item: { id : 'TextBlock', type: 'control', text: 'New TextArea'  },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })


    return (
        <div ref={drag} className={classes.objects}>
            <TextFieldsIcon style={{marginRight:'5px',color:'#0078D7', height:'20px',width:'20px'}}></TextFieldsIcon> <span>TextArea</span>
        </div>
    )

}

export default TextArea;