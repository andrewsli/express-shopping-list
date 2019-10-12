process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb")

//test set up
let testItems = { name: "apple", price: 40000};

beforeEach(function() {
  items.push(testItems);
});

afterEach(function() {
  items = [];
});

//Testing Reading
/** GET /items - returns `{items: [name,price ...]}` */

describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual(items);
  });
});

describe("POST /items", function(){
  test("Adds new item to array", async function(){
    const resp = await request(app)
    .post("/items")
    .send({name: "cheese", price: 10});
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({"added":{name: "cheese", price: 10}})
  });
})

/** PATCH /items/[name,price] - update items; return updated item */

describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${testItems.name}`)
      .send({
        name: "ice cream",
        price: 1000
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {"updated":{ name: "ice cream",
      price: 1000}
    });
  });
  // test("Responds with 404 if id invalid", async function() {
  //   const resp = await request(app).patch(`/items/0`);
  //   expect(resp.statusCode).toBe(404);
  // });
});

/** DELETE /items/[name] - delete item,
 *  return `{message: "deleted"}` */

describe("DELETE /items/:name", function() {
  test("Deletes a single item", async function() {
    const resp = await request(app).delete(`/items/${testItems.name}`);
    console.log(items, testItems)
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});