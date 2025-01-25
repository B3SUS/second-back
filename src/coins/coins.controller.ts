import {Body, Controller, Get, Post} from '@nestjs/common';
import {CoinsService} from "./coins.service";
import axios from "axios";

@Controller('coins')
export class CoinsController {
    constructor(private readonly CoinsService: CoinsService) {}

    @Get()
    async getCoins(): Promise<any>{
        return this.CoinsService.getCoins();
    }


    @Post('send-mes')
    async sendToTelegramBot(
        @Body('transactionId') transactionId: string,
        @Body('fromAmount') amount1: string,
        @Body('currency1') selectedCoin1: string,
        @Body('toAmount') amount2: string,
        @Body('currency2') selectedCoin2: string,
        @Body('cryptoAddress') address: string,
        @Body('promocode') promocode: string,
    ) {

        const message = `id: ${transactionId} \n ${amount1} ${selectedCoin1} to ${amount2} ${selectedCoin2} \n address: ${address} \n Promocode: ${promocode}`;

        const token = '7971209952:AAEuabU0D6bFm_rYPw0Oy7aDv852wjMX4H0';
        const chatId = '-4558043548';
        const url = `https://api.telegram.org/bot${token}/sendMessage`;


        try {
            const response = await axios.post(url, {
                chat_id: chatId,
                text: message,
            });
            return { success: true, message: 'Message sent'};
        } catch (error) {
            console.error('Error sending message:', error);
            return { success: false, message: 'Error sending message', error: error.message };
        }
    }
}

