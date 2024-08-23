import { PokemonDto } from '../models/pokemon-dto.model';

export function calculatePokemonCost(pokemon: PokemonDto): number {
    const stats: (keyof PokemonDto)[] = ['attack', 'defense', 'specialAttack', 'specialDefense', 'hp', 'speed'];
    const sumOfStats = stats.reduce((acc, currVal) => acc + (pokemon[currVal] as number), 0);
    const cost =
        sumOfStats * 0.092 - 15 - Number(pokemon.baby) * -1.5 + Number(pokemon.mythical) * 10 + Number(pokemon.legendary) * 30;
    return cost;
}
