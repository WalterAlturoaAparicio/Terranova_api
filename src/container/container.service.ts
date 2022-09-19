import { ContainerEntity } from "./container.entity";
import { container } from "./container.interface";

export function getKpi(containers: container[], budget: number) {
  const bestKpi = [];
  const others = [];

  containers.sort((a, b) => b.containerPrice - a.containerPrice);
  for (const container of containers) {
    if (budget - container.transportCost >= 0) {
      budget -= container.transportCost;
      bestKpi.push(container);
    } else {
      others.push(container);
    }
  }
  return [bestKpi, others];
}

export async function createContainers(
  containers: ContainerEntity[]
): Promise<ContainerEntity[]> {
  return ContainerEntity.bulkCreate(containers);
}

export function validContainer(container: any) {
  if (!container.name || typeof container.name !== "string") return false;
  if (!container.transportCost || typeof container.transportCost !== "number")
    return false;
  if (!container.containerPrice || typeof container.containerPrice !== "number")
    return false;
  return true;
}
