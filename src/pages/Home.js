import { useSelector, useDispatch } from 'react-redux';
import { Link }  from "react-router-dom";
import { useNavigate } from 'react-router';

import Swal from 'sweetalert2';

import useFormulario from '../hooks/useFormulario';

const Home = (props) => {
    const userName = useSelector(state => state.userName);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [formulario, handleChange, reset] = useFormulario({ userName: ''});

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formulario.userName !== "") {
            dispatch({
                type: "@userName/set",
                payload: formulario.userName
            });        
            
            reset();
    
            navigate("/pokedex");
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Important!',
                text: 'You need to provide a username to be able to continue'
            });            
        }
    };

    return (
        <div className="">
            <h2>Home</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userName" value={formulario.userName} onChange={handleChange} />
            </form>   
            <div className=''>
                <Link to="/settings">Settings</Link>
            </div>         
        </div>
    )
};

export default Home;