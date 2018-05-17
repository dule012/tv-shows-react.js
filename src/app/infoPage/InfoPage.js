import React, { Component } from 'react'
import { FetchSingleShow, FetchCasts, FetchSeasons, FetchShows } from '../../services/FetchShows'
import { Link } from 'react-router-dom'


class InfoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSingleShow: [],
            dataCasts: [],
            dataSeasons: [],
            data: [],
            filterData: [],
            value: ''
        }
        this.search = this.search.bind(this)
    }
    componentWillUpdate() {
        document.getElementById('summary').innerHTML = this.state.dataSingleShow.summary

    }

    componentDidMount() {
        FetchSingleShow(this.props.match.params.id).then((response) => {
            this.setState({
                dataSingleShow: response
            })
        })

        FetchSeasons(this.props.match.params.id).then((response) => {
            this.setState({
                dataSeasons: response
            })
        })
        FetchCasts(this.props.match.params.id).then((response) => {
            this.setState({
                dataCasts: response
            })
        })
        FetchShows().then((response) => {
            this.setState({
                data: response
            })
        })
    }
    search(event) {
        this.setState({
            value: event.target.value,
            filterData: this.state.data.filter((el) => {
                return el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
            })
        })
    }
    changeShow = () => {
        setTimeout(() => {
            FetchSingleShow(this.props.match.params.id).then((response) => {
                console.log(this.state.dataSingleShow)
                this.setState({
                    dataSingleShow: response
                })
            })
            FetchSeasons(this.props.match.params.id).then((response) => {
                this.setState({
                    dataSeasons: response
                })
            })
            FetchCasts(this.props.match.params.id).then((response) => {
                this.setState({
                    dataCasts: response
                })
            })
        }, 10)
    }
    
    render() {
        return (
            <React.Fragment>
                <header className="container-fluid">
                    <div className="row">
                        <Link to="/"><p className="col-sm-offset-1 col-sm-2 redirect">BIT Show</p></Link>
                        <div className="col-sm-offset-6 col-sm-2">
                            <input type="text" name="search" onChange={this.search} placeholder="Search" />
                            <ul className="searchUl">
                                {(this.state.filterData.length === 0) || (this.state.value === '') ? '' : this.state.filterData.slice(0, 10).map((el, i) => {
                                    return <Link to={`/InfoPage/${el.id}`} onClick={this.changeShow}><li className="searchLi" key={i}>{el.name}</li></Link>
                                })}
                            </ul>
                        </div>
                    </div>
                </header>
                <div id="infoPage" className="container">
                    <div className="row">
                        <h1 style={{ margin: 30, fontWeight: 'bold' }} className="col-sm-12 text-center">{this.state.dataSingleShow.name}</h1>
                        <div className="col-sm-offset-3 col-sm-3">
                            <img style={{ widht: 500, height: 500 }} src={this.state.dataSingleShow.image} alt={this.state.dataSingleShow.name} />
                        </div>
                        <div className="col-sm-offset-1 col-sm-3">
                            <h3 style={{ fontWeight: 'bold' }} className="text-left">Seasons ({this.state.dataSeasons.length}) </h3>
                            <ul>
                                {this.state.dataSeasons.map((el, i) => <li key={i}>{`${el.premiereDate} - ${el.endDate}`}</li>)}
                            </ul>
                            <h3 style={{ fontWeight: 'bold' }} className="text-left">Casts</h3>
                            <ul>
                                {this.state.dataCasts.map((el, i) => <li key={i}>{el.name}</li>)}
                            </ul>
                        </div>
                        <h3 style={{ fontWeight: 'bold' }} className="col-sm-12 text-left">Show Details</h3>
                        <div style={{ marginBottom: 20 }} className="col-sm-12">
                            <p id="summary"></p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default InfoPage