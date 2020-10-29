import { Col, Row, Typography } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const { Title } = Typography;

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [
                {
                    id: 0,
                    title: "",
                    description: "",
                    year: 0,
                    duration: 0,
                    genre: "",
                    rating: 8,
                    review: null,
                    image_url: ""
                }
            ],
            
            game: [
                {
                    id:0,
                    name:"",
                    genre:"",
                    singlePlayer:0,
                    multiplayer:0,
                    platform:"",
                    release:""
                }
            ]
        };
    }

    componentDidMount() {
        axios.get('https://backendexample.sanbersy.com/api/data-movie')
            .then(response => {
                this.setState({
                    movie: response.data
                })
            })

            axios.get('https://backendexample.sanbersy.com/api/data-game')
            .then(response => {
                this.setState({
                    game: response.data
                })
            })
    }

    render() {
        return (
        <div className="content">
            <Row>
                <Col span={24}>
                    <Title level={2}>Movies List</Title>
                </Col>
                <Col span={24}>
                    &nbsp;
                </Col>
                {this.state.movie.map((m, index) => {
                    return (
                        <div key={m.id}>
                            <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="image" src={m.image_url} />}
                            >
                            <Meta title={m.title}/>
                            </Card>      
                        </div>      
                        
                    )
                })}
            <Col span={24}>
                <Title level={2}>Games List</Title>
            </Col>
            <Col span={24}>
                &nbsp;
            </Col>
            {this.state.game.map((x, index) => {
                return (
                    <div key={x.id}>
                        <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="image" src={x.image_url} />}
                        >
                        <Meta title={x.name}/>
                        </Card>      
                    </div>      
                    
                )
            })}
        </Row>
    </div>
        );
    }
}

export default HomeView;
