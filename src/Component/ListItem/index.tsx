import React from 'react';
import './style.css'
import ItemCard from '../ItemCard';

type ListItemProps = {
    data: any
}

function ListItem({ data }: ListItemProps) {
    return (
        <div className='cardContainer'>
            {data?.map((cardData: any, index: number) => <ItemCard key={cardData?.Title} cardData={cardData} index={index} />)}
        </div>
    );
}

export default ListItem;