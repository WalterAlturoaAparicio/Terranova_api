import { ContainerEntity } from "./container.entity";
import { containerInput } from "./container.interface";

export function getKpi(containers: containerInput[], budget: number) {
  const bestKpi = [];
  const others = [];

  containers.sort((a, b) => b.containerPrice - a.containerPrice);
  for (const container of containers) {
    if (budget - container.transportCost >= 0) {
      budget -= container.transportCost;

      bestKpi.push(convertIntoContainer(container));
    } else {
      others.push(convertIntoContainer(container));
    }
  }
  return [bestKpi, others];
}

export async function createContainers(
  containers: ContainerEntity[]
): Promise<ContainerEntity[]> {
  return ContainerEntity.bulkCreate(containers);
}
export function convertIntoContainer(container: any) {
  const { name, transportCost, containerPrice } = container;
  return {
    name,
    transportCost,
    containerPrice,
  };
}

export function validContainer(container: any) {
  if (!container.name || typeof container.name !== "string") return false;
  if (!container.transportCost || typeof container.transportCost !== "number")
    return false;
  if (!container.containerPrice || typeof container.containerPrice !== "number")
    return false;
  return true;
}
