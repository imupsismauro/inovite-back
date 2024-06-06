import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as bodyParser from 'body-parser';


async function bootstrap() {
    // Criação da instância do aplicativo
    const app = await NestFactory.create(AppModule);

    // Adicionando pipes globais para validação
    app.useGlobalPipes(new ValidationPipe());

    // Habilitando CORS
    app.enableCors();

    // Configuração do bodyParser com limite de tamanho
    app.use(bodyParser.json({limit: '50gb'}));
    app.use(bodyParser.urlencoded({limit: '50gb', parameterLimit: 20000, extended: true}));

    // Iniciando o servidor na porta definida em APP_PORT
    await app.listen(process.env.APP_PORT);
}

bootstrap();
