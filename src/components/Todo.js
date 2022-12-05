import React from 'react';



export default function Todo(props){
    
    const [isEditing,setEditing] = React.useState(false);
    const [newName,setNewName] = React.useState('');

    function handleChange(e){
        setNewName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!newName.trim()){
            return;
        }
        props.editTask(props.id,newName);
        setNewName("");
        setEditing(false);
    }
    const editingTemplate =(
        <form onSubmit={handleSubmit}>
            <label>
                New Name for {props.name}
            </label>
            <input
            id={props.id}
            type="text"
            value={newName}
            autoFocus
            onChange={handleChange}/>
            <div className='button-grp'>
                <button onClick={()=>setEditing(false)}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    )

    const viewTemplate = (
        <div>
            <div>
                <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={()=>props.toggleTaskCompleted(props.id)}/>
                <label>
                    {props.name}
                </label>
            </div>
            <div>
                <button 
                onClick={()=>setEditing(true)}>
                    Edit
                </button>
                <button 
                onClick={()=>props.deleteTask(props.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
    
    return <li>{isEditing?editingTemplate:viewTemplate}</li>;

}