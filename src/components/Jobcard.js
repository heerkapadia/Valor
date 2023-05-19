import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Jobcard(props){
    return(
        <Card style={{ border: '3px solid black',
        width: '18rem',
        padding: '10px',
        borderRadius: '25px' ,
        marginTop: '10px'
        }}>

        <Card.Img variant="top" src="/img/army.cms" style={{borderRadius: '25px' }} />
        <Card.Body>
          <Card.Title>{props.company}</Card.Title>
          <Card.Text>
            
          </Card.Text>
          {props.date}
          <br></br>
          {props.location}
          <Button variant="primary">{props.location}</Button>
        </Card.Body>
      </Card>
    )
}





 
