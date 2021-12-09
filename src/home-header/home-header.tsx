import './home-header.css'
import React, { useRef, useLayoutEffect, useState, useEffect  } from "react";
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

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

    const opac = Math.max(1.0 - scrollPosition/100.0, 0.0)

    return (
        <div className="home-header">
            <h1 className="home-header-title">Huddle</h1>
            <h1 className="home-header1" style={{opacity: opac}}>Find your next</h1>
            <h1 className="home-header2" style={{opacity: opac}}>student project {scrollPosition}</h1>
            <p></p>
            <button className="home-filter-button">
                <FilterListIcon className="home-filter-icon"></FilterListIcon>
                <span className="home-filter-button-text">Filter</span>
            </button>
        </div>
    );
}

export default HomeHeader;
