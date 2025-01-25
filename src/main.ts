import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rateLimit } from 'express-rate-limit';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Слишком много запросов с этого IP, попробуйте снова позже.",
});

// Apply rate limiting middleware to the Express server
server.use(limiter);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: ['http://crypta.space'],
    methods: 'GET,POST',
    credentials: true,
  });

  await app.init(); // Initialize the NestJS application
}

// Export the serverless handler
export const handler = async (req: any, res: any) => {
  if (!server.listening) {
    await bootstrap(); // Bootstrap the app once for serverless
  }
  server(req, res); // Delegate the request to the Express server
};
