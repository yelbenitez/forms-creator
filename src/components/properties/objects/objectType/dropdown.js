import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import classes from '../../properties.module.css';
import style from '../../../../assets/adaptiveCards.module.css';

const Dropdown = ({id,onInputChangeHandler,choices,deleteObjects,deleteDropdownChoices,addDropdownChoices,onInputClickHandler}) => {

    let defaultValue = "(Not Set)"
    let defaultId = "none"

    if(choices.length !== 0){
        defaultValue = choices[0].title;
        defaultId = '{"id":'+id+', "type":"title", "index":"'+0+'"}'
    }

    return (
        <>
            <div className={classes.propertyDivHeader}>
                <h4>Dropdown</h4>
                <div className={classes.spacer}></div>
                <div className={classes.deleteObjectBtn}>
                    <IconButton  onClick={(event)=>deleteObjects(event,id)} aria-label="delete" size="small">
                            <ClearIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>
            <div className={classes.objectProperties}>
                <span style={{marginLeft:'50px'}}>Text</span>
                <input
                    className={[style.acinput, style.actextInput].join(' ')}
                    style={{width:'100%',marginLeft:'30px'}}
                    placeholder="(Not Set)"
                    value={defaultValue}
                    id={defaultId}
                    onChange={onInputChangeHandler}
                    onClick={(event)=>onInputClickHandler(event)}
                >
                </input>
            </div>
            <h5>Choices:</h5>
            {choices.map((choice,index) =>{
                    return (
                        <div className={classes.dropdownChoices}>
                            <input
                                className={[style.acinput, style.actextInput, classes.dropdownChoicesItem].join(' ')}
                                style={{width:'100%'}}
                                placeholder="Title"
                                value={choice.title}
                                id={'{"id":'+id+', "type":"title", "index":"'+index+'"}'}
                                onChange={onInputChangeHandler}
                                onClick={(event)=>onInputClickHandler(event)}
                            ></input> 
                            <input
                                className={[style.acinput, style.actextInput, classes.dropdownChoicesItem].join(' ')}
                                style={{width:'100%'}}
                                placeholder="Value"
                                value={choice.value}
                                id={'{"id":'+id+', "type":"value", "index":"'+index+'"}'}
                                onChange={onInputChangeHandler}
                                onClick={(event)=>onInputClickHandler(event)}
                            ></input>
                        
                            <button 
                                className={[style.defaultacpushButton, classes.dropdownChoicesItem].join(' ')}
                                onClick={(event) => {deleteDropdownChoices(event,id,index)}}
                            >
                                X
                            </button>            
                        </div>
                    )
                })}
                <button 
                    className={[style.defaultacpushButton, classes.dropdownChoicesItem].join(' ')}
                    onClick={(event)=> {addDropdownChoices(event,id)}}
                >
                    Add a new choice
                </button>
        </>
    )
}

export default Dropdown;