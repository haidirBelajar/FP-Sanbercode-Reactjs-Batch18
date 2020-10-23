import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Axios from 'axios'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../App.css'
  import { OrderList } from 'primereact/orderlist';

class HomeView extends React.Component {

    state = {
        movie: [],
        games: []
    }
 
    componentDidMount(){
        Axios.get('https://backendexample.sanbersy.com/api/data-movie').then(res=>{
             this.setState({movie: res.data})   
        })
        Axios.get('https://backendexample.sanbersy.com/api/data-game').then(res=>{
            this.setState({games: res.data})
       })
    }
    
    itemTemplate(movie) {
        return (
          
                    <div className="product-item">
                        <div className="image-container">
                            <img src={movie.image_url}  alt="image" />
                        </div>
                        <div className="product-list-detail">
                            <h5 className="p-mb-2">{movie.title}</h5>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{movie.genre}</span>
                        </div>
                        <div className="product-list-action">
                            <h6 className="p-mb-2">{movie.release}</h6>
                        </div>
                    </div>
        );
    }

    itemTemplateGames(games) {
        return (
             <div className="product-item">
                        <div className="image-container">
                            <img src={games.image_url}  alt="image" />
                        </div>
                        <div className="product-list-detail">
                            <h5 className="p-mb-2">{games.name}</h5>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{games.genre}</span>
                        </div>
                        <div className="product-list-action">
                            <h6 className="p-mb-2">{games.rating}</h6>
                        </div>
                    </div>
        );
    }

    render(){
        return(
        <div className="container">
            <div className="title">
                <h1>Selamat Datang Di Comoy Rental</h1>
            </div>
            <div className="isi-home">
                <div className="content-home">
                    <div className="orderlist-demo">
                        <div className="card">
                            <OrderList value={this.state.movie} header="Daftar Film" dragdrop listStyle={{height:'auto'}} dataKey="id"
                            itemTemplate={this.itemTemplate} onChange={(e) => this.setState({ movie: e.value })}></OrderList>
                        </div>
                    </div>
                </div>
                <div className="content-home">
                    <div className="orderlist-demo">
                        <div className="card">
                            <OrderList value={this.state.games} header="Daftar Game" dragdrop listStyle={{height:'auto'}} dataKey="id"
                            itemTemplate={this.itemTemplateGames} onChange={(e) => this.setState({ games: e.value })}></OrderList>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
        )
    }
}

export default HomeView