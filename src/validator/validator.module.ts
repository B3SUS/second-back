import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ValidatorController} from "./validator.controller";
import {ValidatorService} from "./validator.service";

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    controllers: [ValidatorController],
    providers: [ValidatorService],
})
export class ValidatorModule {}
