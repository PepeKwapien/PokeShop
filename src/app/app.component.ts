import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './services/pokemon.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NgClass, NgIf } from '@angular/common';
import { FavoritesService } from './services/favorites.service';
import { animate, style, transition, trigger } from '@angular/animations';

type Tabs = 'main' | 'favorites';
interface TabProperties {
    handler: () => void;
    condition: () => boolean;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CatalogComponent, FavoritesComponent, NgClass, NgIf],
    providers: [HttpClient],
    animations: [
        trigger('parent', [transition(':enter', [])]),
        trigger('slideMain', [
            transition(':leave', [
                style({ transform: 'translateX(0)' }),
                animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
            ]),
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('400ms ease-out', style({ transform: 'translateX(0)' }))
            ])
        ]),
        trigger('slideFavorites', [
            transition(':leave', [
                style({ transform: 'translateX(0)' }),
                animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
            ]),
            transition(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('400ms ease-out', style({ transform: 'translateX(0)' }))
            ])
        ])
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    public title = 'PokeShop';
    public tab: Tabs = 'main';

    private _pokemonService = inject(PokemonService);
    private _favoritesService = inject(FavoritesService);

    private _tabHandlers: Map<Tabs, TabProperties> = new Map([
        ['main', { handler: () => this._refreshList(), condition: () => true }],
        ['favorites', { handler: () => {}, condition: () => this._favoritesService.favorites().length > 0 }]
    ]);

    public navigate(tab: Tabs) {
        if (!this.isTabActive(tab)) {
            return;
        }

        if (tab !== this.tab) {
            this.tab = tab;
        } else if (this._tabHandlers.has(tab)) {
            this._tabHandlers.get(tab)!.handler();
        }
    }

    public isTabActive(tab: Tabs): boolean {
        if (!this._tabHandlers.has(tab)) {
            return false;
        }

        return this._tabHandlers.get(tab)!.condition();
    }

    private _refreshList() {
        this._pokemonService.fetchPokemon();
    }
}
