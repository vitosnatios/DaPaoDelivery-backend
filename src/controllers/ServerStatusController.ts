import { Request, Response } from 'express';

export default class ServerStatusController {
  public getServerStatus(req: Request, res: Response) {
    res.status(200).json({ message: 'server ok' });
  }
}
