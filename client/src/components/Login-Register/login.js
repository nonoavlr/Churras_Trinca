import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom'
import UseContext from '../../usecontext';
import './login.css';


export default function Login(){

    const { user, setUser } = useContext(UseContext);
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ error, setError ] = useState();
    const [ redirect, setRedirect ] = useState();


    //Fetch global
    function fetchData (path, method, token, email, body ){
        fetch(path, {
            method : method,
            headers : {
                'Content-type' : 'application/json',
                'jwt' : `${token}`,
                'email' : `${email}`,
            },
            body : JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => tokenIsValid(res))
    }

    //Autenticação. Toke e e-mail ficam no sessionstorage para login imediato. O token de validade de 7d.
    function tokenIsValid(res){

        if('error' in res){

           return setError( 'Dados incorretos, tente novamente ou se cadastre' );
        }
        if('user' in res){
            const userauth = ({ user : res.user, token : res.token });
            sessionStorage.setItem('user', JSON.stringify(userauth));

            setUser(userauth);
            setRedirect(true);

            return res;
        }
    }

    //Função inicial para tentativa de validação
    function getData(){
        const userData = sessionStorage.getItem('user');

        if(userData){
            const userAuth = JSON.parse(userData);

            return fetchData('/user/auth', 'POST', userAuth.token, userAuth.user);
        }
        else{
            return setRedirect(false);
        }
    }

    useEffect(
        () => getData(), []
    )

    //Submit das informações.
    function submit(e){
        e.preventDefault();

        const login = ({email : email, password : password});

        fetchData('/user/login', 'POST', '', '', login);
    }

    //Modelo do login
    function renderLogin(){
        return(
            <form id='form' onSubmit={e => submit(e)}>
                <label id='email_label'>E-mail</label>
                <input id='email_input' type='text' placeholder='Digite seu e-mail' onChange={e => setEmail(e.target.value)}/>
                <label id='password_label' >Senha</label>
                <input id='password_input'type='text' placeholder='Digite sua senha' onChange={e => setPassword(e.target.value)}/>
                <input id='button_submit' type='submit' value='Entrar'/>
                {
                    redirect ? <Redirect to='/churras'/> : ''
                }
                {
                    error ? <p>{error}</p> : ''
                }
            </form>
        )
    }

    //Renderização condicional, depende da autenticação
    function renderConditions(){

        if(redirect){
           return <Redirect to='/churras'/>
        }
        else{
            return renderLogin();
        }
    }

    return(
        <div id='div_all'>
            <div id='div_form'>
            {
                renderConditions() ?? <img src='./35.gif' alt='loading'/>
            }
            </div>
        </div>
    )
}