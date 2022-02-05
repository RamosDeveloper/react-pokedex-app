import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Settings = () => {
    const {theme,pokemonsPerPage} = useSelector(state => state);
    const dispatch = useDispatch();
    const pokemonPerPageOptions = [4,8,12,16,20];
    const themeOptions = ['light','dark'];
    const [localTheme, setLocalTheme] = useState(theme);
    const [localPokemonsPerPage, setLocalPokemonsPerPage] = useState(pokemonsPerPage);
    let navigate = useNavigate();

    const handleThemeOptionChange = ({target}) => {
        setLocalTheme(target.value);
        dispatch({
            type: "@theme/set",
            payload: target.value
        });
    }

    const handlePokemonsPerPageChange = ({target}) => {
        setLocalPokemonsPerPage(target.value);
        dispatch({
            type: "@pages/setPokemonsPerPage",
            payload: target.value
        });
    };

    return (
        <div className="">
            <h1>Settings</h1>
            <button type="button" onClick={() => navigate(-1) }>Back</button>
            <div className=''>
                <h3>Select theme</h3>
                <select value={localTheme} name="localTheme" onChange={handleThemeOptionChange}>
                        {themeOptions?.map((theme) => <option key={theme} value={theme}>{theme}</option>)}
                </select>                 
            </div>
            <hr/>
            <div className=''>
                <h3>Select how many pokemons per page</h3>
                <select value={localPokemonsPerPage} name="localPokemonsPerPage" onChange={handlePokemonsPerPageChange}>
                        {pokemonPerPageOptions?.map((option) => <option key={option} value={option}>{`${option} pokemons per page`}</option>)}
                </select>                
            </div>
        </div>
    )
}

export default Settings;