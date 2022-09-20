import { ServerApi } from ".";
import supertest from "supertest";
import { StatEntity } from "./components/stat/stat.entity";
import { ContainerEntity } from "./components/container/container.entity";

beforeEach(async () => {
  await ContainerEntity.destroy({ where: {}, truncate: true });
  await StatEntity.destroy({ where: {}, truncate: true });
});

const app = new ServerApi().app;
const api = supertest(app);
const normalData = {
  containers: [
    {
      name: "C5",
      transportCost: 264.54,
      containerPrice: 1434.8,
    },
    {
      name: "C3",
      transportCost: 434.66,
      containerPrice: 1379.26,
    },
    {
      name: "C1",
      transportCost: 571.4,
      containerPrice: 4744.03,
    },
    {
      name: "C2",
      transportCost: 537.33,
      containerPrice: 3579.07,
    },
    {
      name: "C4",
      transportCost: 347.28,
      containerPrice: 1700.12,
    },
  ],
  budget: 1508.65,
};

describe("Post /containers", () => {
  test("Create empty containers", async () => {
    const send = { containers: [], budget: 0 };

    await api
      .post("/containers")
      .send(send)
      .expect("Content-Type", /application\/json/)
      .expect(400, {
        status: 400,
        msg: "* @apiError",
        error: "No hay contenedores!",
      });
  });

  test("Try to create containers without proper structure", async () => {
    const send = {
      containers: [
        {
          name: "C1",
          transportCost: 571.4,
        },
      ],
      budget: 1000,
    };

    await api
      .post("/containers")
      .send(send)
      .expect("Content-Type", /application\/json/)
      .expect(400, {
        status: 400,
        msg: "* @apiError",
        error: "La estructura de los contenedores no corresponde!",
      });
  });

  test("Create a containers without budget", async () => {
    const send = {
      containers: [
        {
          name: "C1",
          transportCost: 571.4,
          containerPrice: 4744.03,
        },
      ],
    };

    await api
      .post("/containers")
      .send(send)
      .expect("Content-Type", /application\/json/)
      .expect(400, {
        status: 400,
        msg: "* @apiError",
        error: "El budget debe ser un número!",
      });
  });

  test("Create a normal containers", async () => {
    const data = [
      {
        name: "C1",
        transportCost: 571.4,
        containerPrice: 4744.03,
      },
      {
        name: "C2",
        transportCost: 537.33,
        containerPrice: 3579.07,
      },
      {
        name: "C4",
        transportCost: 347.28,
        containerPrice: 1700.12,
      },
    ];

    await api
      .post("/containers")
      .send(normalData)
      .expect("Content-Type", /application\/json/)
      .expect(201, {
        status: 201,
        msg: "* @apiSuccess",
        data,
      });
  });
  test("Try to create containers with 'containerPrice' of the wrong type ", async () => {
    const send = {
      containers: [
        {
          name: "C1",
          transportCost: 571.4,
          containerPrice: "3579.07",
        },
      ],
      budget: 1000,
    };
    await api
      .post("/containers")
      .send(send)
      .expect("Content-Type", /application\/json/)
      .expect(400, {
        status: 400,
        msg: "* @apiError",
        error: "La estructura de los contenedores no corresponde!",
      });
  });

  test("Try to create containers with 'transportCost' of the wrong type ", async () => {
    const send = {
      containers: [
        {
          name: "C1",
          transportCost: "571.4",
          containerPrice: 3579.07,
        },
      ],
      budget: 1000,
    };
    await api
      .post("/containers")
      .send(send)
      .expect("Content-Type", /application\/json/)
      .expect(400, {
        status: 400,
        msg: "* @apiError",
        error: "La estructura de los contenedores no corresponde!",
      });
  });
  test("Try to create containers with 'name' of the wrong type ", async () => {
    const send = {
      containers: [
        {
          name: 1002,
          transportCost: 571.4,
          containerPrice: 3579.07,
        },
      ],
      budget: 1000,
    };
    await api
      .post("/containers")
      .send(send)
      .expect("Content-Type", /application\/json/)
      .expect(400, {
        status: 400,
        msg: "* @apiError",
        error: "La estructura de los contenedores no corresponde!",
      });
  });
  test("Create containers plus required container properties", async () => {
    const send = {
      containers: [
        {
          name: "C1",
          transportCost: 571.4,
          containerPrice: 3579.07,
          otherProperty: 1254,
        },
      ],
      budget: 1000,
    };
    const data = [
      {
        name: "C1",
        transportCost: 571.4,
        containerPrice: 3579.07,
      },
    ];
    await api
      .post("/containers")
      .send(send)
      .expect("Content-Type", /application\/json/)
      .expect(201, {
        status: 201,
        msg: "* @apiSuccess",
        data,
      });
  });
});

describe("Get /stats", () => {
  test("Get stats of 1 normal data request", async () => {
    await api.post("/containers").send(normalData);
    const data = {
      containers_dispatched: 1456.01,
      containers_not_dispatched: 699.2,
      budget_used: normalData.budget,
    };
    await api
      .get("/stats")
      .expect("Content-Type", /application\/json/)
      .expect(200, {
        status: 200,
        msg: "* @apiSuccess",
        data,
      });
  });
  test("Get no stats", async () => {
    const data = {
      containers_dispatched: 0,
      containers_not_dispatched: 0,
      budget_used: 0,
    };
    await api
      .get("/stats")
      .expect("Content-Type", /application\/json/)
      .expect(200, {
        status: 200,
        msg: "* @apiSuccess",
        data,
      });
  });
  test("Get stats of 10 normal data requests", async () => {
    for (let i = 0; i < 10; i++) {
      await api.post("/containers").send(normalData);
    }
    const data = {
      containers_dispatched: 14560.1,
      containers_not_dispatched: 6992,
      budget_used: normalData.budget*10,
    };
    await api
      .get("/stats")
      .expect("Content-Type", /application\/json/)
      .expect(200, {
        status: 200,
        msg: "* @apiSuccess",
        data,
      });
  });
});
