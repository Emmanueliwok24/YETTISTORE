type collectionsType = {
    id: number;
    name: String;
    image: String;
}

export type productType = {
    id: number;
    title: string;
    description: String;
    price: number;
    media: string;
    collection: number;
}