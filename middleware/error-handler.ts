import { NextFunction, Request, Response } from "express";
import {CustomAPIError} from '../errors/custom-error'
import {StatusCodes} from 'http-status-codes'


export const errorHandlerMiddleware = async(err: Error, req: Request, res: Response, next:NextFunction):Promise<Response> => {
    
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong. Please try again later!')
}