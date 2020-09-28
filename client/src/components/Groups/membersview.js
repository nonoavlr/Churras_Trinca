import React, { useContext, useEffect, useState } from 'react';
import UseContext from '../../usecontext';
import { Redirect, useLocation } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap'
import './membersview.css'

export default function MembersView(){

    const { user } = useContext(UseContext);
    const { churrasInfo } = useLocation();
    const [ members, setMembers ] = useState();
    const [ redirect, setRedirect ] = useState();
    const [ name, setName ] = useState();
    const [ amount, setAmonut ] = useState(10);
    const [ paid, setPaid ] = useState(false);

    //Fetch global
    function fetchData(path, body){

        fetch(path, {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'jwt' : `${user.token}`,
                'email' : `${user.user}`,
                'churrasid' : `${churrasInfo.id}`
            },
            body : JSON.stringify(body)
        })
        .then(res => res.json())
        .then(setMembers)
    }

    //Validar sessão, caso negativo, redireciona para o login.
    function validSession(){

        if(!user){

            return setRedirect(true);
        }
        else{
            // console.log('fetch')
            return fetchData('/members', user)
        }

    };

    useEffect(
        () => validSession(), []
    )

    //Função para alterar confirmação de pagamento
    function alterPaid(id, e){

        const member = members.members.find(m => m._id === id);

        member.paid = e;

        fetchData('/members/update', member);
    }

    //Função para adicionar novos participantes.
    function addMember(e){
        e.preventDefault();

        const newMember = ({ name : name, amount : amount, paid : paid });
        fetchData('/members/create', newMember)
    }

    //Função para remover participantes
    function removeMember(id){

        const removeMember = members.members.find(m => m._id === id);

        fetchData('/members/remove', removeMember)
    }

    //Função para somar o total arrecadado, somando apenas quem pagou.
    const toReduce = () => {

        const membersPaid = members.members.filter(m => m.paid === true);

        if(membersPaid.length > 1){

            const soma = membersPaid.reduce((a, b) => a.amount + b.amount);

            return soma

        }
        if(membersPaid.length == 1){

            return membersPaid[0].amount
        }
        else{

            return 0
        }
    }

    //Renderização dos componentes
    const renderMembers = () => {
        return(
            <div>
                <div>{churrasInfo.title}</div>
                <div>{churrasInfo.date}</div>
                <div>Participantes: {members.members.length}</div>
                <div>Total R$ {toReduce()}</div>
                {
                    members.members.map(item => {
                        return(
                            <ListGroup  id='items' horizontal className="my-2">

                                <ListGroup.Item>{item.name}</ListGroup.Item>
                                <ListGroup.Item>R${item.amount ?? 0 }</ListGroup.Item>
                                <ListGroup.Item>
                                    <input type='checkbox' defaultChecked={item.paid} onClick={e => alterPaid(item._id, e.target.checked) }/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <input type='button' value='Remover' onClick={e => removeMember(item._id)}/>
                                </ListGroup.Item>
                            </ListGroup>
                        )
                    })
                }
                <form onSubmit={e => addMember(e)}>
                    <input type='text' placeholder='Digite um nome' onChange={e => setName(e.target.value)}/>
                    <input type='number' defaultChecked={amount} inputMode='decimal' step="0.01" placeholder='Valor' onChange={e => setAmonut(e.target.value)}/>
                    <input type='checkbox' defaultChecked={false} onChange={e => setPaid(e.target.checked)}/>
                    <input type='submit' value='Adicionar'/>
                </form>
            </div>
        )
    }

    //Condições de renderização
    function renderConditions(){

        if(redirect){
            return <Redirect to='/'/>;
        }
        if(members){
            return renderMembers();
        }
    }

    //Renderização
    return(
        <div>
            {
                renderConditions() ?? <img src='./35.gif' alt='loading'/>
            }
        </div>
    )
}