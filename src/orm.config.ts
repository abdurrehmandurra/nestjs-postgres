// import { ConfigService } from '@nestjs/config';
// import { Call } from './twilio/entity/call.entity';
// import { TypeOrmOptionsFactory } from '@nestjs/typeorm';

// export const ormConfig = (configService: ConfigService): Promise<TypeOrmOptionsFactory> => {
//   return {
//     type: 'postgres',
//     host: configService.get<string>('DATABASE_HOST'),
//     port: configService.get<number>('DATABASE_PORT'),
//     username: configService.get<string>('DATABASE_USERNAME'),
//     password: configService.get<string>('DATABASE_NAME'),
//     database: configService.get<string>('DATABASE_PASSWORD'),
//     entities: [Call],
//     synchronize: true,
//     migrations: [__dirname + '/migrations/*{.ts,.js}'],
//     migrationsTableName: 'migrations',
//     migrationsRun: true,
//     logging: false,
//   };
// };
