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
        fetch("https://seasonchecker.duckdns.org:1444/demo/addEntity/" +name+ "/20122020/20122020/true", {
            method:"GET",
        }).then(()=> {
            console.log("neu erstellt")
        })
    }

    const fetchAllData=()=> {
      fetch("https://seasonchecker.duckdns.org:1444/demo/all")
      .then(res=>res.json())
      .then((result)=>{
          setEintrage(result);
      })
    }

    useEffect(()=> {
      fetchAllData()
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