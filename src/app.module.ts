import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EscuelaModule } from './escuela/escuela.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    'type': 'mysql',
    'host': 'localhost',
    'port': 3306,
    'username': 'root',
    'password': '2830Dev',
    'database': 'db_colegio',
    'entities': [__dirname + '/**/**/**.entity{.ts,.js}'],
    'synchronize': true //modo desarrollador.
  }), CiudadModule, ProfesorModule, EscuelaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
