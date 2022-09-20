import * as StatService from "./stat.service";

describe("Testing stat service", () => {
  
  test("Create a empty stat return error ", async () => {
    expect.assertions(1);
    try {
      await StatService.createStat([], [], 0);
    } catch (error) {
      expect(error).toEqual(new Error("No hay contenedores para almacenar!"));
    }
  });
  
  
});
