import React, {useEffect}  from 'react';
import classes from '../../../../assets/adaptiveCards.module.css';

const InputUI = ({id,text,objectClick,myRef}) => {

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
        <div onClick={()=>{objectClick(id); scrollToRef(myRef)}}>
            <input
                className={[classes.acinput, classes.actextInput].join(' ')}
                style={{width:'100%'}}
                placeholder={text}
            ></input>
        </div>
    )
}

export default InputUI;