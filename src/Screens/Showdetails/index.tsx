import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./style.css"
import { getitemDetails } from '../../Api';
import Navbar from '../../Component/Navbar';

type showDetailsProps = {

}

function ShowDetails(props: showDetailsProps) {
    const param = useParams()
    const [data, getData] = useState<any>({})

    const fetchDetails = () => {
        getitemDetails(param?.id).then((res) => { getData(res?.data) })
    }

    useEffect(() => { fetchDetails() }, [])
    if (!data?.Title) {
        return <div data-testid='showDetails' className='container'><div className='LoadingText'>Loading...</div></div>
    }
    return (<div data-testid='showDetails' className='container'>
        <Navbar />
        <div className='detailsContainer'>

            <div>
                <img width={540} height={580} className='posterImage' src={data?.Poster} alt="poster" />
            </div>
            <div className='showDetialsRightContainer'>
                <div className='showTitle'>{data?.Title}</div>
                {data?.Type ? <div className='movieDetailsText'>
                    <strong>Type of Show: </strong>{data?.Type}
                </div> : null}
                {data?.Actors ? <div className='movieDetailsText'>
                    <strong>Actors: </strong>{data?.Actors}
                </div> : null}
                {data?.Awards ? <div className='movieDetailsText'>
                    <strong>Awards: </strong>{data?.Awards}
                </div> : null}
                {data?.BoxOffice ? <div className='movieDetailsText'>
                    <strong>BoxOffice: </strong>{data?.BoxOffice}
                </div> : null}
                <div className='movieDetailsText'>
                    <strong>Country: </strong>{data?.Country}
                </div>
                {data?.Director && data?.Director !== 'N/A' ? <div className='movieDetailsText'>
                    <strong>Director: </strong>{data?.Director}
                </div> : null}
                {<div className='movieDetailsText'>
                    <strong>Genre: </strong>{data?.Genre}
                </div>}
                <div className='movieDetailsText'>
                    <strong>Rating: </strong>{data?.Ratings[0]?.Value}
                </div>
                <div className='movieDetailsText'>
                    <strong>Year: </strong>{data?.Year}
                </div>
                {data?.Plot ? <div className='movieDetailsText'>
                    <strong>Plot: </strong>{data?.Plot}
                </div> : null}

            </div>
        </div>
    </div>
    );
}

export default ShowDetails;