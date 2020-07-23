import React, {useEffect} from 'react';
import classes from '../../../../assets/adaptiveCards.module.css';


const ButtonUI = ({id,buttons,myRef,objectClick}) => {

    const scrollToRef = (ref) => {
        if(ref.current !== null){
            ref.current.scrollIntoView({ 
                behavior: "smooth"
            })
        } 
    };

    const useMountEffect = (fun) => useEffect(fun, []); 

    useMountEffect(() => scrollToRef(myRef)) 

    return (
        <div onClick={()=>objectClick(id)}>
            <div style={{paddingTop:'5px',paddingBottom:'5px'}}>
                <button
                    onClick={()=>scrollToRef(myRef)}
                    className={[classes.acpushButton, classes.styleDefault].join(' ')}
                    style={{width:'100%'}}
                >
                    {buttons[0].text}
                </button>
            </div>
            <div style={{paddingTop:'5px',paddingBottom:'5px'}}>
                <button
                    className={[classes.acpushButton, classes.styleDefault].join(' ')}
                    style={{width:'100%'}}
                >
                    {buttons[1].text}
                </button>
            </div>
        </div>
    )
}

export default ButtonUI;
