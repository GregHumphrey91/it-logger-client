import { LogProps } from '../components/logs/LogProps';
import {
  GET_LOGS,
  ADD_LOG,
  UPDATE_LOG,
  DELETE_LOG,
  SEARCH_LOGS,
  LOGS_ERROR,
  SET_LOADING,
} from '../actions/types';

const initialState = {
  logs: [],
  loading: false,
  error: null,
};

export interface initialLogsInterface {
  logs: LogProps[];
  loading: boolean;
  error: {} | null;
}

// eslint-disable-next-line default-param-last
export default (state: initialLogsInterface = initialState, action: any) => {
  switch (action.type) {
    // Fetch all logs
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };

    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    // Display existing logs with new entry
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false,
      };
    // Update an existing log
    case UPDATE_LOG:
      return {
        ...state,
        // Return new log state with existing array objects
        logs: state.logs.map((previousState) =>
          previousState.id === action.payload.id
            ? action.payload
            : previousState,
        ),
        loading: false,
      };
    // Filter deleted entry from logs
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(({ id }) => id !== action.payload),
        loading: false,
      };
    // Loading for action dispatchers
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    // Error handling for action dispatchers
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
