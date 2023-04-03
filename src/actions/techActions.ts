// Types used for actions
import axios from 'axios';
import { AppDispatch } from '../store';
import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from './types';
import { AddTechnician } from '../interfaces/interfaces';

// Set loading to reducer | dispatch argument not needed
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// Get all logs and dispatch to reducer
export const getTechs =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Set loading for async func
      setLoading();

      // Fetch event logs
      const response = await axios.get('/techs');

      // Dispatch action type and response to logs reducer
      dispatch({
        type: GET_TECHS,
        payload: response.data,
      });
    } catch (error: any) {
      console.log('Error: ', error);
      dispatch({
        type: TECHS_ERROR,
        payload: error,
      });
    }
  };

// Add log
export const addTech =
  (tech: AddTechnician) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Set loading for async func
      setLoading();

      // Axios post method
      const response = await axios.post('/techs', {
        ...tech,
      });

      // Dispatch action type and response to logs reducer
      dispatch({
        type: ADD_TECH,
        payload: response.data,
      });
    } catch (error: any) {
      console.log('Error: ', error);
      dispatch({
        type: TECHS_ERROR,
        payload: error,
      });
    }
  };

// Delete log
export const deleteTech =
  (id: number | null) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Set loading for async func
      setLoading();

      // Fetch event logs
      await axios.delete(`/techs/${id}`);

      // Dispatch action type and response to logs reducer
      dispatch({
        type: DELETE_TECH,
        payload: id,
      });
    } catch (error: any) {
      console.log('Error: ', error);
      dispatch({
        type: TECHS_ERROR,
        payload: error,
      });
    }
  };
