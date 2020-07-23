import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import classes from '../../properties.module.css';
import style from '../../../../assets/adaptiveCards.module.css';

const Button = ({id,buttons,onInputChangeHandler,onInputClickHandler}) => {

    return (
        <>
            <h4>Button</h4>
            <div className={classes.objectProperties}>
                <span style={{marginLeft:'50px'}}>Text</span>
                <input
                    className={[style.acinput, style.actextInput].join(' ')}
                    style={{width:'100%',marginLeft:'30px'}}
                    placeholder="(Not)"
                    value={buttons[0].text}
                    id={buttons[0].id}
                    onChange={onInputChangeHandler}
                    onClick={(event)=>onInputClickHandler(event)}
                >
                </input>
            </div>
            <div className={classes.objectProperties}>
                <span style={{marginLeft:'50px'}}>Text</span>
                <input
                    className={[style.acinput, style.actextInput].join(' ')}
                    style={{width:'100%',marginLeft:'30px'}}
                    placeholder="(Not)"
                    value={buttons[1].text}
                    id={buttons[1].id}
                    onChange={onInputChangeHandler}
                    onClick={(event)=>onInputClickHandler(event)}
                >
                </input>
            </div>
        </>
    )
}

export default Button;