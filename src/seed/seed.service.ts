import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponsse } from './Interfaces/Poke-response.interface';



@Injectable()
export class SeedService {


  private readonly axios: AxiosInstance = axios;

 async executeSEED(){
  const {data} = await this.axios.get<PokeResponsse>("https://pokeapi.co/api/v2/pokemon?/limit=10");

  data.results.forEach(({name, url}) => {

    const segmets = url.split('/');
    const no = +segmets[ segmets.length -2 ]

    console.log({name, no});
    

  } )

  return data.results[0];
 }
}