//
// BEGIN
//

import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Layout } from "./layout";
import { AddTodo } from "./add-todo";
import { Item } from "./item";
import { Todo, Todos } from "./todos";
import { Fragment } from "hono/jsx/jsx-runtime";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("*", Layout);

app.get("/", async (c) => {
  const query = `SELECT id, title FROM todo;`;
  const { results } = await c.env.DB.prepare(query).all<Todo>();
  const todos = results;
  return c.render(
    <Fragment>
      <AddTodo />
      <Todos todos={todos} />
    </Fragment>
  );
});

app.post(
  "/todo",
  zValidator(
    "form",
    z.object({
      title: z.string().min(1),
    })
  ),
  async (c) => {
    const { title } = c.req.valid("form");
    const id = crypto.randomUUID();
    const query = `INSERT INTO todo(id, title) VALUES(?, ?);`;
    await c.env.DB.prepare(query).bind(id, title).run();
    return c.html(<Item title={title} id={id} />);
  }
);

app.delete("/todo/:id", async (c) => {
  const id = c.req.param("id");
  await c.env.DB.prepare(`DELETE FROM todo WHERE id = ?;`).bind(id).run();
  c.status(200);
  return c.body(null);
});

app.onError((err, c) =>
  c.json(
    {
      name: err.name,
      message: err.message,
    },
    500
  )
);

export default app;

//
// END
//
