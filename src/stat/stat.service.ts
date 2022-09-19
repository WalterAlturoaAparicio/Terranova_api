import { container } from "../container/container.interface";
import { StatEntity } from "./stat.entity";

export async function createStat(
  dispatched: container[],
  notDispatched: container[],
  budget: number
) {
  const containersDispatched = dispatched.reduce((total, container) => {
    const { containerPrice } = container;
    if (!containerPrice) return total;
    return (total += containerPrice);
  }, 0);
  const containersNotDispatched = notDispatched.reduce((total, container) => {
    const { containerPrice } = container;
    if (!containerPrice) return total;
    return (total += containerPrice);
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

  return finalStat;
}
