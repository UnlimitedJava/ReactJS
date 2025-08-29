import React, { Component } from 'react';

{/* TOC는 내부적으로 data라는 props 정보를 가지고 있다. */}
class TOC extends Component {
	//아래 함수는 render() 이전에 실행된다. 이 함수의 반환 값이 false이면 render()는 
	//호출되지 않고 true이면 render()가 호출된다.
	shouldComponentUpdate(newProps, newState){
		//newProps, newState는 새로 바뀐 것이 있는지 여부를 체크할수 있는 용도
		//,this.props.data는 이전 값
		//,newProps.data는 바뀐 새로운 props 값
		//만일 App.js에서 this.state.contents.push()로 값 변경하면 newProps.data와
		//this.props.data가 동일해 진다. 따라서 this.state.contents.concat()으로 변경하면
		//newProps.data와 this.props.data의 값이 다르다.
		console.log('=====> TOC shouldComponentUpdate'
			,newProps.data
			,this.props.data
		);

		//TOC의 목록의 변경 사항이 없으면 목록 내용을 다시 그리지 않게 함
		if(this.props.data === newProps.data){
			return false;
		}

		//아래에서 true를하면 TOC의 props나 state가 변경되었을 때 TOC에 소속된 render()가 호출
		//반대로 false를 리턴하면 props, state가 변경되어도 render()가 호출 안됨. 기본은 true반환
		return true;
	}

	render(){
		console.log('####### TOC render');
		var data = this.props.data;
		var lists = [];
		var i = 0;
		
		while(i < data.length){
			const crrItem = data[i]; // i가 변하기 전에 저장

			lists.push(
				<li key={data[i].id}>
					<a href={"/content/" + data[i].id + ".html"}
						//a 태그에 새로운 속성을 하나 지정할 때 data-로 시작하는 변수를 하나 만들면 새로운 속성을 
						//a 태그에 지정하는게 되는데 이 속성 값을 이용해서 어느 항목에 클릭 이벤트가 발생했는지
						//처리하면된다. 이때 매우 중요한 것은 data-로 시작하는 속성 지정시 반드시 소문자로 해야한다.
						//즉 data-idJOE는 안되고 data-idjoe는 된다.
						//아래 data-idjoe가 실행된 html 내용은 아래와 같다.
						// <ul>
						// <li><a href="/content/1.html" data-idjoe="1">HTML^^</a></li>
						// <li><a href="/content/2.html" data-idjoe="2">CSS^^</a></li>
						// <li><a href="/content/3.html" data-idjoe="3">JavaScript^^</a></li>
						// <li><a href="/content/4.html" data-idjoe="4">JOE Y.J</a></li>
						// </ul>
						//따라서 클릭한 항목의 e.target.dataset.idjoe으로 값을 가져올수 있다.
						//<a> 태그가 생성될때마다 data-idjoe 속성 값이 생성되서 값을 여기에 저장함
						data-idjoe={data[i].id}
						//매개변수 e는 시스템에서 알아서 자기 자신 객체를 할당해 줌
						onClick={function(e){ //이건 data-idjoe와 같은 속성을 이용한 방식
						// onClick={function(mId, e){ //이건 bind()의 매개변수 이용하는 방식.
							e.preventDefault();
							//아래에서 에러 발생. 이유는 클릭 이벤트가 실행될때 i의 값을 사용하려는데
							//i는 while이 끝나고 나면 data.length가 되어 있어서 유효하지 않은 index가 됨
							//따라서 에러가 발생
							//console.log(data[i].id); //여기서 에러가 발생한다.
							console.log('▶▶▶####### data[i].id : ', crrItem.id); //

							//a태그에 새로 생성된 속성인 data-로 시작하는 속성에 접근은 e.target.dataset.idjoe로 
							//접근가능하다. 이 data-idjoe의 값을 아래 함수의 매개인자로 넘겨서 TOC 컴포넌트를
							//사용하는 곳(App.js)의 onChangePageJOE()의 매개변수로 받아서 selected_content_id에 
							//할당하면된다.  
							this.props.onChangePageJOE(e.target.dataset.idjoe); //data-idjoe 속성 이용하는 방식
							//this.props.onChangePageJOE(crrItem.id); //이것도 가능
							//this.props.onChangePageJOE(data[i].id); //이런식으로는 안된다.

							//아래는 data-idjoe와 같은 속성의 방식이 아닌 bind()의 매개인자 방식으로
							//처리하는 방식이다.
							// this.props.onChangePageJOE(mId); //이 방식도 가능
						}.bind(this)} //data-idjoe와 같은 속성에 의한 방식
						// }.bind(this, data[i].id)} //bind()의 매개변수 이용하는 방식
												 //data[i].id가 onClick의 function의 매개변수 mId로
												 //값이 할당된다.
												 //매개변수 this는 함수 안에서도 props를 사용하기 위해 필요
					>{data[i].title}</a>
 				</li>);
			i = i + 1;
		}

		return(
			<nav>
				<ul>
				{lists} 
				</ul>
			</nav>
		);
	} //render
}

export default TOC;
