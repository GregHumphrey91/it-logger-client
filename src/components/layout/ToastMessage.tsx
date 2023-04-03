import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { hideToast } from '../../actions/toastActions';

interface ReduxToastProps {
  showToast: boolean;
  message: string;
  hideToast: () => {};
}

const ToastMessage: React.FC<ReduxToastProps> = ({
  showToast,
  message,
  hideToast,
}) => {
  // Toggle toast display
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        hideToast();
      }, 3000);
    }
  }, [showToast]);
  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast className="toast" show={showToast} delay={3000} autohide animation>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-bell"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
        </svg>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>
          <strong className="toast-txt">{message}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    showToast: state.toastReducer.showToast,
    message: state.toastReducer.message,
  };
};

const mapDispatchToProps = {
  hideToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage);
