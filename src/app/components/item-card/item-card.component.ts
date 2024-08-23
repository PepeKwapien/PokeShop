import { Component, computed, input } from '@angular/core';
import { PokemonDto } from '../../models/pokemon-dto.model';
import { calculatePokemonCost } from '../../helpers/pokemon-cost.helper';

@Component({
    selector: 'app-item-card',
    standalone: true,
    imports: [],
    templateUrl: './item-card.component.html',
    styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
    public pokemon = input.required<PokemonDto>();
    public cost = computed(() => calculatePokemonCost(this.pokemon()).toFixed(2));
}
