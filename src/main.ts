import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //"setGlobalPrefix" Esto le dice a Nest que todas las rutas de tu aplicación deben comenzar con ese prefijo.

  app.setGlobalPrefix('api/v2'),

  //Esto validara los DTO´s los nombres si se hace un post revisa los DTO´S si esta mal manda error 400
   app.useGlobalPipes(  
    new ValidationPipe({ 
      whitelist: true, //Estp acepta solo campos que tengamos en los DTO´s
      forbidNonWhitelisted: true, //Mandara error si se añade una propiedad extra de los DTO´S 
  }) 
);

  MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
