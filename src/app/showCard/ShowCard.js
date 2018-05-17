import React from 'react'
import {Link} from 'react-router-dom'

const ShowCard = (props) => {
    return (
        <Link to={`/InfoPage/${props.id}`}>
        <div className=" col-sm-6 col-md-4" >
            <img style={{width: '100%'}}  src={props.image} alt={props.name} />
                <p className="text-center">{props.name}</p>
        </div>
        </Link>
    )
}

export default ShowCard