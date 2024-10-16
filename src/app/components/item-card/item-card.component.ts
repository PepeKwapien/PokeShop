import { Component, computed, inject, input } from '@angular/core';
import { PokemonDto } from '../../models/pokemon-dto.model';
import { calculatePokemonCost } from '../../helpers/pokemon-cost.helper';
import { FavoritesService } from '../../services/favorites.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-item-card',
    standalone: true,
    imports: [NgClass],
    templateUrl: './item-card.component.html',
    styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
    public pokemon = input.required<PokemonDto>();
    public cost = computed(() => calculatePokemonCost(this.pokemon()).toFixed(2));

    private _favoritesService = inject(FavoritesService);

    public isFavorite(pokemon: PokemonDto): boolean {
        return this._favoritesService.isFavorite(pokemon);
    }

    public toggleFavorites(isFavorite: boolean, pokemon: PokemonDto): void {
        if (isFavorite) {
            this._favoritesService.removeFromFavorites(pokemon);
        } else {
            this._favoritesService.addToFavorites(pokemon);
        }
    }
}
