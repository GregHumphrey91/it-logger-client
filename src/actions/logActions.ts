// Types used for actions
import axios from 'axios';
import { AppDispatch } from '../store';
import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_LOADING,
  LOGS_ERROR,
  SEARCH_LOGS,
} from './types';
import { AddLogProps, LogProps } from '../components/logs/LogProps';

// Set loading to reducer | dispatch argument not needed
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// Get all logs and dispatch to reducer
export const getLogs =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Set loading for async func
      setLoading();

      // Fetch event logs
      const response = await axios.get('/logs');

      // Dispatch action type and response to logs reducer
      dispatch({
        type: GET_LOGS,
        payload: response.data,
      });
    } catch (error: any) {
      console.log('Error: ', error);
      dispatch({
        type: LOGS_ERROR,
        payload: error,
      });
    }
  };

// Search all logs on the server
export const searchLogs =
  (text: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Set loading for async func
      setLoading();

      // Fetch event logs
      const response = await axios.get(`/logs?q=${text}`);

      // Dispatch action type and response to logs reducer
      dispatch({
        type: SEARCH_LOGS,
        payload: response.data,
      });
    } catch (error: any) {
      console.log('Error: ', error);
      dispatch({
        type: LOGS_ERROR,
        payload: error,
      });
    }
  };

// Add log
export const addLog =
  (log: AddLogProps) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Set loading for async func
      setLoading();

      // Fetch event logs
      const response = await axios.post('/logs', {
        ...log,
      });

      // Dispatch action type and response to logs reducer
      dispatch({
        type: ADD_LOG,
        payload: response.data,
      });
    } catch (error: any) {
      console.log('Error: ', error);
      dispatch({
        type: LOGS_ERROR,
        payload: error,
      });
    }
  };

// Delete log
export const updateLog =
  (log: LogProps) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Set loading for async func
      setLoading();

      // Fetch event logs
      const response = await axios.put(`/logs/${log.id}`, {
        ...log,
      });

      // Dispatch action type and response to logs reducer
      dispatch({
        type: UPDATE_LOG,
        payload: response.data,
      });
    } catch (error: any) {
      console.log('Error: ', error);
      dispatch({
        type: LOGS_ERROR,
        payload: error,
      });
    }
  };

// Delete log
export const deleteLog =
  (id: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      // Set loading for async func
      setLoading();

      // Fetch event logs
      await axios.delete(`/logs/${id}`);

      // Dispatch action type and response to logs reducer
      dispatch({
        type: DELETE_LOG,
        payload: id,
      });
    } catch (error: any) {
      console.log('Error: ', error);
      dispatch({
        type: LOGS_ERROR,
        payload: error,
      });
    }
  };
