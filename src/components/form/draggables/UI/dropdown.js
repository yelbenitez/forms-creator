import React, {useEffect} from 'react';
import classes from '../../../../assets/adaptiveCards.module.css';

const DropdownUI = ({id,choices,objectClick,myRef}) => {

    let defaultValue = "Text Placeholder"

    if(choices.length !== 0){
        defaultValue = choices[0].title;
    }

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
            <select 
                className={[classes.acinput,classes.acmultichoiceInput,classes.acchoiceSetInputcompact ].join(' ')}
                style={{width:'100%'}}
            >
                <option 
                   disabled
                   selected
                   aria-current={true}
                >{defaultValue}</option>
                {choices.map((choice) =>{
                    return (<option 
                        value={choice.title}
                    >{choice.title}</option>)
                })}
            </select>
        </div>
    )
}

export default DropdownUI;