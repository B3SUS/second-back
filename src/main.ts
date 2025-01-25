import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Слишком много запросов с этого IP, попробуйте снова позже.",
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://crypta.space'],
    methods: 'GET,POST',
    credentials: true,
  });

  app.use(limiter)

  await app.listen(3001);
}
bootstrap();
