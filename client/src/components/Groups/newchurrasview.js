import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UseContext from '../../usecontext';

export default function NewChurras(){

    const { user } = useContext(UseContext);
    const [ title, setTitle ] = useState();
    const [ datetime , setDate ] = useState();
    const [ triggler , setTriggler ] = useState();
    const [ error, setError ] = useState();

    function postChurras(churras){

        fetch('/churras/create', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'jwt' : `${user.token}`,
                'email' : `${user.user}`
            },
            body : JSON.stringify(churras)
        })
        .then(res => res.json())
        .then(res => setTriggler(res))
    }

    const createChurras = (e) => {
        e.preventDefault()

        if(title && datetime){

            const churras = ({ title : title, date : datetime });

            postChurras(churras);

        }else{

            setError('Todos os campos precisam ser preenchidos')

        }
        
    }

    const redirect = () => {
        return <Redirect to='/churras'/>
    }


    return(
        <div>
            <form onSubmit={e => createChurras(e)}>
                <label>Título</label>
                <input type='text' onChange={e => setTitle(e.target.value)}/>
                <label>Data do Churras</label>
                <input type='datetime-local' onChange={e => setDate(e.target.value)}/>
                <input type='submit'/>
            </form>
            {
                triggler ? redirect() : ''
            }
            {
                error
            }
        </div>
    )
}