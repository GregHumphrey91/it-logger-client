import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addLog } from '../../actions/logActions';
import { showToastMessage } from '../../actions/toastActions';
import { Technicians } from '../../interfaces/interfaces';
import { RootState } from '../../store';

// Form props
interface FormType {
  log: string;
  technician: string;
  needsAttention: boolean;
}

// Props for error validation
type FormErrorType = {
  log: { message: string; error: boolean };
  technician: { message: string; error: boolean };
};

// Redux dispatch actions
type ReduxProps = {
  techs: Technicians[];
  addLog: any;
  showToastMessage: (message: string) => {};
};

const AddBtn = ({ addLog, techs, showToastMessage }: ReduxProps) => {
  // Modal state
  const [show, setShow] = useState<boolean>(false);
  // Error state
  const [formErrors, setFormErrors] = useState<FormErrorType>({
    log: { message: '', error: false },
    technician: { message: '', error: false },
  });
  // Form state
  const [state, setState] = useState<FormType>({
    log: '',
    technician: '',
    needsAttention: false,
  });

  // On modal close func
  const handleClose = (): void => {
    setState({ log: '', technician: '', needsAttention: false });
    setFormErrors({
      log: { message: '', error: false },
      technician: { message: '', error: false },
    });
    setShow(false);
  };
  // On modal open func
  const handleShow = (): void => setShow(true);

  // Input event handler
  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.currentTarget;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Select event handler
  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event: React.FormEvent<HTMLSelectElement>,
  ): void => {
    const { name, value } = event.currentTarget;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Checkbox event handler
  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const { name, checked } = event.currentTarget;
    setState((prevState) => ({ ...prevState, [name]: checked }));
  };

  // Validate form fields
  const validateForm = () => {
    let errors = 0;
    if (state.log === '') {
      setFormErrors((prevState) => ({
        ...prevState,
        log: { message: 'Please enter a description', error: true },
      }));
      errors += 1;
    }

    if (state.technician === '') {
      setFormErrors((prevState) => ({
        ...prevState,
        technician: { message: 'Please select a technician', error: true },
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
        name === 'technician'
          ? 'Please select a technician'
          : 'Please enter a description';

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

  const onFormSubmission = () => {
    const invalid = validateForm();
    if (!invalid) {
      setFormErrors({
        log: { message: '', error: false },
        technician: { message: '', error: false },
      });
      addLog({
        message: state.log,
        attention: state.needsAttention,
        tech: state.technician,
        date: new Date(),
      });
      showToastMessage('Log Successfully Added');
      handleClose();
    }
  };

  return (
    <>
      <Button
        className="btn btn-add"
        variant="outline-success"
        onClick={handleShow}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-plus-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter System Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Log Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter log information"
                name="log"
                value={state.log}
                onChange={handleFormChange}
                isInvalid={formErrors.log.error}
                onBlur={(event) => handleBlurValidation(event as any)}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.log.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Technician</Form.Label>
              <Form.Select
                aria-label="Select Technician"
                placeholder="Select technician"
                name="technician"
                value={state?.technician}
                onChange={handleSelectChange}
                isInvalid={formErrors.technician.error}
                onBlur={(event) => handleBlurValidation(event as any)}
              >
                <option hidden selected>
                  Select Tech
                </option>
                {techs &&
                  techs.map((tech) => (
                    <option
                      key={tech.id}
                      value={`${tech.firstName} ${tech.lastName}`}
                    >
                      {tech.firstName} {tech.lastName}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.technician.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                checked={state?.needsAttention}
                name="needsAttention"
                label="Needs Attention"
                onChange={handleCheckboxChange}
              />
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

const mapStateToProps = (state: RootState) => {
  return {
    techs: state.techReducer.techs,
  };
};

const mapDispatchToProps = {
  addLog,
  showToastMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBtn);
