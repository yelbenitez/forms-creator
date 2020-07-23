import React from 'react';
import { useDrag } from 'react-dnd';
import CreateIcon from '@material-ui/icons/Create';
import classes from '../library.module.css';

const Input = () => {

    const [collectedProps, drag] = useDrag({
        item: { id : 'Input', type: 'control', text: 'Placeholder text' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })


    return (
        <div ref={drag} className={classes.objects}>
            <CreateIcon style={{marginRight:'5px',color:'#0078D7', height:'20px',width:'20px'}}></CreateIcon> <span>Input</span>
        </div>
    )

}

export default Input;