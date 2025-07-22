import { message } from 'antd';
import axios from 'axios';

export const getAllCars = () => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get('/api/cars/getallcars');
    dispatch({ type: 'GET_ALL_CARS', payload: response.data });
  } catch (error) {
    console.log(error);
  }

  dispatch({ type: 'LOADING', payload: false });
};

export const addCar = (reqObj) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post('/api/cars/addcar', reqObj);
    message.success('New car added successfully');
    setTimeout(() => {
      window.location.href = '/admin';
    }, 500);
  } catch (error) {
    console.log(error);
    message.error('Failed to add car');
  }

  dispatch({ type: 'LOADING', payload: false });
};

export const editCar = (reqObj) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post('/api/cars/editcar', reqObj);
    message.success('Car details updated successfully');
    setTimeout(() => {
      window.location.href = '/admin';
    }, 500);
  } catch (error) {
    console.log(error);
    message.error('Failed to update car');
  }

  dispatch({ type: 'LOADING', payload: false });
};

export const deleteCar = (reqObj) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post('/api/cars/deletecar', reqObj);
    message.success('Car deleted successfully');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    message.error('Failed to delete car');
  }

  dispatch({ type: 'LOADING', payload: false });
};
