import { useState, useEffect } from "react";
import { Link }  from "react-router-dom";

const PokemonSummary = ({url}) => {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        setPokemonAsync(url);
    },[]);

    const fetchPokemonData = async (url) => {
        const response = await fetch(url);  
        const data = await response.json();

        return data;
    };

    const setPokemonAsync = async (url) => {
        var data = await fetchPokemonData(url);

        setPokemon(data);
    }

    if(pokemon == null) return null;

    return (
        <li>
            <Link to={`/pokedex/${pokemon.id}`}>
                <img src={pokemon.sprites.front_default} alt={pokemon.id} />
            </Link>            
        </li>
    )
}

export default PokemonSummary;