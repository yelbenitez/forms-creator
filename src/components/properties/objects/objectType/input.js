import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import classes from '../../properties.module.css';
import style from '../../../../assets/adaptiveCards.module.css';

const Input = ({id,text,onInputChangeHandler,deleteObjects,onInputClickHandler}) => {

    return (
        <>
            <div className={classes.propertyDivHeader}>
                <h4>Input</h4>
                <div className={classes.spacer}></div>
                <div className={classes.deleteObjectBtn}>
                    <IconButton  onClick={(event)=>deleteObjects(event,id)}  aria-label="delete" size="small">
                            <ClearIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
            <div className={classes.objectProperties}>
                <span style={{marginLeft:'50px'}}>Text</span>
                <input
                    className={[style.acinput, style.actextInput].join(' ')}
                    style={{width:'100%',marginLeft:'30px'}}
                    placeholder="(Not)"
                    value={text}
                    id={id}
                    onChange={onInputChangeHandler}
                    onClick={(event)=>onInputClickHandler(event)}
                >
                </input>
            </div>
        </>
    )
}

export default Input;