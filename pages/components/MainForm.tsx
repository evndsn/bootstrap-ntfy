import { useState }  from 'react'
import { Button, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Alarm, Bell, Bag } from 'react-bootstrap-icons';

const MainForm = (props) => {

    // Notify info
    let [nextNtfy, setNextNtfy] = useState({ 
        icon: null,
        title: '',
        time: '',
        body: '',
        show: true
    });

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
       setNextNtfy({ ...nextNtfy, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // Copy
        event.preventDefault();
        props.fcn(nextNtfy);

    };

    return (
        <Container>
        <Form  className="d-block" style={{ margin: '30vh auto', maxWidth: '600px' }} onSubmit={handleSubmit}>
            <Row>
                <Col md="5">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Control id="title" name="title" placeholder="Place a title" value={ nextNtfy.title } onChange={ handleChange } required/>
                    </Form.Group>
                </Col>
                <Col md="3">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="time">Time</Form.Label>
                        <Form.Control id="time" name="time" placeholder="Place a time" value={ nextNtfy.time } onChange={ handleChange }  required/>
                    </Form.Group>
                </Col>
                <Col md="auto">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="icon">Icon</Form.Label>
                        <fieldset>
                            <Form.Check type="radio" name="icon" onChange={ handleChange } aria-label="radio 1" value={ 1 } checked={ nextNtfy.icon == 1 } label={ <Alarm /> } inline/>
                            <Form.Check type="radio" name="icon" onChange={ handleChange } aria-label="radio 2" value={ 2 } checked={ nextNtfy.icon == 2 } label={ <Bell /> }  inline/>
                            <Form.Check type="radio" name="icon" onChange={ handleChange } aria-label="radio 3" value={ 3 } checked={ nextNtfy.icon == 3 } label={ <Bag /> }  inline/>
                        </fieldset>
                    </Form.Group>
                </Col>
            </Row>
            <InputGroup className="mb-3">
                <InputGroup.Text>Body content</InputGroup.Text>
                <FormControl as="textarea" aria-label="Content" name="body" value={ nextNtfy.body } onChange={ handleChange } required/>
            </InputGroup>
            <InputGroup className="justify-content-end">
                <Button variant="primary" type="submit">Add Ntfy</Button>
            </InputGroup>
      </Form>
    </Container>
)}

export default MainForm