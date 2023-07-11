import React, { useState } from 'react';
import "./style.css"
import ArrowDown from "../../images/arrowDown.png"

type SearchBarProps = {
    searchText: string;
    handleSearchText: (event: any) => void;
    itemType: { id: number | string, text: string };
    setItemType: (data: { id: number | string, text: string }) => void
}

const contentType = [
    { id: 0, text: "All" },
    { id: 1, text: "Movies" },
    { id: 2, text: "Series" },
    { id: 3, text: "Episodes" }
]

function SearchBar({ searchText, handleSearchText, itemType, setItemType }: SearchBarProps) {
    const [dropDownBoxStatus, setDropDownBoxStatus] = useState(false)

    const handleDropDownBox = () => {
        setDropDownBoxStatus((prevState) => !prevState)
    }

    const handleSearchChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
        debounce(() => { handleSearchText(event?.target?.value) }, 500)

    }

    const debounce = (() => {
        let timeOutVal: any = null
        return function (cb: any, time = 200) {
            if (timeOutVal) {
                clearTimeout(timeOutVal)
            }
            timeOutVal = setTimeout(cb, time)
        }
    })()

    return (
        <div className='searchBoxContainer'>
            <div className='searchInputContainer'>
                {dropDownBoxStatus ? <ul onClick={handleDropDownBox} className='dropDownBox'>
                    {contentType?.map(el => <li onClick={() => { setItemType(el) }} key={el?.id}>{el.text}</li>)}
                </ul> : null}
                <div><input onChange={handleSearchChange} data-testid='searchInput' type="text" /></div>
                <div onClick={handleDropDownBox} className='dropDownbutton'>{itemType?.text}
                    <span><img width={10} height={10} src={ArrowDown} alt="Arrow Down" />
                    </span>
                </div></div>
            <div><button className='searchButton'>Search</button></div>
        </div>
    );
}

export default SearchBar;