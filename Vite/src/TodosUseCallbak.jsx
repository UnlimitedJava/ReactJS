import { memo } from "react";

const TodosUseCallbak = ({todosCallback, addTodoCallback}) => {
  console.log("TodosUseCallbak render");

  return (
    <>
      <h2>My Todos(useCallback)</h2>
      {todosCallback.map((todo, index) => {
        return <p key={index}>{todo}</p>
      })}
      <button style={{backgroundColor: 'green'}} onClick={addTodoCallback}>Add Todo</button>
    </>
  );
};

export default memo(TodosUseCallbak);
