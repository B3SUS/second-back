import { Injectable } from '@nestjs/common';
import axios from "axios";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Injectable()
export class CoinsService {

    private readonly neededCoins = [
        'bitcoin',
        'ethereum',
        'tether',
        'binance-coin',
        'solana',
        'usd-coin',
        'xrp',
        'dogecoin',
        'shiba-inu',
        'cardano',
        'avalanche',
        'tron',
        'polkadot',
        'near-protocol',
        'litecoin',
        'monero'
    ];

    private readonly neededRates = [
      'russian-ruble',
      'georgian-lari'
    ];


    constructor(private readonly httpService: HttpService) {}

    async getCoins(): Promise<any>{
        const apiUrl = `https://api.coincap.io/v2/assets/?ids=${this.neededCoins.join(',')}`
        try{
            const coinsResponse = await firstValueFrom(this.httpService.get(apiUrl))

            const coinDataPromises = this.neededRates.map((coin) => {
                const apiUrl = `https://api.coincap.io/v2/rates/${coin}`;
                return firstValueFrom(this.httpService.get(apiUrl));
            });

            const responses = await Promise.all(coinDataPromises);

            const ratesResponse = responses.map(response => response.data.data);

            const updatedCoinsResponse = coinsResponse.data.data.map(({rank, supply, maxSupply, marketCapUsd, volumeUsd24Hr, changePercent24Hr, vwap24Hr, explorer, id, symbol, name, priceUsd}) =>({
                id: id,
                symbol: symbol,
                name: name,
                priceUsd: priceUsd,
                type: 'coin'
            }));
            const updatedRatesResponse = ratesResponse.map(({symbol, currencySymbol, rateUsd, id, type}, index)=>({
                id: id,
                symbol: symbol,
                name: 'Фиат '+ symbol,
                priceUsd: rateUsd,
                type: type
            }));

            return updatedCoinsResponse.concat(updatedRatesResponse)
        }
        catch (error){
            throw new Error(error.message)
        }
    }
}
