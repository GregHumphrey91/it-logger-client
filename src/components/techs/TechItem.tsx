import React from 'react';

import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteTech } from '../../actions/techActions';
import { showToastMessage } from '../../actions/toastActions';
import { Technicians } from '../../interfaces/interfaces';

type TechProps = {
  deleteTech: (id: number | null) => Promise<void>;
  handleClose: () => void;
  showToastMessage: typeof showToastMessage;
};

const TechItem: React.FC<Technicians & TechProps> = ({
  id,
  firstName,
  lastName,
  deleteTech,
  handleClose,
  showToastMessage,
}) => {
  const deleteTechnician = () => {
    deleteTech(id);
    showToastMessage('User Successfully Deleted');
    handleClose();
  };
  return (
    <li className="tech">
      {/* <h6>{id}</h6> */}
      <strong>
        {firstName} {lastName}
      </strong>
      <Button className="btn btn-tech-delete" onClick={deleteTechnician}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </Button>
    </li>
  );
};

export default connect(null, { deleteTech, showToastMessage })(TechItem);
