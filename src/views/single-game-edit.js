import React, {useEffect, useState, useContext, useHistory} from "react"
import { useParams} from "react-router-dom"
import Axios from "axios"
import { UserContext } from '../context/context'



const SGameEdit = ()=>{
  const [user] = useContext(UserContext)
  let {id} = useParams()
  const [data, setData] = useState(null)
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
    name: "",
    genre:"",
    singlePlayer: "",
    multiplayer: "",
    platform: "",
    release: "",
  })
  const [selectedId, setSelectedId]  =  useState(0)  
  const [statusForm, setStatusForm]  =  useState("create")  


  useEffect(() => {
    if (data === null){
      Axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
      .then(res => {
        setInput(res.data)
        console.log(res.data)
      })
    }
  }, [data, setData, id]);

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

  const handleEditForm = (e) => {
    e.preventDefault()

      Axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
        name: input.name,
        genre: input.genre,
        singlePlayer: input.singlePlayer,
        multiplayer: input.multiplayer,
        platform: input.platform,
        release: input.release,
        image_url: input.image_url
      },
      { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => {
          console.log(res)
      })
    

    setStatusForm("create")
    setSelectedId(0)
    setInput({
        name: "",
        genre: "",
        singlePlayer: "",
        multiplayer: "",
        platform: "",
        release: "",
        image_url: ""
      })
  }

  return (
    <>
       <div className="container">
            <div className="content">
                <h1>Form Submit New Movie</h1>
                <form className="form-input" onSubmit={handleEditForm}>
                <div className="input">
                    <label >
                    Name:
                    </label>
                    <input type="text" name="name" value={input.name} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input">
                    <label >
                    Genre:
                    </label>
                    <textarea type="text" name="genre" value={input.genre} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    singlePlayer:
                    </label>
                    <input type="text" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    Multiplayer:
                    </label>
                    <input type="text" name="multiplayer" value={input.multiplayer} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    Platform:
                    </label>
                    <input type="text" name="platform" value={input.platform} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    Release:
                    </label>
                    <input type="text" name="release" value={input.release} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    Image Url:
                    </label>
                    <input type="text" cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="submit">
                <button>submit</button>
                </div>
                </form>
            </div>
        </div>
    </>
   
  )
}

export default SGameEdit
