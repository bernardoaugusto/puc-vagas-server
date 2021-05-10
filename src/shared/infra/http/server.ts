import 'reflect-metadata';
import 'dotenv/config';
import { createServer } from 'http';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';

import { Server, Socket } from 'socket.io';

import '@shared/infra/typeorm';
import '@shared/container';
import { container } from 'tsyringe';
import RegisterUserConnected from '@modules/chats/services/RegisterUserConnected';
import routes from './routes';

const app = express();

const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

io.on('connection', async (socket: Socket) => {
  console.log('usuário conectado', socket.id);

  io.emit('connected-user', { id: socket.id });
  // const registerNewUserConnected = container.resolve(RegisterUserConnected);

  // await registerNewUserConnected.execute(
  //   String(socket.handshake.query.id),
  //   socket.id,
  // );
});

io.listen(8000);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('😁👌 Server started on port 3000 😁👌');
});

export default io;
