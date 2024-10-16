import { Injectable, signal } from '@angular/core';
import { PokemonDto } from '../models/pokemon-dto.model';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    public favorites = signal<PokemonDto[]>([]);

    constructor() {}

    addToFavorites(pokemon: PokemonDto) {
        this.favorites.update((favorites) => favorites.concat(pokemon));
    }

    removeFromFavorites(pokemon: PokemonDto) {
        this.favorites.update((favorites) => favorites.filter((favorite) => favorite.name !== pokemon.name));
    }

    isFavorite(pokemon: PokemonDto) {
        return this.favorites().some((favorite) => favorite.name === pokemon.name);
    }

    public toggleFavorite(pokemon: PokemonDto): void {
        const isFavorite = this.isFavorite(pokemon);

        if (isFavorite) {
            this.removeFromFavorites(pokemon);
        } else {
            this.addToFavorites(pokemon);
        }
    }

    public swapPokemons(pokemonAName: string, pokemonBName: string) {
        if (pokemonAName === pokemonBName) {
            return;
        }

        const findPokemonByName = (pokemonName: string) => (pokemon: PokemonDto) => pokemon.name === pokemonName;
        const pokemonA = this.favorites().find(findPokemonByName(pokemonAName));
        const pokemonB = this.favorites().find(findPokemonByName(pokemonBName));

        if (!pokemonA || !pokemonB) {
            return;
        }

        const indexA = this.favorites().indexOf(pokemonA);
        const indexB = this.favorites().indexOf(pokemonB);

        this.favorites.update((favoriteArray) => {
            favoriteArray[indexA] = pokemonB;
            favoriteArray[indexB] = pokemonA;
            return favoriteArray;
        });
    }
}
