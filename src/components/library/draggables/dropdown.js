import React from 'react';
import { useDrag } from 'react-dnd';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import classes from '../library.module.css';

const Dropdown = () => {

    const [collectedProps, drag] = useDrag({
        item: { id : 'Input.ChoiceSet', type: 'control', text: 'Placeholder text',  
        choices:[
            {
                title: "choice 1",
                value: "choice 1"
            },
            {
                title: "choice 2",
                value: "choice 2"
            }
            ]  
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })


    return (
        <div ref={drag} className={classes.objects}>
            <FormatListBulletedIcon style={{marginRight:'5px',color:'#0078D7', height:'20px',width:'20px'}}></FormatListBulletedIcon> <span>Dropdown</span>
        </div>
    )

}

export default Dropdown;