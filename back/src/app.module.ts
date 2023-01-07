import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PrismaModule} from 'nestjs-prisma';
import {PasswordService} from "./services/password.service";
import {ConfigModule} from "@nestjs/config";
import config from 'src/common/configs/config';
import {loggingMiddleware} from "./common/middleware/logging.middleware";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, load: [config]}),
        PrismaModule.forRoot({
            isGlobal: true,
            prismaServiceOptions: {
                middlewares: [loggingMiddleware()], // configure your prisma middleware
            },
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        PasswordService,
    ],
})
export class AppModule {
}
