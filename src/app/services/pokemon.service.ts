import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonDto } from '../models/pokemon-dto.model';
import { environment } from '../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private _http = inject(HttpClient);

    public pokemonCatalog = toSignal<PokemonDto[], PokemonDto[]>(
        this._http.get<PokemonDto[]>(`${environment.pokemonApiUrl}/pokemon/random`, {
            params: { size: 20 }
        }),
        { initialValue: [] }
    );
}
