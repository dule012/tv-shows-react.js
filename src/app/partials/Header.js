import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FetchShows } from '../../services/FetchShows'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            filterData: [],
            value: ''
        }
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        FetchShows().then((response) => {
            this.setState({
                data: response
            })
        })
    }

    search(event) {
        this.setState({
            value: event.target.value,
            filterData: this.state.data.filter((el)=>{
                return el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
            })
        })
    }


    render() {
        return (
            <header className="container-fluid">
                <div className="row">
                    <Link to="/"><p className="col-sm-offset-1 col-sm-2">BIT Show</p></Link>
                    <div className="col-sm-offset-6 col-sm-2">
                        <input type="text" name="search" onChange={this.search} placeholder="Search" />
                        <ul className="searchUl">
                            { (this.state.filterData.length === 0) || (this.state.value === '') ? '' : this.state.filterData.slice(0,10).map((el, i) => {
                                return <li  className="searchLi" key={i}><Link to={`/InfoPage/${el.id}`}>{el.name}</Link></li>
                            })}
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header