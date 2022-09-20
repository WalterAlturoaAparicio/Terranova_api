import { containerInput } from "../container/container.interface";
import { StatEntity } from "./stat.entity";

export async function createStat(
  dispatched: containerInput[],
  notDispatched: containerInput[],
  budget: number
) {
  if((!dispatched || dispatched.length === 0) && (!notDispatched || notDispatched.length === 0)) {
    throw new Error("No hay contenedores para almacenar!")
  }
  const containersDispatched = dispatched.reduce((total, container) => {
    const { transportCost } = container;
    if (!transportCost) return total;
    return (total += transportCost);
  }, 0);
  const containersNotDispatched = notDispatched.reduce((total, container) => {
    const { transportCost } = container;
    if (!transportCost) return total;
    return (total += transportCost);
  }, 0);

  const newStat = {
    budget,
    containersDispatched,
    containersNotDispatched,
  };

  return StatEntity.create(newStat);
}
export async function getFinalStats() {
  const stats = await StatEntity.findAll();

  const finalStat = stats.reduce(
    (current, stat) => {
      current.budget_used += stat.budget;
      current.containers_dispatched += stat.containersDispatched;
      current.containers_not_dispatched += stat.containersNotDispatched;
      return current;
    },
    {
      containers_dispatched: 0,
      containers_not_dispatched: 0,
      budget_used: 0,
    }
  );
  finalStat.budget_used = Math.round(finalStat.budget_used * 100) / 100;

  finalStat.containers_dispatched =
    Math.round(finalStat.containers_dispatched * 100) / 100;

  finalStat.containers_not_dispatched =
    Math.round(finalStat.containers_not_dispatched * 100) / 100;
  
  return finalStat;
}
