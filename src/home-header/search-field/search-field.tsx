import './search-field.css'
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRef } from 'react';


const SearchField: React.FC<{ onChange?: (searchString: string) => void, style?: React.CSSProperties }> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null)


    const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange?.(event.target.value);
    }

    return (
        <div className="searchFieldContainer" style={props.style}>
            <span className="searchField" >
                <SearchIcon className="searchIcon"></SearchIcon>
                <input
                    ref={inputRef}
                    placeholder="Project Title"
                    onChange={onSearchInput}
                ></input>
                <button onClick={(e) => { }}>
                    <ArrowForwardIcon className="arrowIcon"></ArrowForwardIcon>
                </button>
            </span>
        </div>
    )
}

export default SearchField;

