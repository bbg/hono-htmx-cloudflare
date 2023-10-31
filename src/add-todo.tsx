//
// BEGIN
//

export const AddTodo = () => (
  <form
    hx-post="/todo"
    hx-target="#todo"
    hx-swap="beforebegin"
    _="on htmx:afterRequest reset() me"
    class="flex mb-4 space-x-3"
  >
    <input
      name="title"
      type="text"
      class="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
    />
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center"
      type="submit"
    >
      Submit
    </button>
  </form>
);

//
// END
//
