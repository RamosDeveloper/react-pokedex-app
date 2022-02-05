import { useState, useEffect } from "react";
import { useParams  } from 'react-router';
import { Link }  from "react-router-dom";
import { useNavigate } from 'react-router';

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState(null);
    let navigate = useNavigate();
    const match = useParams();
    const idOrName = match.idOrName;

    useEffect(() => {
        setPokemonAsync(idOrName);
    },[]);

    const fetchPokemonData = async (idOrName) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);  
        
        if(response.status != 200) {
           return navigate("/pokedex");
        }
        
        const data = await response.json();

        return data;
    };

    const setPokemonAsync = async (idOrName) => {
        var data = await fetchPokemonData(idOrName);

        setPokemon(data);
    }

    if(pokemon == null) return null;

    
    return (
        <div className=""> 
            <div className="">
                <Link to="/pokedex">Back</Link>
            </div>          
            <div className="">
                <img src={pokemon.sprites.front_default} alt={pokemon.id} />
                <h3>{pokemon.name}</h3>                       
            </div>
        </div>
    )
}

export default PokemonDetail;