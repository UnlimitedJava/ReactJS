import { Outlet, Link} from "react-router-dom";

const Layout = () => {
   return(
         <>
            <nav>
               <ul>
                  <li>
                     <Link to="/">Home~</Link>
                  </li>
                  <li>
                     <Link to="/blogs">Blogs~</Link>
                  </li>
                  <li>
                     <Link to="/contact">Contact~</Link>
                  </li>
                  <li>
                     <Link to="/contact/tel">Telephone</Link>
                  </li>
               </ul>
            </nav>

            {/* Outlet은 자식 컴포넌트가 나타날 자리임
               Layout 컴포넌트의 자식 컴포넌트는 Home, Blogs, Contact, Nopage임
               Tel 컴포넌트는 Contact 컴포넌트의 자식임 */}
            <Outlet />
         </>
   );
};

export default Layout;