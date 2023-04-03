import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Button } from 'react-bootstrap';
import EditBtn from '../layout/EditBtn';
import { LogProps } from './LogProps';
import { deleteLog } from '../../actions/logActions';
import { showToastMessage } from '../../actions/toastActions';

type ReduxProps = {
  deleteLog: any;
  showToastMessage: (message: string) => {};
};

const LogItem: React.FC<LogProps & ReduxProps> = ({
  message,
  attention,
  tech,
  date,
  id,
  deleteLog,
  showToastMessage,
}) => {
  const onDelete = () => {
    deleteLog(id);
    showToastMessage('Record Sucessfully Deleted!');
  };
  return (
    <Card className="log-item" border={attention ? 'danger' : ''}>
      <Card.Body>
        <Card.Title className="log-title">{message}</Card.Title>
        <Card.Subtitle>
          {attention && <span className="attention">Needs Attention</span>}
        </Card.Subtitle>
        <Card.Subtitle>
          {date && (
            <span className="">
              {moment(date).format('MMM do YYYY H:MM A')}
            </span>
          )}
        </Card.Subtitle>
        <Card.Text>last updated by {tech}</Card.Text>
        <EditBtn
          log={message}
          needsAttention={attention}
          technician={tech}
          id={id}
        />
        <Button className="btn btn-delete" onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
      </Card.Body>
    </Card>
  );
};

export default connect(null, { deleteLog, showToastMessage })(LogItem);
