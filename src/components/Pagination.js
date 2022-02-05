import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

const Pagination = ({totalNumberOfPokemons,setCurrentPage}) => {
    const {userName,pokemonsPerPage} = useSelector(state => state);
    const dispatch = useDispatch();
    const totalNumberOfPages = Math.ceil(totalNumberOfPokemons / pokemonsPerPage); 
    let pageNumbers = [];

    for (let index = 1; index <= totalNumberOfPages; index++) {
        pageNumbers.push(index);        
    }

    return (
        <ul>
            {pageNumbers?.map((pageNumber) => 
            <li onClick={() => setCurrentPage(pageNumber)} key={pageNumber} style={{display: 'inline', margin: '0px 3px'}}>
                {pageNumber}
            </li>)}
        </ul>
    )
}

export default Pagination;