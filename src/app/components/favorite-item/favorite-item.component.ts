import { Component, computed, input } from '@angular/core';
import { PokemonDto } from '../../models/pokemon-dto.model';
import { calculatePokemonCost } from '../../helpers/pokemon-cost.helper';

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
}
