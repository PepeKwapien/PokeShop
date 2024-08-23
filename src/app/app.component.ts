import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './services/pokemon.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CatalogComponent],
    providers: [HttpClient],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'PokeShop';

    private _pokemonService = inject(PokemonService);

    public refreshList() {
        this._pokemonService.fetchPokemon();
    }
}
