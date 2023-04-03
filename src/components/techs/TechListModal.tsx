import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { getTechs } from '../../actions/techActions';
import { Technicians } from '../../interfaces/interfaces';
import TechItem from './TechItem';

interface TechActions {
  techs: Technicians[];
  loading: boolean;
  getTechs: () => {};
}

const TechListModal: React.FC<TechActions> = ({ techs, loading, getTechs }) => {
  const [show, setShow] = useState<boolean>(false);

  // Modal close func
  const handleClose = (): void => {
    setShow(false);
  };
  // Modal open func
  const handleShow = (): void => setShow(true);

  // Fetch technicians
  useEffect(() => {
    getTechs();
  }, []);

  // Return spinner
  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <div className="">
      <Button
        className="btn btn-add"
        variant="outline-primary"
        onClick={handleShow}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-person-lines-fill"
          viewBox="0 0 16 16"
        >
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
        </svg>
      </Button>

      <Modal className="tech-modal" size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Technician List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {techs.length === 0 ? (
            'No Technicians'
          ) : (
            <ul className="tech-list">
              {techs.map((tech) => (
                <TechItem key={tech.id} {...tech} handleClose={handleClose} />
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    techs: state.techReducer.techs,
    loading: state.techReducer.loading,
  };
};
const mapDispatchToProps = {
  getTechs,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechListModal);
