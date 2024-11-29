import { BTDModel, CTDModel } from '../models/index.js';
import { utils } from '../utils/index.js';
import Joi from 'joi';

//---------------> Basic validation of API inputs <---------------
//Schema validation or basic validation, does not check if input exists in DB

export const teamNum = async (req, res, next) => {
  try {
  const teamNum = req.params.teamNum;
  const { error } = BTDModel.BTDSchema.validate({ team_number: parseInt(teamNum, 10) });
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
  }
  catch (error) {
    utils.errorResponse(res, error, 'validation middleware: teamNum(req, res, next)');
  }
};

export const teamName = async (req, res, next) => {
  try {
    const teamName = req.params.teamName;
    const { error } = BTDModel.BTDSchema.validate({ name: teamName });
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    next();
  } catch (error) {
    utils.errorResponse(res, error, 'validation middleware: teamName(req, res, next)');
  }
};

export const body = async (req, res, next) => {
  try {
    const data = req.body;

    //replace empty/space-only values with `null`
    const sanitizedData = {};
    for (const [key, value] of Object.entries(data)) {
      if(value != undefined) sanitizedData[key] = typeof value === 'string' && value.trim() === '' ? null : value;
    }

    const { error, value } = CTDModel.CTDSchema.validate(sanitizedData, {
      abortEarly: false, // Show all errors
      allowUnknown: false, // Disallow unknown fields
    });

    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(err => err.message),
      });
    }

    req.body = value;
    next();
  } catch (error) {
    utils.errorResponse(res, error, 'validation middleware: body(req, res, next)');
  }
};

export const page = async (req, res, next) => {
  try {
    const pageNum = req.params.pageNum;
    const pageLen = req.params.pageLen;
    
    const pageSchema = Joi.object({
      pageNum: Joi.number().positive().required(),
      pageLen: Joi.number().min(0).required(),
    });

    const { error } = pageSchema.validate({ pageNum: pageNum, pageLen: pageLen });
    if(error){
      return res.status(400).json({ error: error.message });
    }
    
    if(pageLen > 100) {
      req.params.pageLen = 100;
    }

    next();
  } catch (error) {
    utils.errorResponse(res, error, 'validation middleware: page(req, res, next)');
  }
};

export const string = async (req, res, next) => {
  try {
    const str = req.params.string.trim();
    
    const strSchema = Joi.string().min(1).max(100).required();

    const { error } = strSchema.validate(str);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    next();
  } catch (error) {
    utils.errorResponse(res, error, 'validation middleware: string(req, res, next)');
  }
};

export const customField = async (req, res, next) => {
  try {
    const field = req.params.field.trim();
    const fieldSchema = Joi.string().valid('team_number', 'bg_color').required();
    
    const { error } = fieldSchema.validate(field);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    next();
  } catch (error) {
    utils.errorResponse(res, error, 'validation middleware: field(req, res, next)');
  }
};