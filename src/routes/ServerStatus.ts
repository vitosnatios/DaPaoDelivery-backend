import express from 'express';
import ServerStatusController from '../controllers/ServerStatusController';

export default class ServerStatus {
  private router = express.Router();
  private controller = new ServerStatusController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.controller.getServerStatus);
  }

  public getRouter() {
    return this.router;
  }
}
