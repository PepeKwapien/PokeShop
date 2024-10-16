import { Component, inject } from '@angular/core';
import { FavoriteItemComponent } from '../favorite-item/favorite-item.component';
import { FavoritesService } from '../../services/favorites.service';
import { PokemonDto } from '../../models/pokemon-dto.model';
import { NgClass } from '@angular/common';
import { distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [FavoriteItemComponent, NgClass],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
    private _favoritesService = inject(FavoritesService);
    private _currentlyDragged: PokemonDto | undefined;
    private _draggedOverFavoriteName = new Subject<string>();

    public favorites = this._favoritesService.favorites;

    constructor() {
        this._draggedOverFavoriteName
            .pipe(distinctUntilChanged(), takeUntilDestroyed())
            .subscribe({ next: (value) => this._favoritesService.swapPokemons(this._currentlyDragged?.name ?? value, value) });
    }

    onDragStart($event: DragEvent, pokemon: PokemonDto) {
        $event.dataTransfer?.setData('draggedName', pokemon.name);
        this._currentlyDragged = pokemon;
    }

    onDragEnd() {
        this._currentlyDragged = undefined;
    }

    onDrop($event: DragEvent) {
        const name = $event.dataTransfer?.getData('draggedName');
    }

    onDragover($event: DragEvent) {
        $event.preventDefault();
    }

    onDragoverFavorite($event: DragEvent, pokemon: PokemonDto) {
        this._draggedOverFavoriteName.next(pokemon.name);
    }

    isCurrentlyDragged(pokemon: PokemonDto): boolean {
        return this._currentlyDragged === pokemon;
    }
}
