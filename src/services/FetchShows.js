import ShowData from '../entities/ShowData'
import SeasonsData from '../entities/SeasonsData'
import CastsData from '../entities/CastsData'

const FetchShows = () => {
    return fetch('http://api.tvmaze.com/shows')
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            return response.map((el) => {
                return new ShowData(el.id, el.image, el.name, el.summary)
            })
        })
}

const FetchSingleShow = (id) => {
    return fetch(`http://api.tvmaze.com/shows/${id}`)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            return new ShowData(response.id, response.image.original, response.name, response.summary)
        })
}

const FetchCasts = (id) => {
    return fetch(`http://api.tvmaze.com/shows/${id}/cast`)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            return response.map((el) => {
                return new CastsData(el.person.name)
            }).slice(0,10)
        })
}

const FetchSeasons = (id) => {
    return fetch(`http://api.tvmaze.com/shows/${id}/seasons`)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            return response.map((el)=>{
                return new SeasonsData(el.premiereDate,el.endDate)
            })
        })
}


export {
    FetchShows,
    FetchSingleShow,
    FetchCasts,
    FetchSeasons
}