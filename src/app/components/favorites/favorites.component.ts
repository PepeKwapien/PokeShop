import { Component, inject } from '@angular/core';
import { FavoriteItemComponent } from '../favorite-item/favorite-item.component';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [FavoriteItemComponent],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
    private _favoritesService = inject(FavoritesService);

    public favorites = this._favoritesService._favorites;
}
