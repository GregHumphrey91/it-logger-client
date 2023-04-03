import React, { useState } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import { searchLogs } from '../../actions/logActions';

type ReduxProps = {
  searchLogs: any;
};

const NavigationMenu = ({ searchLogs }: ReduxProps) => {
  const [state, setState] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // On input change
  const eventHandler = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    const { value } = event.target as HTMLInputElement;
    setState(value);
  };

  const validateInput = (value: string): void => {
    // Regular expression to match valid email format
    const alphaNum = /^[\w]+([-_\s]{1}[a-z0-9]+)*$/i;
    setIsValid(alphaNum.test(value));
    setErrorMessage('alphanumeric characters only');
  };

  // On blur event handler
  const handleBlur = (event: React.SyntheticEvent<EventTarget>): void => {
    // Get the value from the input field
    const { value } = event.target as HTMLInputElement;
    validateInput(value);
  };

  // On form submit handler
  const handleFormSubmit = (): void => {
    validateInput(state);
    if (isValid) {
      searchLogs(state);
      setState('');
    }
  };

  return (
    <Container className="nav-container" fluid>
      <Navbar className="nav-bar" bg="light" expand="lg">
        <Navbar.Brand href="#home">IT Logger</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={eventHandler}
              value={state}
              onBlur={handleBlur}
              isInvalid={!isValid && state !== ''}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errorMessage}
            </Form.Control.Feedback>

            <Button
              variant="outline-success"
              onClick={handleFormSubmit}
              disabled={state === '' || !isValid}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default connect(null, { searchLogs })(NavigationMenu);
