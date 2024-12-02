import express from 'express';
import "dotenv/config";
import { promises as fs } from 'fs';
import { BTDModel } from '../models/index.js';

//---------------> General utility functions <---------------

//gets a random integer between 0-max
export function getRandomInt(max) {
  return Math.floor(Math.random() * (max+1));
}

export function paginate(result, pageNum, pageLen){
  var page = [];
  for(var i = (pageNum-1)*pageLen; i < Math.min(pageNum*pageLen, result.length); i++){
      page.push(result[i]);
  }
  return page;
}

export async function BATeamExists(teamNum){
  const result = await BTDModel.select(teamNum);
  if(result){
    return true;
  } else {
    return false;
  }
}

export function errorResponse(res, error, funcName){
  const statusCode = error.response ? error.response.status : 500;
  const clientMessage = getClientError(statusCode);
  const errorMessage = error.response ? error.response.data : error.message;

  console.error(`Error from '${funcName}':`, errorMessage);
  return res.status(statusCode).json({ error: clientMessage });
}

export function getClientError(statusCode) {
  switch (statusCode) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Unauthorized access.';
    case 404:
      return 'Resource not found.';
    case 500:
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
}
