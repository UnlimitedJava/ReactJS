import { Outlet, Link} from "react-router-dom";

const Contact = () => {
   return (
      <>
         <h1>Contact Me</h1>

         {/* 아래 Outlet 위치에 Tel 컴포넌트가 포시 됨. Outlet이 없으면 
            그냥 Contact 컴포넌트만 표시됨 */}
         {/* Outlet은 자식 컴포넌트가 나타날 자리임 */}
         <Outlet /> 
      </>
   );   
};

export default Contact;