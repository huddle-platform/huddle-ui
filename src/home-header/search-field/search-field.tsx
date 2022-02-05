import './search-field.css'
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRef, useState } from 'react';


const SearchField : React.FC<{onChange : (searchString: string) => void}> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const[searchText, setSearchText] = useState("");

    const onSearchInput = (event: React.ChangeEvent<HTMLInputElement> ) => {
        //console.log("called " + event.target.value);
        setSearchText(event.target.value);
        props.onChange(event.target.value);
    }
    
    return (
        <div >
            <div className="searchFieldContainer">
                <span className="searchField" >
                    <SearchIcon className="searchIcon"></SearchIcon>
                    <input 
                        ref={inputRef}
                        placeholder="Search" 
                        onChange={onSearchInput}
                    ></input>
                    <button onClick={(e) => {}}>
                        <ArrowForwardIcon className="arrowIcon"></ArrowForwardIcon>
                    </button>
                </span>
            </div>
        </div>
    )
}

export default SearchField;

