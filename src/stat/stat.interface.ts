export interface stat {
    id: number;
    budget: number;
    containersDispatched: number;
    containersNotDispatched: number;
}
export type statInput = Omit<stat, "id">;