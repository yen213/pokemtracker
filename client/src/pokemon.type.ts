// Pokemon object type
export type PokemonObject = {
    id?: number;
    name: string;
    dex_number: number;
    type_1: string;
    type_2: string | null;
    image_url: string;
};
