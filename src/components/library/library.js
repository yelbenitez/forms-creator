import React from 'react';
import classes from './library.module.css';

import TextArea from './draggables/textArea';
import Inputs from './draggables/input';
import Dropdown from './draggables/dropdown';


const Library = () => {

    return (
        <div>
            <div className={classes.libraryHeader}>
                <span>OBJECT LIBRARY</span>
            </div>
            <TextArea></TextArea>
            <Inputs></Inputs>
            <Dropdown></Dropdown>
        </div>
    )
}

export default Library;