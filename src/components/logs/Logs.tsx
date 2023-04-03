import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import LogItem from './LogItem';
import { initialLogsInterface } from '../../reducers/logReducer';
import { getLogs } from '../../actions/logActions';
import Pagination from '../layout/Pagination';

// Create interface for Redux props
interface logReducerProps {
  logReducer: initialLogsInterface;
  getLogs: () => Promise<void>;
}

// Combine component props with redux props;
type Props = logReducerProps & {};

const Logs: React.FC<Props> = ({ logReducer, getLogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { logs, loading } = logReducer;

  // Gets the index of the last user for the current page
  const indexOfLastLog = currentPage * itemsPerPage;

  // Gets the index of first user for the current page
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;

  // List of all current users
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  useEffect(() => {
    getLogs();
  }, []);

  // Return spinner
  if (loading || logs === null) {
    return <Spinner className="loading-spinner" animation="grow" />;
  }

  return (
    <div className="page system-logs">
      {logs && logs?.length === 0 ? (
        <p>No Logs</p>
      ) : (
        <>
          <h1>System Logs</h1>
          <div className="system-logs">
            {currentLogs?.map((log) => (
              <LogItem key={log.id} {...log} />
            ))}
            <Pagination
              totalItems={logs?.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};
// Map redux state to component props
const mapStateToProps = (state: any) => {
  return {
    logReducer: state.logReducer,
  };
};
// Map redux actions to component props
const mapDispatchToProps = {
  getLogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
