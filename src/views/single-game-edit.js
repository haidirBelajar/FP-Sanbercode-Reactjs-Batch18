import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Label } from "reactstrap";
import Axios from "axios"
import { UserContext } from '../context/context'




const SGameEdit = ()=>{
  const [form] = Form.useForm();
  const [formLayout] = useState("horizontal");
  const [user] = useContext(UserContext)
  let {id} = useParams()
  const [data, setData] = useState(null)
   const [games,setGames] = useState(null)
    const [input,setInput] = useState({
       name: "",
       genre:"",
       singlePlayer: 0,
       multiplayer: 0,
       platform: "",
       release: "",
    })
  const history = useHistory();


  useEffect(() => {
    if (data === null) {
      Axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`).then(
        (res) => {
          form.setFieldsValue(res.data);
          setInput(res.data)
          console.log(res.data)
        }
      );
    }
  }, [data, setData, id]);

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

    console.log(values, "berhasil update");
    const url = `https://backendexample.sanbersy.com/api/data-game/${id}`;

    Axios.put(url, newData, {
      headers: { Authorization: `Bearer ${user.token}` },
    }).then((res) => {
      alert("Berhasil Update Data");
      history.push("/games");
      console.log(res.data);
    });
  };

  return (
    <Container>
      <Row>
        <Col md="8" className="mx-auto mt-5">
          <Form className="form-input"
          layout={formLayout}
          form={form}
          initialValues={{
           layout: formLayout,
           }}
            onFinish={handleSubmit}
          >
            <Form.Item className="input" label="Name" name="name">
              <Input placeholder="input Name" />
            </Form.Item>
            <Form.Item className="input" label="Genre" name="genre">
              <Input placeholder="input Genre" />
            </Form.Item>
            <Form.Item className="input" name="mode">
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
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SGameEdit
