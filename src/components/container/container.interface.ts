export interface container {
    id: number;
    name: string;
    transportCost: number;
    containerPrice: number;
}
export type containerInput = Omit<container, "id">;