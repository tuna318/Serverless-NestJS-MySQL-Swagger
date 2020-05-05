import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';;
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { INestApplication } from '@nestjs/common';

let cachedServer: Server;

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Nest Example')
    .setDescription('Some api examples ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  setupSwagger(app);
  
  app.enableCors();
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (event.path === '/docs') {
    event.path = '/docs/';
  }
  event.path = event.path.includes('swagger-ui') ? `/docs${event.path}` : event.path;

  if (!cachedServer) {
    const server = await bootstrapServer();
    cachedServer = server;
    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
  } else {
    return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE').promise;
  }
};
