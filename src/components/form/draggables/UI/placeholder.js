import React, {useRef} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import classes from '../../form.module.css';

import TextArea from './objects/textArea';
import Input from './objects/input';
import Dropdown from './objects/dropdown';
// import Dropdown from './controls/dropdown';

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

const Placeholder = ({text,objects,setObjects}) => {

    let ref = useRef(null)

    let style = {
        border: '2px dashed #D3D3D3',
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#A9A9A9',
        borderRadius: '5px',
        position: 'absolute',
        width: '375px',
        marginTop: '24px'
    }

    let button = {
        textAlign: "center"
    }

    const modalClasses = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const addObject = (item) => {
        const { length } = objects;
        const id = length + 1;

        console.log(item.text)

        let body = {
            id: id,
            text: item.text,
            type: item.type,
            propsRef: ref
        }

        if(item.type === "Input.ChoiceSet"){
            body["choices"] = item.choices
            body["value"] = item.choices[0].title
          }

          setObjects(
            update(objects, {$splice: [[objects.length-2,0,body]]})
        )
    }

    return (
        <div>
            <div style={style}>
                <br></br>
                <p>
                    {text}
                </p>
            </div>
            <div style={button}>
                <IconButton onClick={handleOpen} style={{backgroundColor:'#D3D3D3',border:'1px solid D3D3D3'}} aria-label="delete">
                    <AddIcon />
                </IconButton>
            </div>
            <Modal
                className={modalClasses.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={modalClasses.paper}>
                    <div className={classes.modalHeader}>
                        SELECT OBJECT
                    </div>
                    <TextArea handleClose={handleClose} addObject={addObject} ></TextArea>
                    <Input handleClose={handleClose} addObject={addObject} ></Input>
                    <Dropdown handleClose={handleClose} addObject={addObject} ></Dropdown>
                    
                    {/* <TextArea handleClose={handleClose} addObject={addObject} ></TextArea> */}
                    {/* <Input handleClose={handleClose} addObject={addObject} styles={styles}></Input> */}
                    {/* <Dropdown handleClose={handleClose} addObject={addObject} ></Dropdown> */}
                </div>
                </Fade>
            </Modal>
        </div>
       
    )

}

export default Placeholder;