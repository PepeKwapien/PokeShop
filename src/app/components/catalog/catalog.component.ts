import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [ItemCardComponent, NgIf],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
    private _pokemonService = inject(PokemonService);

    public pokemonCatalog = this._pokemonService.pokemonCatalog;

    public loadMorePokemon() {
        this._pokemonService.loadMorePokemon();
    }
}
