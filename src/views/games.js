import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Table, Button, Typography, Space } from "antd";
import { Form, Input, Checkbox, InputNumber } from "antd";
import { Container, Row, Col, Label } from "reactstrap";
import { UserContext } from '../context/context'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import edit from '../icon/edit.svg'
import view from '../icon/view.svg'
import del from '../icon/delete.svg'

const GameList = () => {
    const [user] = useContext(UserContext)
    const [games,setGames] = useState(null)
    const [input,setInput] = useState({
       name: "",
       genre:"",
       singlePlayer: 0,
       multiplayer: 0,
       platform: "",
       release: "",
    })
    const [selectedId, setSelectedId]  =  useState(0)
    const [statusForm, setStatusForm]  =  useState("create")
    const [search, setSearch] = useState("")
    useEffect( () => {
        if (games === null){
            Axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                setGames(res.data.map(el=>{ return {
                  id: el.id, 
                  name: el.name, 
                  genre: el.genre,
                  singlePlayer: el.singlePlayer,
                  multiplayer: el.multiplayer,
                  platform: el.platform,
                  release: el.release,
                  image_url: el.image_url
                }
              }))
            })
          }
        }, [games])
    
    const handleChange = (event) =>{
      let typeOfInput = event.target.name
  
      switch (typeOfInput){
        case "name":
        {
          setInput({...input, name: event.target.value});
          break
        }
        case "genre":
        {
          setInput({...input, genre: event.target.value});
          break
        }
        case "singlePlayer":
        {
          setInput({...input, singlePlayer: event.target.value});
            break
        }
        case "multiplayer":
        {
          setInput({...input, multiplayer: event.target.value});
            break
        }
        case "platform":
          {
            setInput({...input, platform: event.target.value});
              break
          }
        case "release":
          {
            setInput({...input, release: event.target.value});
              break
          }
        case "image_url":
          {
            setInput({...input, image_url: event.target.value});
              break
          }
      default:
        {break;}
      }
    }
  
    const handleSubmit = (values) => {
      let singlePlayer = values.mode.includes("one") ? 1 : 0;
      let multiPlayer = values.mode.includes("two") ? 1 : 0;
  
      const newData = {
        name: values.name,
        genre: values.genre,
        singlePlayer: singlePlayer,
        multiplayer: multiPlayer,
        platform: values.platform,
        release: values.release,
        image_url: values.image_url,
      };
      console.log(newData, " cek values");
  
      const url = `https://backendexample.sanbersy.com/api/data-game`;
      Axios.post(url, newData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((res) => {
          alert("Data Berhasil Masuk");
          console.log(res.response);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
  
      const handleDelete = (e) => {  
        const id = e.target.id
        const url = `https://backendexample.sanbersy.com/api/data-game/${id}`;
       
        Axios.delete(url, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }).then(res =>{
          console.log(res)
          setGames(null)
        })
        .catch((err)=>{
          console.log(err)
        });
        
      }
      
      const handleEdit = (e) =>{
        let singleGames = games.find(x=> x.id === e.id)
        setInput({
          name: singleGames.name,
          genre: singleGames.genre,
          singlePlayer: singleGames.singlePlayer,
          multiplayer: singleGames.multiplayer,
          platform: singleGames.platform,
          release: singleGames.release,
          image_url: singleGames.image_url
        })
        setSelectedId(e.id)
        setStatusForm("edit")
      }

      const handleVIew = (e) => {
        let gamesSingle = games.filter(el => el.id !== e.id)
        Axios.get(`https://www.backendexample.sanbersy.com/api/games/${e.id}`).then(res => {
          console.log(res.data)
        })
        setGames([...gamesSingle])
      }
  
  
    function truncateString(str, num) {
      if (str === null){
        return ""
      }else{
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    }
    
  
    const submitSearch = (e) =>{
      e.preventDefault()
      Axios.get(`https://backendexample.sanbersy.com/api/data-game`)
      .then(res => {
        let resMovies = res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            genre: el.genre,
            singlePlayer: el.year,
            multiplayer: el.multiplayer,
            platform: el.platform,
            rating: el.rating,
            image_url: el.image_url
          }
        })
  
        let filteredGames = resMovies.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        setGames([...filteredGames])
      })
   
    }
  
    const handleChangeSearch = (e)=>{
      setSearch(e.target.value)
    }
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "title",
        width: 200,
        
      },
      {
        title: "Genre",
        dataIndex: "genre",
        key: "genre",
      },
      {
        title: "Singleplayer",
        dataIndex: "singlePlayer",
        key: "singlePlayer",
        tableLayout: "auto",
        filters: [
          {text: "Yes", value: 1},
          {text: "No", value: 0}
        ],
        onFilter: (value, record) => record.multiplayer === value,
      },
      {
        title: "Multiplayer",
        dataIndex: "multiplayer",
        key: "multiplayer",
        tableLayout: "auto",
        filters: [
          {text: "Yes", value: 1},
          {text: "No", value: 0}
        ],
        onFilter: (value, record) => record.multiplayer === value,
      },
      {
        title: "Platform",
        dataIndex: "platform",
        key: "platform",
      },
      {
        title: "Release",
        dataIndex: "release",
        key: "release",
        tableLayout: "auto",
        sorter: {
          compare: (a, b) => a.release - b.release,
        },
      },
      {
        title: "Action",
        key: "action",
        render: (e) => (
          <Space size="middle">
            <Link to={`games/${e.id}`} >
            <img className="icon" alt="view" src={view} />
            </Link>

            <Link to={`games/edit/${e.id}`}>
              <img className="icon" alt="edit" src={edit} />
            </Link>
          
            <Link to="games" id={e.id}  title="Delete">
              <a id={e.id} onClick={handleDelete}>
               <img className="icon" alt="delete" src={del} />
              </a>
            </Link>
          </Space>
        ),
        width: 200,
      },
  ]
  
    return(
      <>
      <div className="container">     
        <div className="content mleft">
            <h1>Daftar Games</h1>
            <form className="form-search fsgame" onSubmit={submitSearch}>
            <input type="text" value={search} onChange={handleChangeSearch} />
            <button>search</button>
            </form>
            <Table columns={columns} dataSource={games}  />
        </div>
            <div className="content">
                <h1>Form Submit New Games</h1>
                <Container>
      <Row>
        <Col md="8" className="mx-auto mt-5">
          <Form
            className="form-input"
            onFinish={handleSubmit}
          >
            <Form.Item className="input" label="Name" name="name">
              <Input placeholder="input Name" />
            </Form.Item>
            <Form.Item className="input" label="Genre" name="genre">
              <Input placeholder="input Genre" />
            </Form.Item>
            <Form.Item name="mode" className="input">
              <Checkbox.Group style={{ width: "100%" }}>
                <Row className="sp-mp">
                  <Col span={8}>
                    <Label>SinglePlayer : </Label>
                    <Checkbox value="one" />
                  </Col>
                  <Col span={8}>
                    <Label>MultiPlayer : </Label>
                    <Checkbox value="two" />
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item className="input" label="Platform" name="platform">
              <Input placeholder="input Platform" />
            </Form.Item>
            <Form.Item className="input" label="Release" name="release">
              <Input placeholder="input Release" />
            </Form.Item>
            <Form.Item className="input" label="Image_Url" name="image_url">
              <Input placeholder="input Image_Url" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="primary mb-2">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
            </div>
          </div>
      </>
    )
}
export default GameList