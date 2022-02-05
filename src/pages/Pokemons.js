import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link }  from "react-router-dom";

import Swal from 'sweetalert2';

import useFormulario from '../hooks/useFormulario';

import PokemonSummary from '../components/PokemonSummary';
import Pagination from "../components/Pagination";

const Pokemons = (props) => {
    const {userName,pokemonsPerPage} = useSelector(state => state);
    const [pokemonTypeNames, setPokemonTypeNames] = useState([]);
    const [pokemonURLs, setPokemonURLs] = useState([]);
    const [totalNumberOfPokemons, setTotalNumberOfPokemons] = useState(0);
    const [formulario, handleChange, reset] = useFormulario({ search: ''});
    const [pokemonTypeName, setPokemonTypeName] = useState('all');    
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * pokemonsPerPage; 
    const firstIndex = lastIndex - pokemonsPerPage; 

    let navigate = useNavigate();

    useEffect(() => {
        setPokemonTypeNamesAsync();       
    },[]);  

    useEffect(() => {
        if(pokemonTypeName == 'all') {
            setPokemonURLsAsync(firstIndex,pokemonsPerPage);
        }else {
            setPokemonURLsByTypeNameAsync(pokemonTypeName,firstIndex,lastIndex);
        } 
    },[pokemonTypeName,currentPage,pokemonsPerPage])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formulario.search !== "") {
            if(isNaN(formulario.search)) {
                navigate(`/pokedex/${formulario.search.toLowerCase()}`);
            }else {
                navigate(`/pokedex/${formulario.search}`);
            }            
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Important!',
                text: 'You to type either the id or the name of the pokemon to search'
            }); 
        }

        reset();
    };

    const handleSelectChange = ({target}) => {
        setPokemonTypeName(target.value);
        setPokemonURLsByTypeNameAsync(target.value,firstIndex,lastIndex);
    }

    const setPokemonTypeNamesAsync = async () => {
        var data = await fetchPokemonTypes();

        setPokemonTypeNames(data);
    }

    const setPokemonURLsAsync = async (offset,limit) => {
        const data = await fetchPokemonURLsWithPagination(offset,limit);

        setPokemonURLs(data);
    }

    const setPokemonURLsByTypeNameAsync = async (typeName,offset,limit) => {
        const data = await fetchPokemonURLsByTypeNameWithPagination(typeName,offset,limit);

        setPokemonURLs(data);
    }

    const fetchPokemonTypes = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/type/`);  
        const data = await response.json();
        const names = ['all'];

        return names.concat(data.results.map((t) => t.name));    
    }

    const fetchPokemonURLsWithPagination = async (offset,limit) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);  
        const data = await response.json();

        await setTotalNumberOfPokemons(data.count);
        
        return data.results.map((p) => p.url);        
    };

    const fetchPokemonURLsByTypeNameWithPagination = async (typeName,offset,limit) => {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);  
        const data = await response.json();
        const pokemons = data.pokemon.map((p) => p.pokemon);

        await setTotalNumberOfPokemons(data.pokemon.length -1);
        
        return pokemons.map((p) => p.url).slice(offset,limit);
    };
          
    return (
        <div className="">
            <div className="">
                Welcome <strong>{userName}</strong>
            </div>
            <div className="">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="search" value={formulario.search} onChange={handleChange} />

                    <select value={pokemonTypeName} name="pokemonTypeName" onChange={handleSelectChange}>
                        {pokemonTypeNames?.map((name) => <option key={name} value={name}>{name}</option>)}
                    </select>
                </form>
            </div>
            <hr/>
            <div className=''>
                <Link to="/settings">Settings</Link>
            </div>             
            <div className="">
                <ul>
                    {pokemonURLs?.map((url) => <PokemonSummary key={url} url={url} />)}
                </ul>
            </div>
            <div className="">
                <Pagination totalNumberOfPokemons={totalNumberOfPokemons} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

export default Pokemons;