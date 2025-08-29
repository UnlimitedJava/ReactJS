//CSS를 module 형태로 사용하기. 확장자를 .module.css로 해야 함
import mStyles from '../myCSS/my-style.module.css';

const Tel = () => {
   return (
      <>
         <h3 className={mStyles.bigblue}>아래 번호로 전화해 주세요~</h3>
         <h3 id={mStyles.test} style={{marginTop: '-20px'}}>010-1234-5678</h3>
      </>
   );
};

export default Tel;