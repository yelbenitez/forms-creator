import React, {useEffect} from 'react';


const TextAreaUI = ({id,text,type,objectClick,myRef}) => {

    const scrollToRef = (ref) => {
        console.log(ref)
        if(ref.current !== null){
            
            ref.current.scrollIntoView({ 
                behavior: "smooth"
            })
        } 
    };

    const useMountEffect = (fun) => useEffect(fun, []); 

    useMountEffect(() => scrollToRef(myRef)) 

    let style = {
        fontWeight:'normal'
    }

    if(type == "Header"){
        style = {
            fontWeight: 'bold'
        }
    }

    return (
        <div onClick={()=>{objectClick(id); scrollToRef(myRef)}}>
            <span style={style}>{text}</span>
        </div>
    )
}

export default TextAreaUI;