import { join } from 'path';
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ServeStaticModule } from '@nestjs/serve-static';

import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigutation } from './config/app.config';
import { joiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    //Hacen lo mismo trabajan en conjunto
    ConfigModule.forRoot({
      //si no vien una variable de entorno ques obligatoria
      load: [EnvConfigutation],
      validationSchema: joiValidationSchema,
    }),

    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..','public'), 
    }),
    
    MongooseModule.forRoot(process.env.MONGODB!),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
  exports: [ConfigModule]
})
export class AppModule {

}
