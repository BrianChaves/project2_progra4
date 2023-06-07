import React from 'react';
import axios from "axios";
import authHeader from "./auth-header";
import AuthService from './auth-service';

axios.defaults.baseURL = 'http://127.0.0.1:8080/api/';
axios.defaults.headers.common['Authorization'] = authHeader();

const getObjectList = async (path='') => {
    try {
        const response = await axios.get(path);
        AuthService.isJwtValid();
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            if (!AuthService.isJwtValid()){
                AuthService.logout();
                window.location.replace('/index.html?page=login&logout=true&expired=true')
            }
        }
        throw error.response.data;
    }
}

const getObjectDetail = async (path='') => {
    try {
        const response = await axios.get(path);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            if (!AuthService.isJwtValid()){
                AuthService.logout();
                window.location.replace('/index.html?page=login&logout=true&expired=true')
            }
        }
        throw error.response.data;
    }
}

const createObject = async (path='', data={}) => {
    try {
        const response = await axios.post(path, data, {
            [path !== "/vehicle" && 'headers']: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            if (!AuthService.isJwtValid()){
                AuthService.logout();
                window.location.replace('/index.html?page=login&logout=true&expired=true')
            }
        }
        throw error.response.data;
    }
}

const updateObject = async (path='', data={}) => {
    try {
        const response = await axios.put(path, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            if (!AuthService.isJwtValid()){
                AuthService.logout();
                window.location.replace('/index.html?page=login&logout=true&expired=true')
            }
        }
        throw error.response.data;
    }
}

const deleteObject = async (path='') => {
    try {
        const response = await axios.delete(path);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            if (!AuthService.isJwtValid()){
                AuthService.logout();
                window.location.replace('/index.html?page=login&logout=true&expired=true')
            }
        }
        throw error.response.data;
    }
}

const RestService = {
    getObjectList,
    getObjectDetail,
    createObject,
    updateObject,
    deleteObject,
  };
  
export default RestService;