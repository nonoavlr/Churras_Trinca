import { Card } from 'react-bootstrap'

{
    churras.churras.map((item, index) => {
        return(
            <div key={index}>
                <Link to={{ pathname : '/members', churrasInfo : { title : item.title, id : item._id, date : item.date }}}>
                    <div>
                        <div>{item.title}</div>
                        <div>{item.date}</div>
                        <div>R$ {toReduce(index)}</div>
                        <div>{item.members.length}</div>
                    </div>
                </Link>
                <button type='button' onClick={e => deleteChurras(item._id)}>Excluir</button>
            </div>
        )
    })  
}