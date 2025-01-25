import { Body, Controller, Post } from '@nestjs/common';
import * as EmailValidator from 'email-validator';

const WAValidator = require('multicoin-address-validator');


@Controller('validator')
export class ValidatorController {
    @Post('email')
    async validateEmail(@Body('email') email: string
    ) {
        return EmailValidator.validate(email)
    }

    @Post('address')
    async validateAddress(
        @Body('address') address: string,
        @Body('coin') coin: string,
    ){
        return WAValidator.validate(address, coin);
    }
}
