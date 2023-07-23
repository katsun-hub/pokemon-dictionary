import { Dispatch, SetStateAction } from "react";

export type PokeData = {
    pokemonData: any[];
    setPokemonData: Dispatch<SetStateAction<any[]>>;
}