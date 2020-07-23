import React from 'react';
import classes from './properties.module.css';
import style from '../../assets/adaptiveCards.module.css';
import update from 'immutability-helper';
import Objects from './objects/object';

import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CodeIcon from '@material-ui/icons/Code';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
      width: '25%',
      outline: 'none'
    },
}));

const Properties = ({objects,setObjects,schema,setSchema}) => {

    const styles = useStyles();

    // modal styling
    const parent = {
        display: 'flex',
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        generateJSONSchema();   
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const onInputChangeHandler = e => {

        let index;

        let updatedItem = [
            ...objects
        ]

        console.log(e.target)

        if(e.target.id == 'btn1' || e.target.id == 'btn2'){

            index = updatedItem.length - 1;

            if(e.target.id == 'btn1'){
                updatedItem[index].buttons[0].text = e.target.value;
            }else{
                updatedItem[index].buttons[1].text = e.target.value;
            }

        }else{

            let newObject = JSON.parse(e.target.id);

            for(let x = 0; x < objects.length; x++) {
                if(objects[x].id == e.target.id){
                    index = x;
                }
                if(objects[x].id == newObject.id){
                    index = x;
                }
            }


            if(updatedItem[index].type == "Input.ChoiceSet"){
                if(newObject.type !== undefined){
                    if(newObject.type == "title"){
                        updatedItem[index].choices[newObject.index].title =  e.target.value;
                    }else{
                        updatedItem[index].choices[newObject.index].value =  e.target.value;
                    }
                }else{
                    updatedItem[index].text = e.target.value;
                }
            }else{
                updatedItem[index].text = e.target.value;
            }
        }        

        setObjects(updatedItem)

    }

    const deleteObjects = (event,id) => {

        event.stopPropagation();

        let index;


        for(let x = 0; x < objects.length; x++) {
            if(objects[x].id == id){
                index = x;
            }
        }


        if(index !== undefined) {
            setObjects(
                update(
                    objects, {
                        $splice:[[index,1]]
                    }
                )
            )
        }

    }

    // dropdown related 
    const deleteDropdownChoices = (event,objectId,choiceIndex) => {

        event.stopPropagation();

        let index;

        for(let x = 0; x < objects.length; x++) {
            if(objects[x].id == objectId){
                index = x;
            }
        }
    
        setObjects(
            update(
                objects,{[index]:{
                        choices:{
                            $splice:[[choiceIndex,1]]
                        }
                    }
                }
            )
        )

}

const addDropdownChoices = (event,id) => {

    event.stopPropagation();

    let index;

    for(let x = 0; x < objects.length; x++) {
        if(objects[x].id == id){
            index = x;
        }
    }

    setObjects(
        update(
            objects,{[index]:{
                    choices:{
                        $push: [{
                            title: '',
                            value: ''
                        }]
                    }
                }
            }
        )
    )

}

const onInputClickHandler = event => {
    event.stopPropagation();
}


const generateJSONSchema = () => {
        
    let SchemaBody = [
        {
            "type": "TextBlock",
            "size": "Medium",
            "weight": "Bolder",
            "text": objects[0].text
        },
        {
            "type": "ActionSet",
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": objects[objects.length-1].buttons[0].text
                },
                {
                    "type": "Action.Submit",
                    "title": objects[objects.length-1].buttons[1].text
                }
            ]
        }
    ];

    for(let x = 0; x < objects.length; x++){
        
        if(x !== 0 && (objects[x].id !== 2  && objects[x].id !== 3)){
            SchemaBody.splice(SchemaBody.length-1,0,objects[x])
        }
    }

    schema.body = SchemaBody;

    let newSchema = {
        ...schema
    }

    for(let x = 0; x < newSchema.body.length; x++){
        if(newSchema.body[x].propsRef !== undefined){
            newSchema.body[x].propsRef = null;
        }
    }

    setSchema(newSchema)
}

    const renderObjects = (object, index) => {

        let button = '';
        let choices = '';

        if(object.type == "Button"){
            button = object.buttons;
        }

        if(object.type == "Input.ChoiceSet"){
            choices = object.choices;
        }

        if(object.type != "Placeholder"){
            
            return (
                <Objects 
                    id={object.id}
                    text={object.text}
                    type={object.type}
                    onInputChangeHandler={onInputChangeHandler}
                    buttons={button}
                    deleteObjects={deleteObjects}
                    choices={choices}
                    deleteDropdownChoices={deleteDropdownChoices}
                    addDropdownChoices={addDropdownChoices}
                    myRef={object.propsRef}
                    isClicked={object.isClicked}
                    objects={objects}
                    setObjects={setObjects}
                    onInputClickHandler={onInputClickHandler}
                />
            )

        }

    }

    return (
        <>
            <div className={classes.propertyHeader}>
                <span>OBJECT PROPERTIES</span>
                <IconButton onClick={handleOpen} className={classes.generateSchemabtn} size="small" >
                        <CodeIcon fontSize="inherit" />
                </IconButton> 
            </div>
            <div className={classes.propertyContainer}>
                {objects.map((object, i) => renderObjects(object, i))}
            </div>
            <Modal
                className={styles.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={styles.paper}>
                    <div style={parent} >
                        <h3>JSON Schema</h3>
                        <div style={{textAlign:'right',width:'63%'}}>
                            <CopyToClipboard text={JSON.stringify(schema,null, 2)}>
                                <IconButton onClick={handleOpen} >
                                    <FileCopyIcon fontSize="small" />
                                </IconButton>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <TextareaAutosize
                    rowsMax={15}
                    defaultValue={JSON.stringify(schema,null, 2)}
                    style={{width:'100%',outline:'none'}}
                    />
                </div>
                </Fade>
            </Modal>
        </>
    )

}

export default Properties