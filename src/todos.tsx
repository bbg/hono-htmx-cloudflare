//
// BEGIN
//

import { Fragment } from "hono/jsx/jsx-runtime";
import { Item } from "./item";

export type Todo = {
  title: string;
  id: string;
};

export const Todos = ({ todos }: { todos: Todo[] }) => (
  <Fragment>
    {todos && Array.isArray(todos) ? (
      todos.map((todo) => <Item title={todo.title} id={todo.id} />)
    ) : (
      <span>No Data</span>
    )}
    <div id="todo"></div>
  </Fragment>
);

//
// END
//
