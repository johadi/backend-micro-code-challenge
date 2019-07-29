import {Request, Response, NextFunction } from 'express';
import * as createError from 'http-errors';

import { validationResult } from "express-validator";

/**
 * Middleware that adds a new influencer and returns all influencers
 * @function validationErrorsMiddleware
 * @param {object} req - request parameter
 * @param {object} res - response parameter
 * @param {function} next - next parameter
 * @return {any} next invocation result
 */
export const validationErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  // find errors and pass it to the error handler if any
  const createdErrors = !errors.isEmpty() ? createError(422, { errors: errors.array() }) : null;

  return next(createdErrors);
};