import { Injectable} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponsse } from './Interfaces/Poke-response.interface';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  private readonly axios: AxiosInstance = axios;

 async executeSEED(){

  const {data} = await this.axios.get<PokeResponsse>("https://pokeapi.co/api/v2/pokemon?/limit=10");
  
  data.results.forEach(async({name, url}) => {

    const segmets = url.split('/');
    const no = +segmets[ segmets.length -2 ]

    const pokemon = await this.pokemonModel.create({name, no})
    

  } )

  return 'seed executed'
 }
}
  