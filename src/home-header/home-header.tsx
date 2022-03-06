import './home-header.css'
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchField from './search-field/search-field';
import useConfig from '../config';
import { useAvailableTagsQuery } from '../schemas';


const CategoryButton = ({ category = "", activated = false, onClick = (() => { return }) }) => {
    return (
        <div className={activated ? "home-header-category-button-activated" : "home-header-category-button"} onClick={onClick}>
            {category}
        </div>
    );
}
function capitalizeFirstLetter(string = "") {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

type CategoryListProps = {
    onCategoryChange?: (newCategory?: string) => void,
    left: number
}
const CategoryList: React.FC<CategoryListProps> = (props) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
    const tagsData = useAvailableTagsQuery()
    const categoriesWithAll = tagsData.data ? ["All", ...tagsData.data.availableTags.map(t => t.name)] : ["All"]
    return (
        <div className="home-header-category-list" style={{
            left: props.left,
            width: `calc(100vw - ${props.left + 10}px)`
        }}>
            {categoriesWithAll.map((c, i) => (<CategoryButton category={capitalizeFirstLetter(c)} onClick={() => {
                setSelectedCategoryIndex(i)
                if (c == "All") {
                    props.onCategoryChange?.(undefined)
                } else {
                    props.onCategoryChange?.(c)
                }
            }} activated={i == selectedCategoryIndex} />))}
        </div>
    );
}
type HeaderProps = {
    onCategoryChange?: (newCategory?: string) => void,
    onSearchStringChange?: (newSearch: string) => void
}
const HomeHeaderDesktop: React.FC<HeaderProps> = (props) => {
    const [scrollPercentage, setScrollPercentage] = useState(0)

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPercentage(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const opac = Math.max(1.0 - scrollPercentage, 0.0)
    const rotLogo = scrollPercentage * 100;
    return (
        <div className="home-header">
            <img src={"/ui/huddle-logo.png"} className="home-logo-huddle-icon"
                style={{ transform: `rotate(${rotLogo}deg)`, opacity: opac }}></img>

            <h1 className="home-header1" style={{ opacity: opac }}>Find your next</h1>
            <h1 className="home-header2" style={{ opacity: opac }}>student project</h1>
            <></>
            <button className="home-filter-button">
                <FilterListIcon className="home-filter-icon" ></FilterListIcon>
                <span className="home-filter-button-text">Filter</span>
            </button>

            <SearchField onChange={props.onSearchStringChange} style={{
                bottom: (15 * scrollPercentage + innerHeight * 0.1 * (1 - scrollPercentage)),
                position: "absolute",
                left: 180
            }} />
            <CategoryList onCategoryChange={props.onCategoryChange} left={600} />
        </div>
    );
}

export const HomeHeaderMobile: React.FC<HeaderProps> = props => {
    return (
        <div className='home-header-mobile'>
            <h1>Find your next student project</h1>
            <SearchField onChange={props.onSearchStringChange} />
            <CategoryList onCategoryChange={props.onCategoryChange} left={10} />
        </div>
    )
}

const HomeHeader: React.FC<HeaderProps> = props => {
    const config = useConfig()
    switch (config.view) {
        case 'desktop':
            return <HomeHeaderDesktop {...props} />
        case 'mobile':
            return <HomeHeaderMobile {...props} />
    }
}
export default HomeHeader;
