import { Response, Request } from "express";
import {StatusCodes} from 'http-status-codes'

export const notFound = (req:Request, res:Response) => res.status(StatusCodes.NOT_FOUND).json('Route does not exist')