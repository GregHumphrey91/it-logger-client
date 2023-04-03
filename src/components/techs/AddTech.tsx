import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { addTech } from '../../actions/techActions';
import { showToastMessage } from '../../actions/toastActions';

import { Technicians } from '../../interfaces/interfaces';

// Props for error validation
interface FormErrorProps {
  firstName: { message: string; error: boolean };
  lastName: { message: string; error: boolean };
}

type ReduxTech = {
  addTech: (tech: any) => {};
  showToastMessage: (message: string) => {};
};

const AddTech: React.FC<ReduxTech> = ({ addTech, showToastMessage }) => {
  const [state, setState] = useState<Technicians>({
    id: null,
    firstName: '',
    lastName: '',
  });
  const [show, setShow] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrorProps>({
    firstName: { message: '', error: false },
    lastName: { message: '', error: false },
  });

  // Close modal handler
  const handleClose = (): void => {
    setState({ firstName: '', lastName: '', id: null });
    setFormErrors({
      firstName: { message: '', error: false },
      lastName: { message: '', error: false },
    });
    setShow(false);
  };
  // Open modal handler
  const handleShow = (): void => setShow(true);

  // Input event handler
  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.currentTarget;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Validate form fields
  const validateForm = () => {
    let errors = 0;
    if (state.firstName === '') {
      setFormErrors((prevState) => ({
        ...prevState,
        firstName: { message: 'Please enter first name', error: true },
      }));
      errors += 1;
    }

    if (state.lastName === '') {
      setFormErrors((prevState) => ({
        ...prevState,
        lastName: { message: 'Please select last name', error: true },
      }));
      errors += 1;
    }
    if (errors) {
      return true;
    }
    return false;
  };

  const handleBlurValidation = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.currentTarget;
    if (value === '') {
      const message =
        name === 'firstName'
          ? 'Please enter first name'
          : 'Please enter last name';

      setFormErrors((prevState) => ({
        ...prevState,
        [name]: { error: true, message },
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: { error: false, message: '' },
      }));
    }
  };

  const onFormSubmission = async () => {
    try {
      const invalid = validateForm();
      if (!invalid) {
        console.log('Valid Form: ', state);
        await addTech(state);
        showToastMessage('User Successfully Added');
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        className="btn btn-add-user"
        variant="outline-success"
        onClick={handleShow}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-person-plus-fill"
          viewBox="0 0 16 16"
        >
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path
            fillRule="evenodd"
            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
          />
        </svg>
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tech</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={state.firstName}
                onChange={handleFormChange}
                isInvalid={formErrors.firstName.error}
                onBlur={(event) => handleBlurValidation(event as any)}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.firstName.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={state.lastName}
                onChange={handleFormChange}
                isInvalid={formErrors.lastName.error}
                onBlur={(event) => handleBlurValidation(event as any)}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.lastName.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={onFormSubmission}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(null, { addTech, showToastMessage })(AddTech);
