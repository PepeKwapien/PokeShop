import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './services/pokemon.service';
import { FavoritesComponent } from './components/favorites/favorites.component';

type Tabs = 'main' | 'favorites';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CatalogComponent, FavoritesComponent],
    providers: [HttpClient],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    public title = 'PokeShop';
    public tab: Tabs = 'main';

    private _tabHandlers: Map<Tabs, () => void> = new Map([
        ['main', () => this.refreshList()],
        ['favorites', () => {}]
    ]);

    private _pokemonService = inject(PokemonService);

    public navigate(tab: Tabs) {
        if (tab !== this.tab) {
            this.tab = tab;
        } else if (this._tabHandlers.has(tab)) {
            this._tabHandlers.get(tab)!();
        }
    }

    private refreshList() {
        this._pokemonService.fetchPokemon();
    }
}
