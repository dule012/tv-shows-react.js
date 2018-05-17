import React,{Component} from 'react'
import {FetchShows} from '../../services/FetchShows'
import ShowList from '../showList/ShowList'
import { Link } from 'react-router-dom'

class ShowPage extends Component {
    constructor(props){
        super(props)
        this.state= {
            data: [],
            filterData: [],
            value: '',
            dataSliced: []
        }
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        FetchShows().then((response)=>{
            this.setState({
                dataSliced: response.slice(0,50),
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

    render(){
        return (
            <React.Fragment>
                 <header className="container-fluid">
                <div className="row">
                    <Link to="/"><p className="col-sm-offset-1 col-sm-2 redirect">BIT Show</p></Link>
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
            <ShowList value={this.state.dataSliced}/>
            </React.Fragment>
        )
    }
}

export default ShowPage