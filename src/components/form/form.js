import React from 'react'
import classes from './form.module.css';
import Container from './draggables/container';

import Card from '@material-ui/core/Card';

const Form = ({objects, setObjects}) => {

    return(
        <div className={classes.backdrop}>
            Form Layout:
                <Card  variant="outlined">
                <Container objects={objects} setObjects={setObjects} />
            </Card>
        </div>
    )
}

export default Form;
