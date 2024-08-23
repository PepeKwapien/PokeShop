export interface PokemonDto {
    name: string;
    hp: number;
    attack: number;
    specialAttack: number;
    defense: number;
    specialDefense: number;
    speed: number;
    height: number;
    weight: number;
    eggGroups: string;
    genera: string;
    baby: boolean;
    legendary: boolean;
    mythical: boolean;
    shape: string;
    sprite: URL;
}
