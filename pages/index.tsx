import { useState }  from 'react'
import type { NextPage } from 'next'
import { ToastContainer, Toast, Button, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import MainForm from './components/MainForm';
import { Alarm, Bell, Bag } from 'react-bootstrap-icons';

// New type
interface notificaton {
  icon:string,
  title:string,
  time:string,
  body:string,
  show:boolean
}

// Create the Ntfy component
const Ntfy = (props:{show:boolean,icon:object,fcn:(a:number)=>{},title:string,time:string,body:string,idx:number}) => 
    <>
      <Toast className="bg-white" show={ props.show } onClose={ () => {props.fcn(props.idx) } } delay={ 10000 } autohide>
      <Toast.Header>
        <>
          { (props.icon.toString()==="1")? <Alarm /> : (props.icon.toString()==="2")? <Bell /> : <Bag /> }
        <strong className="mx-auto">{props.title}</strong><small className="text-muted">{props.time}</small>
        </>
        </Toast.Header>
      <Toast.Body>{props.body}</Toast.Body>
      </Toast>
    </>

const Home: NextPage = () => {

  // Add a new notify
  const addNtfy = (e:notificaton) => {
    e.show = true;
    setNtfy([...listNtfy, e]);
  }

  // List of notifies
  const [listNtfy, setNtfy] = useState<notificaton>([]);
  const autoHide = (key:number) => { 
    // Set visibility of Ntfy to hidden
    listNtfy.filter((x,i) => i === key)[0].show = false;
    // Apply the change
    setNtfy([...listNtfy]);
    // Check all notifications is hide (if yes, reset the list)
    if (listNtfy.every(v => v.show === false)) setNtfy([]);
  }
 
  return (
    <>
    <MainForm fcn={ addNtfy } />
    <ToastContainer style={{ position: 'fixed', bottom: '60px', right: '10px', zIndex: '1000'}}>
     { listNtfy.map( (x,i) => <Ntfy show={ x.show } icon={ x.icon } title={ x.title } time={ x.time } body={ x.body } key={ i } idx={ i } fcn={ autoHide } /> )}
    </ToastContainer>
    </>
  )
}

export default Home
