import React, { useEffect, useState } from 'react';
import "./style.css"
import Navbar from '../../Component/Navbar';
import SearchBar from '../../Component/SearchBar';
import ListItem from '../../Component/ListItem';
import { getitemList } from '../../Api';

type HomePageProps = {

}

function HomePage(props: HomePageProps) {
    const [showFavourite, setShowFavourite] = useState<boolean>(false)
    const [dataList, setDataList] = useState<any>([])
    const [totalLength, setTotalLength] = useState(0)
    const [searchText, setSearchText] = useState<string>("")
    const [pageNo, setPageNo] = useState<number>(1)
    const [itemType, setItemType] = useState<{ id: number | string, text: string }>({ id: 0, text: "All" })
    const [loading, setLoading] = useState(false)
    const [pageloading, setPageLoading] = useState(false)

    const handleLoadMore = () => {
        if (totalLength > dataList?.length) {
            setPageNo((prevData) => prevData + 1)
        }
    }

    const fetchData = (isConcat = false) => {
        if (isConcat) {
            setPageLoading(true)
        } else {
            setLoading(true)
        }
        getitemList({ searchText, itemType: itemType?.text, pageNo: isConcat ? pageNo : 1 }).then((res: any) => {
            if (res?.data?.Search?.length) {
                setTotalLength(res?.data?.totalResults)
                if (isConcat) {
                    setDataList((prevData: any[]) => [...prevData, ...res?.data?.Search])
                } else {
                    setDataList([...res?.data?.Search])
                }

            }
            setLoading(false)
            setPageLoading(false)
        }).catch(() => { setLoading(false); setPageLoading(false) })
    }
    useEffect(() => {
        setPageNo(1)
        fetchData(false)
    }, [searchText, itemType])
    useEffect(() => {
        fetchData(true)
    }, [pageNo])
    const getDataListUI = () => {
        let favouriteList = JSON.parse(localStorage.getItem("favouriteItem") || '[]') || []
        if (showFavourite) {
            if (showFavourite && !favouriteList?.length) {
                return <div className='textBox'>
                    You haven't added any moview or web series as favourite
                </div>
            }
            return <ListItem data={favouriteList} />

        }
        if (loading) {
            return <div className='textBox'>Loading...</div>
        }
        else if (!loading && searchText && !dataList.length) {
            return <div className='textBox'>No result found</div>
        }
        else if (!loading && !searchText) {
            return <div className='textBox'>
                Search for you favourite movie and web series
            </div>
        } else if (dataList?.length) {
            return <><ListItem data={dataList} />
                {pageloading ? <div className='paeLaoding'>Loading...</div> : null}
                <div onClick={handleLoadMore} className='loadMoreButton'>
                    Load More
                </div></>
        }
        return <div className='textBox'>
            Error occured please reload the page
        </div>

    }
    return (
        <div className='container' data-testid='homePage'>
            <Navbar isHome setShowFavourite={setShowFavourite} />
            <SearchBar itemType={itemType} setItemType={setItemType} searchText={searchText} handleSearchText={setSearchText} />
            {getDataListUI()}
        </div>
    );
}

export default HomePage;