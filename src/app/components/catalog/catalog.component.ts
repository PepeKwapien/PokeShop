import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [ItemCardComponent],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
    private _pokemonService = inject(PokemonService);

    public pokemonCatalog = this._pokemonService.pokemonCatalog;
}
