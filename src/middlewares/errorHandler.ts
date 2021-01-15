import type { Request, Response } from 'express';

interface HttpException {
  status?: number;
  message?: string;
}

export default function errorHandler(error: HttpException, _: Request, res: Response): void {
  res.status(error?.status ?? 500).send({
    error: {
      status: error?.status ?? 500,
      message: error?.message ?? 'Internal Server Error'
    }
  });
}