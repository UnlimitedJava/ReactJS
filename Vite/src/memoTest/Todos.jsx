import { memo } from 'react';

const Todos = ({todos}) => {
   console.log("####### Todos render ~~~");
   return (
      <>
         <h2>My Todos</h2>
         {todos.map((todo, index) => {
            return <p key={index}>{todo}</p>
         })}
      </>
   );
};

//이 상태는 + 버튼 클릭시마다 todoCnt의 state 값이 변경되므로 App()이 재실행되고
//App의 하위 컴포넌트들 모두가 재실행되어 성능 이슈 발생한다.
// export default Todos;
//props 값(여기서는 todos)이 바뀌지 않으면 Todos 컴포넌트 rerendering 안됨
export default memo(Todos); 