import express from 'express';
import apiRoute from '../routes/api.route';

const routeService = (app: express.Application) => {
  app.use('/api/v1', apiRoute)
}

export default routeService;