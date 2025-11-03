import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonService]
})
export class SeedModule {}
