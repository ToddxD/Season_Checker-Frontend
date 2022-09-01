import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

function BasicExample() {

    const[name, setName]=useState('')
    const[passwort, setPasswort]=useState('')
    const[eintrage, setEintrage]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const eintrage={name}
        console.log(eintrage)
        fetch("http://localhost:8080/demo/add?name=" + name, {
            method:"GET",
        }).then(()=> {
            console.log("neu erstellt")
        })
    }

    useEffect(()=> {
            fetch("http://localhost:8080/demo/all")
            .then(res=>res.json())
            .then((result)=>{
                setEintrage(result);
            })
        }, [])

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name: </Form.Label> 
        <Form.Control type="text" placeholder="Enter name" 
        value={name}
        onChange={(e)=>setName(e.target.value)}
         /> <br/>
      </Form.Group><br/>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" placeholder="Password" /> <br/>
      </Form.Group>
      <br/>
      <Button variant="primary" type="submit" onClick={handleClick} >
        Submit
      </Button>
      <br/>
      <ListGroup>
        {eintrage.map(eintrage=>(
            <ListGroup.Item key={eintrage.id}>
                <p> </p>
                Id: {eintrage.id} <br/>
                Name: {eintrage.name}
            </ListGroup.Item>
        ))}
    </ListGroup>
    </Form>
  );
}

export default BasicExample;