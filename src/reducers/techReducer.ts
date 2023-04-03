import {
  ADD_TECH,
  DELETE_TECH,
  GET_TECHS,
  SET_LOADING,
  TECHS_ERROR,
} from '../actions/types';
import { Technicians } from '../interfaces/interfaces';

const initialState = {
  techs: [],
  loading: false,
  error: '',
};

type TechState = {
  techs: Technicians[];
  loading: boolean;
  error: string;
};

export default (state: TechState = initialState, action: any) => {
  switch (action.type) {
    // Fetch all technicians
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false,
      };
    // Add new technician
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false,
      };
    // Filter deleted tech from logs
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(({ id }) => id !== action.payload),
        loading: false,
      };
    // Loading for action dispatchers
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    // Error handling for action dispatchers
    case TECHS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
