import { Injectable, signal } from '@angular/core';
import { PokemonDto } from '../models/pokemon-dto.model';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    public _favorites = signal<PokemonDto[]>([]);

    constructor() {}

    addToFavorites(pokemon: PokemonDto) {
        this._favorites.update((favorites) => favorites.concat(pokemon));
    }

    removeFromFavorites(pokemon: PokemonDto) {
        this._favorites.update((favorites) => favorites.filter((favorite) => favorite.name !== pokemon.name));
    }

    isFavorite(pokemon: PokemonDto) {
        return this._favorites().some((favorite) => favorite.name === pokemon.name);
    }
}
