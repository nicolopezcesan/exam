import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const initialStateForm = {
    filename: "",
};

const FormFilter = ({ sendDataFields, removeFilters }) => {
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState(initialStateForm);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setState((prevProps) => ({
            ...prevProps,
            [name]: value.trim()
        }));
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        sendDataFields(state);
    };

    const clearForm = () => {
        removeFilters();
        setState(initialStateForm);
    };

    return (
        <Form noValidate validated={validated}>
            <Row className="mb-2">
                <Form.Group as={Row} md="12">
                    <Form.Label>Filter by:</Form.Label>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Col>
                        <Form.Control
                            className="mb-2"
                            required
                            type="text"
                            name="filename"
                            value={state.filename}
                            placeholder="File Name"
                            defaultValue=""
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col className="mb-1">
                        <Button
                            as="input"
                            type="button"
                            value="Filter"
                            onClick={handleSubmit} />
                        <Button
                            className="m-1"
                            as="input"
                            type="button"
                            value="Clean Filters"
                            onClick={clearForm} />
                    </Col >
                </Form.Group>
            </Row>
        </Form >
    );
}

export default FormFilter;