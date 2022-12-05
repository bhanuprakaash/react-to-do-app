import React from "react";
import '../index.css';
export default function Form(props){

    const [name,setName] = React.useState('');

    function handleChange(e){
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name.trim()){
            return;
        }
        props.addTask(name);
        setName('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2 className="title-head">What do you need to do?</h2>
            <input
                className="input-form"
                value={name}
                onChange={handleChange}
            />
            <button className="input-button" type="submit">Add</button>
        </form>
    )
}