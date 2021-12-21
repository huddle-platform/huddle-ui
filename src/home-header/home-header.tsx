import './home-header.css'
import React, { useRef, useLayoutEffect, useState, useEffect  } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';

const CategoryButton = ({category = "", activated = false}) => {
    return (
        <div className={activated ? "home-header-category-button-activated" : "home-header-category-button"}>
            {category}
        </div>
    );
}

const CategoryList = () => {
    return (
        <div className="home-header-category-list">
            <CategoryButton category="All"></CategoryButton>
            <CategoryButton category="Social" activated={true}></CategoryButton>
            <CategoryButton category="Tinker"></CategoryButton>
            <CategoryButton category="Code"></CategoryButton>
            <CategoryButton category="Design"></CategoryButton>
            <CategoryButton category="Sports"></CategoryButton>
            <CategoryButton category="Outdoors"></CategoryButton>
            <CategoryButton category="More"></CategoryButton>
        </div> 
    );
}

const HomeHeader = () => {
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [initVal, setInitVal] = useState(0);
    const [height, setHeight] = useState({});
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const opac = Math.max(1.0 - scrollPosition/200.0, 0.0)
    const rotLogo = scrollPosition;

    return (
        <div className="home-header">
            <img src={"/huddle-logo.png"} className="home-logo-huddle-icon"
                style={{transform: `rotate(${rotLogo}deg)`, opacity: opac}}></img>

            <h1 className="home-header1" style={{opacity: opac}}>Find your next</h1>
            <h1 className="home-header2" style={{opacity: opac}}>student project</h1>
            <button className="home-filter-button">
                <FilterListIcon className="home-filter-icon" ></FilterListIcon>
                <span className="home-filter-button-text">Filter</span>
            </button>
            <CategoryList></CategoryList>
        </div>
    );
}

export default HomeHeader;
