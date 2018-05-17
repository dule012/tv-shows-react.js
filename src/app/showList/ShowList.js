import React from 'react'
import ShowCard from '../showCard/ShowCard.js'

const ShowList = (props) => {
    return (
        <div className="container">
            <div className="row">
               { props.value.map((el,i) => {
                    return <ShowCard id={el.id} image={el.image.medium} name={el.name} summary={el.summary} key={i} />
                })}
            </div>
        </div>
    )
}

export default ShowList