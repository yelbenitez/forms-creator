import React from 'react';
import classes from '../../../form.module.css';
import TextFieldsIcon from '@material-ui/icons/TextFields';


const TextArea = ({addObject,handleClose}) => {
    
    const item = {
        text: 'New TextArea',
        type: 'TextBlock'
    }

    const addNewObject = () => {
        addObject(item);
        handleClose();
    }
     
    return (
        <div onClick={addNewObject} className={classes.objects}>
            <TextFieldsIcon style={{marginRight:'5px',color:'#0078D7'}}></TextFieldsIcon> <span className={classes.objectsLabel}>TextArea</span>
        </div>
    )
}

export default TextArea;