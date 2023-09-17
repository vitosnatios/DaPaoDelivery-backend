import { Request, Response } from 'express';

export default class Teste {
  index(req: Request, res: Response) {
    res.send('hello world');
  }
}
