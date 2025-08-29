//React에 대한 자세한 강의 튜토리얼 아래 참조
// https://react.vlpt.us/
//자바스크립트에 대해서는 아래 참조
// https://learnjs.vlpt.us/useful/06-destructuring.html

import React, { useState, useEffect, createContext, useContext, useRef, useReducer, useCallback, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//Router 사용을 위해 필요
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

//이동할 페이지에 해당하는 소스들
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import NoPage from "./pages/NoPage.jsx";
import Tel from "./pages/Tel.jsx";

//memo 테스트를 위한 Todos
import Todos from "./memoTest/Todos.jsx";

// import { memo } from "react";
import TodosUseCallbak from "./TodosUseCallbak";
import SmartHome from './ex_useCallback/SmartHome.jsx';

//custom hook 사용 테스트
import useFetch from "./customHook/useFetch";

//아래는 useContext 훅을 사용하기 위해 context를 초기화
//아래 코드가 App() 안에 있으면 안된다.
const MyUserContext = createContext();


// 본 프로그램은 화면 맨 하단에 Hello world from Joe라는 글자를 클릭할때마다 
// HI~~~ REACT FROM JOE.Y.J.라는 글자와 번갈아 가면서 바꾸는 프로그램인데
// 주안점으로 봐야 할 부분은 setMsgVal()을 통해 msg의 값을 바꿀때(state의 값이 바뀌면 화면 rendering이 발생하는데) 
// 이때 언제 화면이 rendering되는지를 알아볼수 있도록 로그들을 출력하고 있다.
// 핵심은 Joe라는 컴포넌트의 onClick 이벤트 안에 있는 모든 코드들(함수 포함)을 다 실행 후
// 비로소 msg의 값이 변경되고 App()이 재 실행되어 화면을 다시 그리게 된다는 점이다.
// setMsgVal(msgObj[i]);가 실행된 직후에 msg의 값이 바뀌어 App()이 재실행되는게 아니다.
// setMsgVal(msgObj[i]);가 실행된 이후에도 msg의 값은 로그를 보면 알듯이 아직 바뀌지 않는다.
// 또한 setIdx(i)가 실행된 이후에는 idx의 값은 바뀌지 않음을 로그를 통해 볼수 있다.
// msg나 idx의 값이 바뀌는 시점은 Joe컴포넌트의 onClick이벤트 안에 있는 모든 코드들이 다 실행된 이후에 
// 즉 console.log("▶▶▶<Joe>333: toChangeText() 실행 후 ~~"); 코드까지 다 실행된 이후에
// msg와 idx의 값이 바뀌고 App()이 재실행된다는 것이다.
// 아래 로그를 통해 이상을 확인할수 있다.

// App.jsx:38 ############ App()~~ idx  0
// App.jsx:39 ############ App()~~ msg  Hello world from Joe
// App.jsx:7 ~~~~~~~ Joe()~~~~~~~
//    ⇒ ⇒ ⇒ 최초 실행시 여기까지 실행됨. 이때 화면이 모두 그려진 상태

// App.jsx:12 
// ★★★클릭 이벤트 발생 <Joe> 
// App.jsx:13 <Joe>111:  0
// App.jsx:21 <Joe>222:  1
// App.jsx:65 클릭 후 App() i :  1
// App.jsx:66 클릭 후 App() setMsgVal()  이전 idx :  0
// App.jsx:68 클릭 후 App() setMsgVal() 직후 msg :  Hello world from Joe
// App.jsx:69 클릭 후 App() setIdx 이전 idx :  0
// App.jsx:71 클릭 후 App() setIdx 직후 idx :  0
// App.jsx:73 $$$$$$$$ HaHa ^_^ - showHaha()함수임~
// App.jsx:76 *** Hohoho~~~ ^__^/ i =  0
// App.jsx:76 *** Hohoho~~~ ^__^/ i =  1
// App.jsx:76 *** Hohoho~~~ ^__^/ i =  2
// App.jsx:76 *** Hohoho~~~ ^__^/ i =  3
// App.jsx:76 *** Hohoho~~~ ^__^/ i =  4
// App.jsx:76 *** Hohoho~~~ ^__^/ i =  5
// App.jsx:76 *** Hohoho~~~ ^__^/ i =  6
// App.jsx:25 ▶▶▶<Joe>333: toChangeText() 실행 후 ~~
// App.jsx:38 ############ App()~~ idx  1
// App.jsx:39 ############ App()~~ msg  HI~~~ REACT FROM JOE.Y.J.
// App.jsx:7 ~~~~~~~ Joe()~~~~~~~

function Joe(props){
  	// console.log("~~~~~~~ Joe()~~~~~~~");

	return <>
		<h2><a href="/" onClick={(e) => {
			e.preventDefault();
			console.log("\n★★★클릭 이벤트 발생 <Joe> ");
			console.log("<Joe>111: ", props.index);

			var _idx = 0;
			if(props.index === 0){
				_idx = 1;
			} else {
				_idx = 0;
			}		
			console.log("<Joe>222: ", _idx);
			props.toChangeText(_idx);
			props.showHaha();
			props.showHohoho();
			console.log("▶▶▶<Joe>333: toChangeText() 실행 후 ~~");
		}}>{props.title}</a></h2>
	</>
}

////////////////////////////
function Football(props){
  const shoot = (e, val) => {
    alert("Footbal component > Great Shoot : " + val);
    props.getResult(val, e);
  }

  const [coords, setCoords] = useState({x: 0, y: 0});

  const showXY = (e) => {
    // console.log("showXY() > 마우스의 X, Y 좌표 : ", e.clientX, ", ", e.clientY);
    setCoords({x: e.clientX, y:e.clientY});
  }

  return (
    <>
       {/* mBtn에 대한 css는 App.css에서 부여 */}
      <button id="mBtn" onClick={(event) => shoot(event, '골인입니다~')}
                        onMouseMove={(e) => showXY(e)}
      >Click This Button<br></br>Move mouse on me</button>
      <p>X: {coords.x}, Y: {coords.y}</p>
    </>
  );
} //Footboall


function Car(props){
  return <li>I am a { props.brand } </li>
}

function Garage(){
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <>
      <h2>Who lives in my garage?</h2>
      <ul>
        {cars.map((car, i) => <Car key={i} brand={car} />)}
      </ul>
    </>
  );
} //Garage


function Person(props){
  return <li>{props.name}은 {props.age}살입니다.</li>
}

function People(){
    const people = [
      { name: 'Joe', age: 30 },
      { name: 'Emily', age: 25 },
      { name: 'David', age: 35 }
    ];

  return (
    <div>
      <h2>사람 목록</h2>
      <ul>
        { people.map((p, i) => (
            <Person key={i} name={p.name} age={p.age} ></Person>
          )) }
      </ul>
    </div>
  );
}

function MyForm(){
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("The name you entered was : ${name}"); //${name}이라는 문자열 자체를 출력
    // alert('The name you entered was : ${name}'); //${name}이라는 문자열 자체를 출력
    alert(`The name you entered was : ${name}`); //정상 출력됨
  }

  // input box에 클릭 발생했을 때 내용을 지우기
  const clearInput = (e) => {
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:{"\u00A0"}
        <input 
          type="text"
          value={name}
          onChange={ (e) => {
            setName(e.target.value);
            console.log("### ", e.target.value);
          }}
          onClick={clearInput}
        />
          
      </label>
      <input style={{marginLeft: '5px'}} type="submit" />
    </form>
  );
} //MyForm


function MyFormMultiInput(){
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    //변경이 발생한(onChange 이벤트가 발생한) input 박스의 name 값(username 혹은 age)가 mName에 들어감
    const mName = e.target.name; 
    //현재 onChange 이벤트가 발생한 input박스에 입력되어 있는 값(문자열)이 mValue 변수에 담김
    const mValue = e.target.value;

    // const [car, setCar] = useState({
    //   brand: "Ford",
    //   model: "Mustang",
    //   year: "1964",
    //   color: "red"
    // });
    // 위의 상태에서 만일 color의 값만 red에서 blue로 바꾸고자 할때 아래와 같이 하면
    // setCar({color: "blue"}); 이 결과 brand, model, year는 다 없어진다
    // 따라서 아래와 같이 이전 상태 값을 받고 그것과 새로 바뀌는 값을 같이 넘겨줘야 의도한 대로 변경이 된다
    // const updateColor = () => {
    //   setCar(prevState => {
    //     return {...prevState, color: "blue"};
    //   })
    // }
    //아래 values는 React의 useState 함수형 업데이트 문법에서 전돨되는 "이전 상태" 값을 가짐.
    //아래는 이전 상태를 기반으로 새 상태를 계산하는 방식임
    //setInputs(values => ({...values, [mName]: mValue}));
    //(count) => count + 1 코드가 의미하는 바는 기존의 count 값을 함수의 매개인자(parameter)로 받아서 
    //count + 1 한 결과를 return하는 기능인데 이 결과 값을 setCount()로 처리하는 의미임
    //setCount((count) => count + 1)
    setInputs(valuesPrev => {
      //valuesPrev는 onChange 이벤트 발생시 여기로 들어오므로 valuesPrev에는 현재 입력한 값 이전까지의
      //내용이 담겨 있음. 홍길동 입력 후 25까지 입력했을 때 valuesPrev에는 {username: '홍길동', age: '2'}
      //의 내용이 담겨 있음
      console.log('1. 이전 상태 값(valuesPrev): ', valuesPrev); 
      console.log('2. 현재 상태 값(mValue): ', mValue);
      //[mName]에는 여기가 onChange 이벤트 발생시 들어오는 곳이므로 
      //input 박스 중 변경이 발생한 input의 name 값(username 혹은 age)이 mName에 담기게 됨. 
      //따라서 아래 콘솔에는 현재 입력이 발생하는 input의 name 값 username이나 age 중 하나가 출력
      console.log('3. [mName] 값: ', [mName]);

      //...valuesPrev가 필요한 이유, 하는 역할은 만일 username에 홍길동을 입력한 상태이고 
      // age에 25를 입력하기 위해 2를 입력 후 이제 방금 5를 입력했다면 valuesPrev에는 아래와 같이
      // 이전에 입력한 값을 유지하고 있기 위한 용도와 역할이다.
      // 1. 이전 상태 값(valuesPrev):  {username: '홍길동', age: '2'}
      // 2. 현재 상태 값(value):  25             
      // 3. [name] 값:  ['age']      
      //아래와 같이 넘기면 React가 알아서 내부적으로 inputs의 값들을 유지 및 변경해 준다.
      return {...valuesPrev, [mName]: mValue};
    });
  } //handleChange

  //submit 버튼 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs: ", inputs);
    
    alert(`${inputs.username}은 ${inputs.age}살 입니다`);
  }

  //input box 클릭시 글자 지우기
  const clearInput = (e) => {
    console.log(e);
    console.log('클릭한 input > name: ', e.target.name);

    //클릭이 발생한 input박스의 name을 가지고 오고
    const name = e.target.name;

    //아래 코드에 대한 자세한 설명은 handleChange() 부분을 참조할 것
    //setInputs(prevVal => ({...prevVal, [name]: ''}));
    //prevVal은 클릭이 발생한 input 박스에 담겨 있던 이전 값을 담고 있다.
    setInputs(prevVal => {
      console.log("%%% prevVal: ", prevVal);
      console.log("%%% [name]: ", [name]); //클릭한 input의 name 값(username 혹은 age)이 들어 있다.

      return {...prevVal, [name]: ''}
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:{"\u00A0"}
        <input 
          type="text"
          name="username"
          // username이 존재하면 그 값 사용, 없으면 ""를 사용해서 에러를 방지
          value={inputs.username || ""}
          onChange={handleChange}
          onClick={clearInput}
        />
      </label><br/>
      <label>Enter your age:{"\u00A0"}
        <input 
          type="text"
          name="age"
          value={inputs.age || ""}
          onChange={handleChange}
          onClick={clearInput}
        />
      </label>
      <input style={{marginLeft: '5px'}} type="submit" />
    </form>
  );
} //MyFormMultiInput

function MyFormTextArea(){
  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const handleChange = (e) => {
    setTextarea(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    alert(textarea);
  }

  const clearText = e => {
    setTextarea('');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea value={textarea} onChange={handleChange} onClick={clearText} />
        <input style={{marginLeft: '5px'}} type="submit" />
      </form>
    </>
  );
} //MyFormTextArea


function MySelectBox(){
  const [myCar, setMyCar] = useState("Volvo");

  const handleChange = e => {
    setMyCar(e.target.value)
    console.log("select box > myCar : ", myCar); //이전에 선택된 값이 출력
    console.log("select box > e.target.value : ", e.target.value); //현재 선택된 값이 출력
  }

  return (
    <form>
      <select value={myCar} onChange={handleChange}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
        <option value="Genesis">Genesis</option>
      </select>
    </form>
  );
} //MySelectbox


function CarHook() {
  // const [car, setCar] = useState({
  //   brand: "Ford",
  //   model: "Mustang",
  //   year: "1964",
  //   color: "red"
  // });
  // 위의 상태에서 만일 color의 값만 red에서 blue로 바꾸고자 할때 아래와 같이 하면
  // setCar({color: "blue"}); 이 결과 brand, model, year는 다 없어진다
  // 따라서 아래와 같이 이전 상태 값을 받고 그것과 새로 바뀌는 값을 같이 넘겨줘야 의도한 대로 변경이 된다
  // const updateColor = () => {
  //   setCar(prevState => {
  //     return {...prevState, color: "blue"};
  //   })
  // }  
  const [carHook, setCarHook] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  const updateBlueColor = () => {
    setCarHook(prevState => {
      //콘솔에 아래 내용이 출력됨
      //{"brand": "Ford", "model": "Mustang", "year": "1964", "color": "red"}
      console.log("%%%%%%% prevState: ", prevState);

      //...prevState는 매개변수 prevState를 복사한 복사본을 넘김. 즉 기존 값을 넘기면서
      //color의 값을 update된 값도 같이 넘김
      return {...prevState, color: "blue"};
    })
  } //updateBlueColor

  const updateRedColor = () => {
    // Because we need the current value of state, we pass a function into our setCar function. 
    // This function receives the previous value.
    // We then return an object, spreading the previousState and overwriting only the color.
    setCarHook( (previousState) => {
      //...prevState는 매개변수 prevState를 복사한 복사본을 넘김
      return {...previousState, color:"red", year: "1963"};
    } );
  } //updateRedColor

  return (
    <>
      <h2>My {carHook.brand}</h2>
      <p>
        It is a {carHook.color} {carHook.model} from {carHook.year},
      </p>
      <button
        type="button"
        onClick={updateBlueColor}
      >Blue</button>{"\u00A0"}
      <button
        type="button"
        onClick={updateRedColor}
      >Red</button>
    </>
  );
} //CarHook

//useEffect()에 대해 아래 참조할 것
//https://velog.io/@sucream/%EA%B7%B8%EB%9E%98%EC%84%9C-useEffect%EB%8A%94-%EC%96%B8%EC%A0%9C-%EC%93%B0%EB%8A%94%EA%B1%B4%EB%8D%B0%EC%9A%94
//https://velog.io/@clydehan/React-useEffect-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C-%ED%95%A8%EC%88%98%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%EC%82%AC%EC%9D%B4%EB%93%9C-%EC%9D%B4%ED%8E%99%ED%8A%B8-%EA%B4%80%EB%A6%AC%EB%B2%95
//side effect : 컴포넌트 렌더링과 직접적으로 관련되지 않는 작업. 서버에서 데이터를 가져오거나, DOM을 직접 수정하거나...
//React의 class형 컴포넌트에서는 컴포넌트의 생명주기 콜백 메서드를 통해 특정 시점에서 코드를 실행할수 있었다.
//예를 들어 컴포넌트가 마운트 되거나 업데이트 될때, componentDidMount, componentDidUpdate 같은 메서드를 사용했다.
//하지만 함수형 컴포넌트는 이러한 생명주기 메서드가 없기 때문에 이와 유사한 기능을 수행할수 있는 메커니즘이 필요했다.
//그렇게 탄생한 것이 useEffect()이다.
//useEffect는 React 컴포넌트가 렌더링된 후에 특정 작업을 수행하기 위해 사용하는 훅이다. 이때 의존성 배열을 통해
//특정 값의 상태에 따라 useEffect를 재실행할지 결정할수 있다.
function Timer() {
  const [timerCount, setTimerCount] = useState(0);
  const [runCount, setRunCount] = useState(2);

  const addCount = () => {
    console.log("runCount: ", runCount);
    setRunCount((cnt) => cnt + 1);
  }

  //useEffect()의 용처는 
  //-. 컴포넌트 처음 렌더링 시 1회 실행	useEffect(() => { ... }, []). 초기에 무언가를 할때 유용
  //-. 특정 값이 바뀔 때 실행	useEffect(() => { ... }, [변수]). 특정 조건([변수]의 값 변경시)에만 실행되게 할 
  //   뭔가에 유용
  //-. 렌더링 될 때마다 실행	useEffect(() => { ... })
  //-. 정리(clean-up) 필요 시	return () => { ... } 사용  
  //▶▶▶ 매우 중요한 점은 useEffect()의 실행 시점은 DOM이 load된 이후에 실행된다. 즉 $.ready()와 유사
  //re-rendering이 발생하면 그 re-rendering이 완료된 이후에 또 실행되는게 useEffect()이다.
  //그러나 useEffect에 return이 있으면 그 return은 새로운 re-rendering이 실행 되기 전에 return이 실행되고
  //그 후에 새로운 re-rendering이 실행된다. React는 뭔가 잘 계획된 프로그래밍이라기 보다는 짜집기식으로 그때 그때
  //뗌빵한 느낌이 많이 드네... 웃기는군
  //본 Timer 컴포넌트는 useState로 초기화 후 1초를 세고 중지하고자 하는 의도였는데
  //timerCount의 값이 변경되면 useEffect()가 또 실행되서 결국은 1초마다 계속 반복되고
  //그로 인해 다른 side effect를 초래하게 된다. 이걸 1번만 카운팅하게 할려면 useEffect()의 두 번째
  //파라미터로 [] 빈 배열을 주면 된다.
  //useEffect(<function>, <dependency>)
  //useEffect accepts two arguments. The second argument is optional.
  //useEffect runs on every render. That means that when the timerCount changes, a render happens, 
  // which then triggers another effect.
  useEffect( () => {
    setTimeout(() => {
      setTimerCount((timerCount) => timerCount + 1);
    }, 1000);
  }, [runCount]);

  // 1. No dependency passed:
  // useEffect(() => {
  //   //Runs on every render
  // });

  // 2. An empty array:
  // useEffect(() => {
  //   //Runs only on the first render
  // }, []);

  // 3. Props or state values:
  // useEffect(() => {
  //   //Runs on the first render
  //   //And any time any dependency value(여기서는 prop, state) changes
  // }, [prop, state]);

  // console.log("Timer component is rendered");

  return (
    <>
      <h2>I've rendered {timerCount} times! (rendered by 1 second delayed)</h2>
      <button
        style={{backgroundColor: 'green'}}
        type="button"
        onClick={addCount}> + </button>
    </>
  );
} //Timer


// ▶ useEffect의 동작 원리
// (1) 렌더링 후 실행
// useEffect는 React의 렌더링 단계가 모두 끝난 후에 실행된다. React는 컴포넌트를 렌더링할 때, 
// 먼저 모든 컴포넌트의 렌더링을 완료한 후, 각 컴포넌트에 설정된 useEffect를 실행한다. 
// 이 때문에 useEffect는 DOM에 접근하거나, 서버에서 데이터를 가져오는 작업에 적합하다

// (2) 아래는 컴포넌트가 mount될때 뭔가를 "한번" 실행하고, unmount될때 뭔가를 또 "한번" 실행해야한다면 useEffect()는 
// 유용하게 이 기능을 수행해 핸다.
// useEffect(() => {
//   const doSomething = ....;

//   return () => {
//      undoSomething ....
//   };
// }, []);
function TimerCleanUp() {
  const [tmCleanCnt, setTmCleanCnt] = useState(0);

  useEffect(() => {
    let mTimer = setTimeout(() => {
      setTmCleanCnt((tmCleanCnt) => tmCleanCnt + 1);
    }, 1000);

    //원래는 위의 코드가 매 초마다 실행되는데 아래 코드 때문에 1회만 실행되고 그침
    //여기서 중요한 것은 아래 return은 기존 개념 처럼 위의 함수가 실행 된 후 바로 return이 실행되는 개념이 아니다.
    //아래 return이 실행되는 시점은 TimerCleanUp 컴포넌트가 unmount될때 혹은
    //TimerCleanUp의 새로운 rendering이 실행되기 전에 실행된다.
    return () => clearTimeout(mTimer);
  }, []);

  return <h2 style={{color: 'green'}} >I've rendered {tmCleanCnt} times!! (useEffect hook cleaned up)</h2>
} //TimerCleanUp

//Here is an example of a useEffect Hook that is dependent on a variable. 
// If the counterCount variable updates, the effect will run again:
//If there are multiple dependencies, they should be included in the useEffect dependency array.
function Counter() {
  const [counterCount, setCounterCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => counterCount * 2);
  }, [counterCount]);

  return (
    <>
      <p>Count: {counterCount}</p>
      <button style={{backgroundColor: 'green'}} onClick={() => {setCounterCount((c) => c + 1)}}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
} //Counter

//useContext를 사용하지 않는 경우 특정 state를 많이 nested 컴포넌트로 전달할려면 props를 계속 매개변수로 전달해야 한다.
function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <>
      <h3>{`Hello ${user}!`}</h3>
      <Component2 user={user} />
    </>
  );
}

function Component2({ user }) {
  return (
    <>
      <h3>Component 2</h3>
      <Component3 user={user} />
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h3>Component 3</h3>
      <Component4 user={user} />
    </>
  );
}

function Component4({ user }) {
  return (
    <>
      <h3>Component 4</h3>
      <Component5 user={user} />
    </>
  );
}

function Component5({ user }) {
  return (
    <>
      <h3>Component 5</h3>
      <h3>{`Hello ${user} again!`}</h3>
    </>
  );
}

//위의 예제를 useContext를 이용해서 처리
//React Context is a way to manage state globally.
function ContextComp1(){
  const [user, setUser] = useState("Paul Joe");

  return (
    <>
      <MyUserContext.Provider value={user}>
        <h3>{`Hello Mr. ${user}!~`}</h3>
        <ContextComp2 />
      </MyUserContext.Provider>

      {/* 만일 아래와 같이 Context Provider 밖에 있으면 Comonent5에로 state 값이 전달이 안된다. */}
      {/* <ContextComp2 /> */}
    </>
    
  )
} // ContextComp1


function ContextComp2() {
  return (
    <>
      <h3>Component 2~</h3>
      <ContextComp3 />
    </>
  );
}

function ContextComp3() {
  return (
    <>
      <h3>Component 3~</h3>
      <ContextComp4 />
    </>
  );
}

function ContextComp4() {
  return (
    <>
      <h3>Component 4~</h3>
      <ContextComp5 />
    </>
  );
}

function ContextComp5(){
  const mUser = useContext(MyUserContext);

  return (
    <>
      <h3>Component 5~</h3>
      <h3>{`Hello Mr. ${mUser} again!~`}</h3>
    </>
  );
}

//The useRef Hook allows you to persist values between renders.
// It can be used to store a mutable value that does not cause a re-render when updated.
// It can be used to access a DOM element directly.
//https://velog.io/@do_dam/React-useRef
// useRef Hook의 용처는
// 1. 특정한 값을 저장할 때. useState는 값을 저장하면 re-rendering 발생하므로 단순히 값을 저장용도로 useRef 사용.
//   컴포넌트가 rendering되어도 useRef 값은 변경되지 않는다.
// 2. DOM 요소에 접근하고자 할때

function UseRefTest(){
  const [inputValue, setInputValue] = useState("");
  //{"current": 4} useRef Hook이 반환하는 것은 객체인데 그 객체의 속성명이 current인 객체를 반환한다.
  //따라서 "변수명.객체속성명"의 형태로 데이터에 접근할수 있다. count.current의 형태로 접근한다
  // var obj = {'name': 'JOE', 'age': 30};
  // var name = obj.name;
  // var age = obj.age;
  const mCount = useRef(0);

  //UseRefTest 컴포넌트가 rendering 될때 마다 실행됨
  //useEffect가 또 상당히 웃기는게 페이지 새로 고침 후 맨 처음 input에 입력하면 
  //Render Count: 여기 숫자는 실제 입력한 값보다 1 적은 값이 표시된다. 이유는
  //useEffect는 UseRefTest 컴포넌트가 rendering 후에 실행되기 때문임
  useEffect(() => {
    mCount.current = mCount.current + 1;
    //{"current": 4}
    // console.log("useRef > mCount: ", mCount);
  });

  const clearTxt = e => {
    mCount.current = 0;
    setInputValue("");
  };

  return (
    <>
      <input type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onClick={clearTxt}
      />

      <h2>Render Count: {mCount.current}</h2>
    </>
  );
} //UseRefTest

//useRef 이용 DOM 제어
function UseRefDOM(){
  const inputEle = useRef(); //최초 undefined가 됨
  // console.log("inputEle: ", inputEle); 

  const focusInput = () => {
    inputEle.current.focus();
  }

  return (
    <>
      <input type="text" ref={inputEle} /> {"\u00A0"}
      <button style={{backgroundColor: 'green'}} onClick={focusInput}>Focus Input</button>
    </>
  );
} //UseRefDOM

//to keep track of previous state values:
//w3school에서 아래 코드를 마치 useRef를 이용해서 state의 이전 값을 유지하는 것 처럼 말하는데
//진짜 웃기는게 그건 다만 화면 상에서만 그렇게 보일 뿐이다. 실행해보면 화면상에서 Current Value에 대해
//Previous Value은 이전 값을 출력해 주지만 실상 프로그램 내부적으로 inputvalue와 prevInputValue.current는
//동일한 값을 가지고 있다. prevInputValue.current가 state의 이전 값을 유지하는게 결코 아니다.
//이건 진짜 웃긴다. 만일 prevInputValue.current를 프로그램 상에서 이전 값으로 취급해서 코드를 짜면 완전 바보된다.
//React는 진짜 짜집기에 뗌빵으로 점철한 것 같다. 왜 이런 현상이 나타나는고하면.
// 화면의 input 박스에 q입력과 그 다음에 w를 입력하면 아래와 같은 로그가 출력이 된다.
// App.jsx:709 e.target.value:  q
// App.jsx:710 inputvalue > setInputValue직전:  
// App.jsx:712 inputvalue > setInputValue직후:  
// App.jsx:700 useEffect > current 할당 직전:  q

// App.jsx:709 e.target.value:  qw
// App.jsx:710 inputvalue > setInputValue직전:  q
// App.jsx:712 inputvalue > setInputValue직후:  q
// App.jsx:700 useEffect > current 할당 직전:  qw

// 즉 input에 qw까지 입력했을 때, UI 화면에 출력된 내용은 아래와 같다.
// Current Value : qw
// Previous Value : q

// Previous Value : 가 state의 이전 값을 출력하고 있는 이유는 useEffect가 실행되는 시점이 state값 변경으로 인해 
// re-rendering이 완료된 이후에 실행되기 때문에(한 템포 늦게 실행되기 때문에) "Current Value : qw"를 
// rendering 한 후에 useEffect가 실행되어 prevInputValue.current의 값을 qw로 바꾸기 때문에 
// "Current Value : qw"를 rendering하는 시점에는 prevInputValue.current에는 이전 값을 가지고 있기 때문에 
// 화면상에서 "Previous Value : q"는 이렇게 이전 값이 출력되는 것처럼 보일 뿐이다. 
// 그러나 위의 로그에서 보듯이 "Previous Value : q"일때 프로그램 내부적으로은 이미 prevInputValue.current의 값은 
// inputvalue와 동일한 값을 가지고 있게 되는 것이다. 
// React는 참 웃기고 이런 async의 미묘한 차이들이 복잡한 시스템이 되면 이걸 어떻게 다 추적해 간단말이고?
// 한마디로 화면 상에서 보이는 값이 실제 프로그램상에서 갖고 있는 값이 다르다. 이건 정말 웃기는 장면이다.
function UseRefPersiste(){
  const [inputvalue, setInputValue] = useState("");
  const prevInputValue = useRef("");

  useEffect(() => {
    // console.log("useEffect > current 할당 직전: ", inputvalue);
    prevInputValue.current = inputvalue;
    // console.log("prevInputValue.current 할당 직후: ", prevInputValue.current);
  }, [inputvalue]);

  return (
    <>
      <input type="text"
        value={inputvalue}
        onChange={(e) => {
          // console.log("e.target.value: ", e.target.value);
          // console.log("inputvalue > setInputValue직전: ", inputvalue);
          setInputValue(e.target.value);
          //React에서 state의 값을 변경 시키는 setStae()는 비동기적으로 동작한다. 즉 setInputValue()가 실행된 직후
          //바로 inputvalue의 값이 동기적으로 바뀌지 않는다. rendering 하기 직전에 inputvalue의 값이 할당되고
          //그 후 useEffect가 실행된다.
          // console.log("inputvalue > setInputValue직후: ", inputvalue);
        }
      } />
      <h3>Current Value : {inputvalue}</h3>  
      <h3>Previous Value : {prevInputValue.current}</h3>  
    </>
  );
} //UseRefPersiste


// useReducer 테스트
//useReducer는 useState와 같이 상태를 관리하는 역할인데 useState가 컴포넌트 내부에서 상태관리 하는 방식이라면
//useReducer는 컴포넌트의 상태 업데이트 로직을 컴포넌트와 분리시킬수 있게 한다. 상태 업데이트 로직을 컴포넌트 
//바깥에 작성할수도 있고 심지어 다른 파일에 작성 후 불러와서 사용할수도 있다.
//ReducerCounter외부에서 ReducerCounter의 값을 변경하기 위한 용도로 존재하는 것이 useReducer hook이다.
//그래서 mReducer()는 ReducerCounter 컴포넌트 외부에 존재하고 외부에서 ReducerCounter의 값을 변경한다. 
function mReducer(mState, action){
  console.log("mReducer>state: ", mState);
  console.log("mReducer>action: ", mState);

  switch(action.type)
  {
    case "decrement":
      return {mCount: mState.mCount - 1};
    case "increment" :
      return {mCount: mState.mCount + 1};
    default:
      throw new Error("Unsupported action type", action.type);  
  }
} //reducer

//useReducer 테스트
//https://taejinkim-devlog.tistory.com/153
// https://react.vlpt.us/
function ReducerCounter(){
  //아래에서 number는 useReducer hook이 내부적으로 관리할(그러면서 컴포넌트를 초월한 글로벌적으로 관리할) 상태로 
  //다루게되고 그 초기 값으로 {mCount: 0}을 값으로 가지고 있다가 mDispatch에 할당 된 mReducer 함수를 실행할 때
  //코드상에서 명시적으로 number를 mDispatch()의 첫번째 파라미터로 넘기지 않아도 useReducer hook이 알아서
  //mReducer()의 첫번째 매개인자인 mState에 number의 값을 할당하게 되고 mReducer()함수에서 글로벌적으로, 내부적으로
  //관리할 state인 number의 값을 변경해서 useReducer 훅이 가지고 있게 되는 식
  const [number, mDispatch] = useReducer(mReducer, { mCount: 0 });
  // console.log("ReducerCounter>number: ", number); //ReducerCounter>number:  {mCount: 0}
  // console.log("ReducerCounter>mDispatch: ", mDispatch); //여기는 함수가 들어감 mReducer와 연결됨

  return (
    <>
      <h3>Count: {number.mCount}</h3>
      <button onClick={() => mDispatch({type: "decrement"})}>--</button>
      <button onClick={() => mDispatch({type: "increment"})}>++</button>
    </>
  );
} //ReducerCounter

//useReducer 예제
function todoReducer777(todos, action){
  switch(action.type)
  {
    case 'ADD_TODO':
      //[todos, dispatch] = useReducer(todoReducer777, [])에서는 최초로 빈 배열을 todos에 할당했는데
      //추가 버튼에 의해 여기로 와서 최초 todos에 대한 배열 값이 생기는구나
      // ...todos는 자바스크립트의 spread 기능으로 배열의 기존 값(todos의 기존 값)을 복사한 것에 
      //추가로 { } 안에 있는 객체가 배열의 새로운 요소로 추가되는 형태임
      return [
        ...todos, 
        {
          id: Date.now(),
          text: action.payload,
          completed: false
        }
      ];
    //const result = array.filter(callback);
    // array: 원본 배열
    // callback: 각 요소에 대해 실행되는 함수
    //      : 이 함수가 true를 반환하면 해당 요소는 남기고
    //      : false를 반환하면 제거합니다
    // result: 조건을 만족하는 요소들로만 이루어진 새 배열
    // * 원본 배열은 변경되지 않습니다 (immutable)
    //아래는 짝수만 골라내는 예제
    // const numbers = [1, 2, 3, 4, 5, 6];
    // const evenNumbers = numbers.filter(num => num % 2 === 0);
    // console.log(evenNumbers); // ===> [2, 4, 6]
    //아래는 완료된 할 일만 골라내기
    // const todos = [
    //   { id: 1, text: "React 공부", completed: true },
    //   { id: 2, text: "점심 먹기", completed: false },
    //   { id: 3, text: "산책하기", completed: true },
    // ];
    // const completedTodos = todos.filter(todo => todo.completed);
    // console.log(completedTodos);    
    case 'DELETE_TODO' :
      return todos.filter((todo) => todo.id !== action.payload);
    case 'TOGGLE_TODO' :
      return todos.map((todo) => 
        todo.id === action.payload ? {...todo, completed: !todo.completed} : todo
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
} //todoReducer7

function TodoApp777(){
  //useReducer도 useState 훅과 같이 아래의 todos는 관리할 state 값이고 dispatch는 todos를
  //변경할 함수가 들어 있는 형태이다. 그런데 dispatch에 할당되는 함수는 todoReducer777이라는 뜻이다.
  const [todos, dispatch] = useReducer(todoReducer777, []);
  const [text, setText] = useState('');
  
  //아래에서 배열을 반환하는데 사이즈가 2이다.
  // const kkk = useReducer(todoReducer777, ['a', 'b']);
  // kkk[0]에는 ['a', 'b']라는 값이 kkk[1]에는 함수가 할당된다.
  // console.log("############ kkk: ", kkk);
  // console.log("############ kkk[0]: ", kkk[0]); //['a', 'b']
  //아래 콘솔에는 다음과 같은 값이 들어 있다.
  //ƒ dispatchReducerAction(fiber, queue, action) {
        // var args = arguments;
        // "function" === typeof args[3] && console.error(
        //   "State updates from the useState() and useReducer() Hooks…
  // console.log("############ kkk[1]: ", kkk[1]);

  const handleAdd = () => {
    if(text.trim() === '') return;
    dispatch({type: 'ADD_TODO', payload: text});
    setText(''); //기존 input text 안에 있던 값을 지움
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>📝 Todo List</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleAdd}>추가</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: "10px" }}>
            <span
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => {
                console.log("### 삭제 클릭 todo.id: ", todo.id);
                //버튼이 여러개 인데 어떤 버튼 클릭시 해당 버튼에 맞는 todo.id를 여기서 어떻게 
                //넘기는가인데 지금 아래 코드는 map으로 반복해서 버튼을 생성하는 중인데 map으로
                //버튼을 만들면서 만드는 시정에 todo.id의 값이 해당 버튼에 이미 생성 및 할당이
                //되어서 삭제 버튼이 만들어지기 때문에 todoReducer777()로 todo.id를 넘길수 있다.
                dispatch({ type: 'DELETE_TODO', payload: todo.id })
              }}
              style={{ marginLeft: "10px" }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} //TodoApp777


// 1. Reducer 함수 정의
// 이 함수는 현재 상태(todos)와 액션(action)을 받아서 새로운 상태를 반환합니다.
function todoReducer(todos, action){
  switch (action.type) {
    case 'ADD_TODO':
      // 새로운 할 일 객체를 만들어서 기존 todos 배열에 추가
      return [
        ...todos,
        {
          id: Date.now(), // 고유 ID 생성 (간단한 예시를 위해 타임스탬프 사용)
          text: action.payload.text,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      // 특정 ID의 할 일 item의 completed 상태를 토글
      return todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      // 특정 ID의 할 일 item을 배열에서 제거
      return todos.filter((todo) => todo.id !== action.payload.id);
    case 'EDIT_TODO':
      // 특정 ID의 할 일 item의 텍스트를 수정
      return todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.newText } : todo
      );
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
} //todoReducer

// 2. useReducer를 사용하는 TodoList 컴포넌트
function TodoList(){
  // useReducer 훅을 사용하여 할 일 목록 상태를 관리합니다.
  // 두 번째 인자로 빈 배열([])을 초기 상태로 전달합니다.
  const [todos, dispatch] = useReducer(todoReducer, []);

  // 새로운 할 일 입력을 위한 로컬 상태
  const [newTodoText, setNewTodoText] = useState('');

  // 수정 모드 활성화를 위한 로컬 상태
  const [editingId, setEditingId] = useState(null);
  const [eidtText, setEditText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    if (newTodoText.trim() === '') return; // 빈 문자열은 추가하지 않음

    dispatch({ type: 'ADD_TODO', payload: { text: newTodoText } });
    setNewTodoText(''); // 입력 필드 초기화
  };

  const handleEditStart = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleEditSave = (id) => {
    if (editText.trim() === '') return;
    dispatch({ type: 'EDIT_TODO', payload: { id: id, newText: editText } });
    setEditingId(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div style={{padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px'}}>
      <h2>My Todo List</h2>

      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px', display: 'flex' }}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="새로운 할 일을 추가하세요..."
          style={{ flexGrow: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          추가
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #eee',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#333',
            }}
          >
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flexGrow: 1, padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
                />
                <button onClick={() => handleEditSave(todo.id)} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>저장</button>
                <button onClick={handleEditCancel} style={{ marginLeft: '5px', padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>취소</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}
                  style={{ flexGrow: 1, cursor: 'pointer' }}
                >
                  {todo.text}
                </span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => handleEditStart(todo.id, todo.text)}
                    style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_TODO', payload: { id: todo.id } })}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>할 일이 없습니다. 새로 추가해보세요!</p>
      )}
    </div>
  );
} //TodoList

//useCallbak 테스트 from w3schools
//여기서 보여주고자하는 건 todo 항목 추가되지 않고 단지 (+) 버튼 클릭만으로도 
//TodosUseCallbak 컴포넌트가 re-rendring되는 걸 보여주고자 함이다. 
//여기서 이 컴포넌트가 있으면 useCallbak 훅이 정상 동작하지 않음. momo로 export해야 함.
//TodosUseCallbak.jsx를 참조할 것
// function TodosUseCallbak({todosCallback, addTodoCallback}) {
//   console.log("TodosUseCallbak render");

//   return (
//     <>
//       <h2>My Todos(useCallback)</h2>
//       {todosCallback.map((todo, index) => {
//         return <p key={index}>{todo}</p>
//       })}
//       <button style={{backgroundColor: 'green'}} onClick={addTodoCallback}>Add Todo</button>
//     </>
//   );
// } //TodosUseCallbak


  ////////// useMemo 테스트 from w3school : 시작
  //아래 함수가 실행되는데 시간이 적잖이 소요된다. 따라 이런 함수가 매 렌더링 마다 불필요하게 싫행되면 곤란
  const expensiveCalc = (num) => {
    console.log("*** expensiveCalc...~");
    for(let i=0; i< 2800000000; i++){
      num += 1;
    }

    return num;
  }
  ////////// useMemo 테스트 from w3school : 끝


////////////////////////////

function App() {

  const [count, setCount] = useState(0)
  
  var [idx, setIdx] = useState(0);
  const msgObj = [
		'Click me ⇒ Hello world from Joe',
		'Click me ⇒ HI REACT FROM JOE.Y.J.'
	];

  const [msg, setMsgVal] = useState(msgObj[idx])
  console.log("############ App()~~ idx ", idx);
  console.log("############ App()~~ msg ", msg);

  /// memo 기능 테스트용 using Todos component
  const [todoCnt, setTodoCnt] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);

  const increment = () => {
    //아래 코드의 의미는 현재 todoCnt의 값을 c로 받아서 그것에 1을 더한 것으로
    //todoCnt의 값에 할당하라는 뜻. 아래 코드는 풀어쓰면 이런 뜻이다.
    // setTodoCnt(function(c){ 
    //   return c + 1 
    // });
    setTodoCnt((c) => c + 1);
  } //increment

  //CSS Style을 아래와 같이 JavaScript 객체 형태로 만들어서 사용할수 있다.
  //React에서 CSS의 속성명은 camelCase로 작성해야 한다. backgroud-color ==> backgroundColor와 같이
  //To style an element with the inline style attribute, the value must be a JavaScript object
  //따라서 <h1 style={{color:"green"}}과 같이 해야 한다.
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif"
  };

  //////////// TodosUseCallbak 용 : 시작
  const [cntCallback, setCntCallback] = useState(0);
  const [todosCallback, setTodosCallback] = useState([]);

  const incrementCallback = () => {
    setCntCallback((c) => c + 1);
  };

  //이 상태로는 (+) 클릭시 마다 TodosUseCallbak 컴포넌트 다시 그려짐
  // const addTodoCallback = () => {
  //   setTodosCallback((t) => [...t, "New Todo-callback"]);
  // };

  //아래는 useCallback hook을 이용해서 todosCallback의 값이 변경되지 않으면 TodosUseCallbak를
  // re-rendering되지 않게 함
  const addTodoCallback = useCallback(() => {
    setTodosCallback((t) => [...t, "New Todo-callback"]);
  }, [todosCallback]) ;
  //////////// TodosUseCallbak 용 : 끝
  // https://cocoon1787.tistory.com/798

  ////////// useMemo 테스트 from w3school : 시작
  const [countUseMemo, setCountUseMemo] = useState(0);
  const [todosUseMemo, setTodosUseMemo] = useState([]);
  //자원 사용이 높은 아래 함수가 [ + ]를 눌러서 countUseMemo의 값이 바뀔때는 당연히 실행되어 하지만
  //"할 일 추가" 버튼을 클릭했을 때는 아래 함수와 상관없는 동작이기 때문에 아래 함수가 실행되면 자원 낭비가 된다.
  //실제로 "할 일 추가" 버튼을 클릭하면 시간이 한참 지난 후에 "새 할 일n"이 추가된다.
  //따라서 이런 성능 이슈를 해결하기 위해 useMemo 훅을 사용한다.
  // const calc = expensiveCalc(countUseMemo);
  //아래는 useMemo훅을 사용해서 기존 계산된 결과 값을 다시 재사용하도록 했다. countUseMemo의 값이 변경될 때만
  //아래 비싼 함수가 실행되도록 했다.
  const calc = useMemo(() => expensiveCalc(countUseMemo), [countUseMemo]);

  const incrementUseMemo = () => {
    console.log("incrementUseMemo~~~");
    setCountUseMemo((prev) => prev + 1);
  }

  const addTodoUseMemo = () => {
    console.log("addTodoUseMemo~~~");
    setTodosUseMemo((prev) => [...prev, "새 할 일" + countUseMemo]);
  }

  //이 함수가 여기 있으니까 에러 발생
  //위의 const calc = expensiveCalc(countUseMemo); 이 코드 실행시 아래와 같은 에러 발생
  //Uncaught ReferenceError: Cannot access 'expensiveCalc' before initialization
  //해법은 아래 함수 앞에 const calc = expensiveCalc(countUseMemo);를 두지 말고 아래 함수
  //뒤에(아래에) const calc = expensiveCalc(countUseMemo);를 두면 해결된다.
  //아니 React는 아주 예전 C에서 하던 것 같은 구닥다리 방식을 행하나? 순서가 영향을 받다니...
  //혹은 방법은 App() 밖에 expensiveCalc()를 두면 된다.
  // const expensiveCalc = (num) => {
  //   console.log("*** expensiveCalc...~");
  //   for(let i=0; i< 2800000000; i++){
  //     num += 1;
  //   }

  //   return num;
  // }

  // const calc = expensiveCalc(countUseMemo);

  ////////// useMemo 테스트 from w3school : 끝

  //custom hook 만들기
  //When you have component logic that needs to be used by multiple components, 
  //we can extract that logic to a custom Hook. Custom Hooks start with "use". Example: useFetch.
  //customHook 디렉토리 아래의 useFetch.jsx가 custom hook역할을 한다.
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h3 id="mTitle">Vite + React</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Joe title={msg} index={idx} 
          toChangeText={(i) => {
                    console.log("클릭 후 App() i : ", i);
                    console.log("클릭 후 App() setMsgVal()  이전 idx : ", idx);
                  setMsgVal(msgObj[i]);
                    console.log("클릭 후 App() setMsgVal() 직후 msg : ", msg);
                    console.log("클릭 후 App() setIdx 이전 idx : ", idx);
                  setIdx(i); 
                    console.log("클릭 후 App() setIdx 직후 idx : ", idx);
          }} 
          showHaha={e => {console.log('$$$$$$$$ HaHa ^_^ - showHaha()함수임~')}}
          showHohoho={e => {
              for(let i=0; i<7; i++){
                console.log('*** Hohoho~~~ ^__^/ i = ', i);
              }
	        }}
      ></Joe>	
      
      {/* 아래의 getResult라는 props name에 showResult라는 함수를 props value로 할당했고
        Football 컴포넌트에서는 props.getResult로 함수를 실행하면 그에 해당하는 함수인
        showResult를 inline식이 아닌 별도의 함수를 빼도 된다. */}
      <Football getResult={showResult}></Football>   
      <Garage></Garage>
      <People></People>
      <MyForm></MyForm>
      <br/>
      <MyFormMultiInput></MyFormMultiInput><br/>
      <MyFormTextArea></MyFormTextArea>
      <MySelectBox></MySelectBox>
      <br/><hr/>      
      {/* Router 기능을 위해 */}
      <Routes>
        {/* 부모 컴포넌트와 자식 컴포넌트 사이에서 중요한 개념은 자식은 부보를 대체해서
           표시되는것이 아니라 부모가 표시된 상태를 그대로 둔 채로 추가로 자식이 표시 
           되는 형식이라는 점 유의. 따라서 Layout 컴포넌트는 항상 표시되는 가운데서
           나머지 자식 컴포넌트들이 바꿔 가면서 표시되는 방식이다. */}
        {/* Layout이 아래 나머지들의 부모 */}
        <Route path="/" element={<Layout />}>
          {/* 아래 index attribute은 자식 라우트(경로) 중에서 path="/"인 경우
              기본으로 보여줄 컴포넌트를 지정할 때 사용 */}
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          {/* Contact가 Tel의 부모 */}
          <Route path="contact" element={<Contact />} >
              <Route path="tel" element={<Tel />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <hr/>
      <Todos todos = {todos} />
      <hr/>
      <div>
        {/* 아래의 + 버튼 클릭시마다 Todos 컴포넌트가 매번 호출 및 rendering 발생
          성능 이슈 발생. 이걸 해결하는게 memo. memo를 사용하면 
          props의 값(여기서는 Todos가 받는 todos)이
          변경되지 않으면 Todos 컴포넌트는 실행되지 않는다.  */}
        Count: { todoCnt } {"\u00A0"} {"\u00A0"}
        <button onClick={increment}> + </button>
      </div>
      <hr/>
      <h2 style={myStyle}>Hello Style!</h2>
      <p>Add a little style!</p>
      <hr/>
      <CarHook></CarHook>
      <hr/>
      <Timer></Timer>
      <hr/>
      <TimerCleanUp></TimerCleanUp>
      <hr/>
      <Counter></Counter>
      <hr/>
      <Component1></Component1>
      <hr/>
      <ContextComp1></ContextComp1>
      <hr/>
      <UseRefTest></UseRefTest>
      <hr/>
      <UseRefDOM></UseRefDOM>
      <hr/>
      <UseRefPersiste></UseRefPersiste>
      <hr/>
      <ReducerCounter></ReducerCounter>
      <hr/>
      <TodoApp777></TodoApp777>
      <hr/>
      <TodoList></TodoList>
      <hr/>
      <>
        <TodosUseCallbak todosCallback={todosCallback} addTodoCallback={addTodoCallback}></TodosUseCallbak>
        <br/>
        <div>
          Count of callback : {cntCallback}
          <button onClick={incrementCallback}>(+)</button>
        </div>
      </>  
      <hr/>
      {/* https://cocoon1787.tistory.com/798 
        useCallback은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용하는 hook이다.
        특정 컴포넌트 안에 함수가 선언되어 있을 때 이 함수는 해당 컴포넌트가 렌더링 될때마다 새로운 함수가 생성되는데
        useCallback을 사용하면 해당 컴포넌트가 렌더링 되더라도 그 함수가 의존하는 dependency가 바뀌지 않는한 
        기존 함수를 재사용할수 있다.
        useCallback은 React.memo와 함께 자식 컴포넌트의 불필요한 렌더링을 최적화할수 있는데 침실, 주방, 욕실이라는
        자식 컴포넌트를 각각 해당 dependency 값의 변경시만 불을 켜도록 하는 예제이다. useCallback 문법은 아래와 같다.
        const memoizedCallback = useCallback(function, deps);
        memoizedCallback은 cache로 저장해 두었다가 deps값 변경 없으면 재 사용하는 방식이다.
        useCallback, useMemo 훅은 자원 사용이 높은 함수들이 불필요하게 재실행되는 걸 막기위함 때문이다.
      */}
      {/* <div style={{ position: "absolute", top: "50%", left: "50%" }}> */}
      <div>
        <SmartHome />
      </div>      
      <hr/>
      <h2>나의 할일(useMemo hook)</h2>
      <button style={{backgroundColor: 'green'}} onClick={addTodoUseMemo}>할 일 추가</button>
      {todosUseMemo.map((todo, index) => {
        return <p key={index}>{todo}</p>
      })}
      <br/>--------------------------<br/>
      <div>
        Count: {countUseMemo} {"\u00A0"} {"\u00A0"} 
        <button style={{backgroundColor: 'green'}} onClick={incrementUseMemo}>[ + ]</button>
        <h3>Expensive Calculation</h3>
        {calc}
      </div>
      <hr/>
      {/* 아래서 data && map의 형태를 한 것은 data가 null, undefined, false 등이 아니면 뒤에 나오는
        map()을 실행함. 즉 data가 존재할 때만 map()을 실행하도록 조건 검사하는 부분임.
        fetch된 데이터는 json 형태로 id, title...등의 속성을 갖는 데이터임 */}
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>
        })}
      <br/><hr/>      
      
    </>
  ) //return

  function showResult(_val, e){
    alert("Goal In ~~~" + _val);
    alert("이벤트 종류: " + e.type);
  }  
} //App

export default App
