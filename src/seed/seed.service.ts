import { Injectable} from '@nestjs/common';

import { PokeResponse } from './Interfaces/Poke-response.interface';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ){}

  
  

  //~ Esto hace la peticion del pokeAPI
  async executeSEED(){

    //Borra * de pokemons
    await this.pokemonModel.deleteMany({})

    //El pokeResponse viene de nuestros interfaces lo que regresa la pagina de pokeapi
    const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?/limit=650");

    // const insertPromiseArray: Promise<any>[] = [];
    const pokemonToInsert: { name:string, no:number}[] = []
    
    data.results.forEach(({name, url}) => {

    const segmets = url.split('/');
    const no = +segmets[ segmets.length -2 ]

    //const pokemon = await this.pokemonModel.create({name, no})
    // insertPromiseArray.push( 
    //   this.pokemonModel.create({name,no})
    // );
    pokemonToInsert.push({name, no});

  });

  await this.pokemonModel.insertMany(pokemonToInsert)

  return 'seed executed'
 }
}
  