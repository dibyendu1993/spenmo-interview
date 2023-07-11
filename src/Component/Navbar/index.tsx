import React from 'react';
import { useNavigate } from "react-router-dom";

import "./style.css"

type NavbarProps = {
    setShowFavourite?: (status: boolean) => void,
    isHome?: boolean
}

function Navbar({ setShowFavourite = () => { }, isHome = false }: NavbarProps) {
    const navigate = useNavigate();
    const handleOMDBClick = () => {
        if (isHome) { setShowFavourite(false) }
        else {
            navigate("/")
        }
    }

    const handleFavouriteClick = () => {
        isHome && setShowFavourite(false)
    }

    return (
        <div className='navbarCotainer'>
            <div onClick={handleOMDBClick} className='navbarTitle'>OMDB</div>
            {isHome ? <div onClick={handleFavouriteClick} className='navbarFavourites'>Favourites</div> : null}
        </div>
    );
}

export default Navbar;