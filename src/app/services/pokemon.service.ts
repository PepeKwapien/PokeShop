import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { PokemonDto } from '../models/pokemon-dto.model';
import { environment } from '../../environments/environment';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, exhaustMap, Observable, Subject, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private _http = inject(HttpClient);
    private _fetchPokemon = new BehaviorSubject(0);
    private _loadMorePokemon = new Subject<number>();

    constructor() {
        this._fetchPokemon
            .pipe(
                exhaustMap(() => this._getRandomPokemon()),
                takeUntilDestroyed()
            )
            .subscribe({
                next: (catalog) => this.pokemonCatalog.set(catalog),
                error: (err) => alert(`Error while getting pokemons. ${err.message}`)
            });

        this._loadMorePokemon
            .pipe(
                exhaustMap(() => this._getRandomPokemon()),
                takeUntilDestroyed()
            )
            .subscribe({
                next: (catalog) => this.pokemonCatalog.update((value) => value.concat(catalog)),
                error: (err) => alert(`Error while getting pokemons. ${err.message}`)
            });
    }

    public pokemonCatalog = signal<PokemonDto[]>([]);

    public fetchPokemon() {
        this._fetchPokemon.next(0);
    }

    public loadMorePokemon() {
        this._loadMorePokemon.next(0);
    }

    private _getRandomPokemon(): Observable<PokemonDto[]> {
        return this._http.get<PokemonDto[]>(`${environment.pokemonApiUrl}/pokemon/random`, {
            params: { size: 20 }
        });
    }
}
