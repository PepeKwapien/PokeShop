import { Component, computed, inject, input } from '@angular/core';
import { PokemonDto } from '../../models/pokemon-dto.model';
import { calculatePokemonCost } from '../../helpers/pokemon-cost.helper';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-favorite-item',
    standalone: true,
    imports: [],
    templateUrl: './favorite-item.component.html',
    styleUrl: './favorite-item.component.scss'
})
export class FavoriteItemComponent {
    public pokemon = input.required<PokemonDto>();
    public cost = computed(() => calculatePokemonCost(this.pokemon()).toFixed(2));

    private _favoriteService = inject(FavoritesService);

    removeFavorite() {
        this._favoriteService.removeFromFavorites(this.pokemon());
    }
}
