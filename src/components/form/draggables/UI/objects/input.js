import React from 'react';
import classes from '../../../form.module.css';
import CreateIcon from '@material-ui/icons/Create';

const TextArea = ({addObject,handleClose}) => {
    
    const item = {
        text: 'Placeholder text',
        type: 'Input'
    }

    const addNewObject = () => {
        addObject(item);
        handleClose();
    }
     
    return (
        <div onClick={addNewObject} className={classes.objects}>
            <CreateIcon style={{marginRight:'5px',color:'#0078D7'}}></CreateIcon> <span className={classes.objectsLabel}>Input</span>
        </div>
    )
}

export default TextArea;