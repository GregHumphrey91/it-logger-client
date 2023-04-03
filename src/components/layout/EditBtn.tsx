import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateLog } from '../../actions/logActions';
import { RootState } from '../../store';
import { Technicians } from '../../interfaces/interfaces';
import { showToastMessage } from '../../actions/toastActions';

// Form props
interface FormProps {
  id: number;
  log: string;
  technician: number | string;
  needsAttention: boolean;
}
// Props for error validation
interface FormErrorProps {
  log: { message: string; error: boolean };
  technician: { message: string; error: boolean };
}

// Redux props
type ReduxProps = {
  updateLog: any;
  techs: Technicians[];
  showToastMessage: (message: string) => {};
};

const EditBtn = ({
  log,
  technician,
  needsAttention,
  id,
  updateLog,
  techs,
  showToastMessage,
}: FormProps & ReduxProps) => {
  // Modal state
  const [show, setShow] = useState<boolean>(false);
  // Form Error State
  const [formErrors, setFormErrors] = useState<FormErrorProps>({
    log: { message: '', error: false },
    technician: { message: '', error: false },
  });
  // Form state
  const [state, setState] = useState<FormProps>({
    id,
    log,
    technician,
    needsAttention,
  });
  // Close modal handler
  const handleClose = (): void => {
    setState({ id, log, technician, needsAttention });
    setFormErrors({
      log: { message: '', error: false },
      technician: { message: '', error: false },
    });
    setShow(false);
  };
  // Open modal handler
  const handleShow = (): void => {
    setShow(true);
  };

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
      updateLog({
        id,
        message: state.log,
        attention: state.needsAttention,
        tech: state.technician,
        date: new Date(),
      });
      showToastMessage('Record Successfully Updated!');
      handleClose();
    }
  };

  return (
    <>
      <Button
        className="btn btn-edit"
        variant="outline-success"
        onClick={handleShow}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Existing Log</Modal.Title>
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
// Redux state
const mapStateToProps = (state: RootState) => {
  return {
    techs: state.techReducer.techs,
  };
};
// Dispatch event
const mapDispatchToProps = {
  updateLog,
  showToastMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBtn);
