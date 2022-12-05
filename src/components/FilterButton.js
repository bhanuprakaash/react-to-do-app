import React from "react";
export default function FilterButton(props){
    return(
        <button
        className="filter-button"
        aria-pressed={props.isPressed}
        onClick={()=>props.setFilter(props.name)}>
            {props.name}
        </button>
    )
}