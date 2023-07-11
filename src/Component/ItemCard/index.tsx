import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import goldStar from "../../images/goldStar.png"
import whiteStar from "../../images/whiteStar.png"
import "./style.css"

type ItemCardProps = {
    cardData: any;
    index: number
}

function ItemCard({ cardData, index }: ItemCardProps) {
    const navigate = useNavigate();

    const [isFavourite, setIsfavourite] = useState(() => {
        let favourites = JSON.parse(localStorage.getItem("favouriteItem") || '[]') || []
        return favourites.some((el: { imdbID: number | string }) => el.imdbID === cardData?.imdbID)
    })
    const handleMarkFavourite = () => {
        let favourites = JSON.parse(localStorage.getItem("favouriteItem") || '[]') || []
        if (favourites.some((el: { imdbID: number | string }) => el.imdbID === cardData?.imdbID)) {
            favourites = favourites.filter((el: { imdbID: number | string }) => el.imdbID !== cardData?.imdbID)
            localStorage.setItem("favouriteItem", JSON.stringify(favourites))
            setIsfavourite(false)
        } else {
            favourites?.push(cardData)
            localStorage.setItem("favouriteItem", JSON.stringify(favourites))
            setIsfavourite(true)
        }
    }

    const handleShowClick = () => {
        navigate(`/showDetails/${cardData?.imdbID}`)
    }

    return (
        <div className='itemcardContainer' key={cardData?.Title}>
            <div><img onClick={handleShowClick} width={145} height={225} src={cardData?.Poster} alt='Poster' /></div>
            <div className='cardTitle'>{cardData?.Title}</div>
            <div className='cardYear'>Year: {cardData?.Year}</div>
            <div onClick={handleMarkFavourite} className='favourite'>
                <img className='starIcon' src={isFavourite ? goldStar : whiteStar} alt='favourite' />Favourite
            </div>
        </div>
    );
}

export default ItemCard;