import React, { useContext, useEffect, useState } from 'react';
import UseContext from '../../usecontext';
import { Redirect, Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import './churrasview.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChurrasView(){

    const { user } = useContext(UseContext);
    const [ churras, setChurras ] = useState();
    const [ redirect, setRedirect ] = useState();


    //Fetch global
    function fetchData(path, body){

        fetch(path, {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'jwt' : `${user.token}`,
                'email' : `${user.user}`
            },
            body : JSON.stringify(body)
        })
        .then(res => res.json())
        .then(setChurras)
    }

    //Tenta realizar a requisição, caso negativo redireciona pro Login
    function validSession(){

        if(!user){

            return setRedirect(true);
        }
        else{

            return fetchData('/churras', user)
        }

    };

    useEffect(
        () => validSession(), []
    )

    //Função para somar o total arrecadado, somando apenas quem pagou.
    const toReduce = (index) => {

        const membersPaid = churras.churras[index].members.filter(m => m.paid === true)

        if(membersPaid.length > 1){

            const soma = membersPaid.reduce((a, b) => a.amount + b.amount)

            return soma

        }
        if(membersPaid.length == 1){

            return membersPaid[0].amount
        }
        else{

            return 0
        }
    }

    //Função para excluir churrasco
    function deleteChurras(id){
        const churrasDelete = churras.churras.find(c => c._id === id);

        fetchData('/churras/remove', churrasDelete)
    }
    
    //Função para formatar data que vem do banco de dados.
    function convertDate(data){

        const data_array = data.split('-');
        const year = data_array[0]
        const month = data_array[1]
        const day = data_array[2].split(/(..)/g)

        return `${day[1]}/${month}/${year}`

    }

    //Renderização dos componentes.
    const renderChurras = () =>{
        return(
            <div id='churras_div'>
                {
                    churras.churras.map((item, index) => {
                        return( 
                            <Card style={{ width: '25%'}}>
                                <Link to={{ pathname : '/members', churrasInfo : { title : item.title, id : item._id, date : convertDate(item.date) }}}>
                                    <Card.Body>
                                        <Card.Header>{convertDate(item.date)}</Card.Header>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            <div>Total R$ {toReduce(index)}</div>
                                            <div>Participantes {item.members.length}</div>
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                                <Card.Footer>
                                    <Button variant="primary" type='button' onClick={e => deleteChurras(item._id)}>Remover</Button>
                                </Card.Footer>
                            </Card>
                        )
                    })
                } 
                <Card>
                    <Link to='/newchurras'>
                        <Card.Body>
                            <Card.Text>
                                <Button variant="primary" type='button'>Novo Churras</Button>
                            </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
            </div>
        )
    }

    //Condições para renderização
    function renderConditions(){
        
        if(redirect){
            return <Redirect to='/'/>;
        }
        if(churras){
            return renderChurras();
        }
    }

    //Render
    return(
        <div id='div_render'>
           {
               renderConditions() ?? <img src='./35.gif' alt='loading'/>
           }
        </div>
    )
}