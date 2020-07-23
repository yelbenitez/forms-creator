import React from 'react';
import classes from '../../../form.module.css';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';


const Dropdown = ({addObject,handleClose}) => {
    
    const item = {
        text: 'Placeholder text',
        type: 'Input.ChoiceSet',
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
    }

    const addNewObject = () => {
        addObject(item);
        handleClose();
    }
     
    return (
        <div onClick={addNewObject} className={classes.objects}>
            <FormatListBulletedIcon style={{marginRight:'5px',color:'#0078D7'}}></FormatListBulletedIcon> <span className={classes.objectsLabel}>Dropdown</span>
        </div>
    )
}

export default Dropdown;