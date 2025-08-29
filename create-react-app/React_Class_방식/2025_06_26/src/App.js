import logo from './logo.svg';
import React, { Component } from 'react';
//import './App.css';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";

//본 프로그램은 contents의 값이 변경되지 않아도 즉 contents의 내용 클릭만해도 
// TOC가 계속 호출되는 형태이다.
//따라서 TOC의 shouldComponentUpdate()를 통해서 content의 내용이 변경되지 않았으면
//TOC 컴포넌트의 render()가 호출되지 않게 제어해야 한다. 성능향상 문제
class App extends Component {
	constructor(props){
		super(props);
		//아래 값을 state의 값으로 하지 않은 이유는 state에 포함시키면 이 값이
		//변경될때 불필요한 rendering이 발생하기 때문에 별도의 변수로 함
		this.max_content_id = 3;
		this.state = {
			mode: 'create',
			selected_content_id:2,
			subjectJOE:{title: 'WEB !~~~', sub:'World Wide Web !~~~'},
			welcome: {title:'Welcome', desc: 'Hello, React!!!'},
			contents: [
				{id:1, title:'HTML^^', desc:'HTML is Hypertest ...'},
				{id:2, title:'CSS^^', desc:'CSS is for design'},
				{id:3, title:'JavaScript^^', desc:'JavaScript is for interactive'}
			]
		}
	}

	//현재 클릭한 항목의 title과 desc를 반환
	getReadContent(){
			var i = 0;
			while(i < this.state.contents.length){
				var data = this.state.contents[i];
				if(data.id === this.state.selected_content_id){
					return data;
					break;
				} //if
				i = i + 1;
			} //while
	} //getReadContent

	//맨 하단의 내용(content)를 클릭시마다 그에 맞는 내용으로 표시하는 기능
	//컴포넌트를 동적으로 관리(_article 변수에 각 Component를 담아서 반환). 
	//클릭 동작에 맞는 내용을 담은 컴포넌트를 반환
	getContent(){
		//console.log('App render');
		var _title, _desc, _article = null;

		if(this.state.mode === 'welcome'){
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc; 
			_article = <ReadContent title={_title} desc={_desc} /> 
		} else if(this.state.mode === 'read'){
			var _content = this.getReadContent(); //현재 클릭한 항목의 title과 desc를 반환
			_article = <ReadContent title={_content.title} desc={_content.desc} /> 
			//_title = this.state.contents[0].title;
			//_desc = this.state.contents[0].desc;
		} else if(this.state.mode === 'create'){
			_article = <CreateContent onSubmitJOE={function(_title, _desc){
				//add new content to this.state.contents
				// alert(_title + " : " + _desc);
				this.max_content_id = this.max_content_id + 1;

				//push()원본 배열을 변경함. 
				// this.state.contents.push(
				//  {id:this.max_content_id, title:_title, desc:_desc} 
				// );

				//var arr = [1, 2];
				//arr.push(3);
				//arr 원본 값 자체가 변경되서 arr = [1, 2, 3]이 됨
				//그러나 concat()을 이용해서 배열의 값을 추가하면 원본이 변경되지 않음
				//var arr2 = [1, 2];
				//var result = arr2.concat(3);
				//arr2 = [1, 2]이고 result = [1, 2, 3]처럼 되서 원본 arr2는 변경 안됨
				//state의 배열을 바꿀때는 push()보다는 concat()을 사용을 추천함

				//var newMyArr = Array.from(myArr)로 생성된 새로운 배열 newMyArr은 비록 myArr과
				//배열 값 자체가 동일해도 동일하지 않은 것으로 취급. 따라서 shouldComponentUpdate()의
				//newProps 등을 통해 이전 값과 새로운 값을 비교할 때 push()로 newMyArr을 변경해도
				//newProps와 this.props의 값을 다른 것으로 취급한다.
				//console.log()로 비교해 볼 것
				//따라서 아래와 같은 방식도 가능하다.
				// var newContents = Array.from(this.state.contents);
				// newContents.push({id:this.max_content_id, title:_title, desc:_desc});
				// this.setState({contensts: newContents});
				//배열의 경우는 Array.from()을 이용하면 되는데 객체의 경우 원본 객체 변경 없이
				//할려면 새로운 객체 복제하는 var b = Object.assign({}, 원본객체); 이 함수의 첫번째는 빈 객체를
				//매개변수로 전달하면 된다. 이렇게 반환하는 새로운 객체 b는 원본의 복제본으로 원본 변경 없이
				//객체의 값을 변경할 수 있다.
				//var a = {name: 'egoing'};
				//var b = Object.assign({}, a);
				//console.log(a, b, a === b);
				//결과는 {name: 'egoing'}, {name: 'egoing'}, false가 반환되고 b가 a객체의 복제본
				//이지만 서로 전혀 다른 객체로 취급한다.
				var mContents = this.state.contents.concat(
					{id:this.max_content_id, title:_title, desc:_desc}
				);

				this.setState({
					contents: mContents,
					mode: 'read',
					selected_content_id: this.max_content_id
				});
			}.bind(this)}></CreateContent>
		} else if(this.state.mode === 'update'){
			var _content = this.getReadContent();
			_article = <UpdateContent 
							  mData = {_content}
							  onSubmitUpdate={function(_id, _title, _desc){
									//alert("UpdateContent : " + _id + " // " + _title + " // " + _desc);
									var _contents = Array.from(this.state.contents);
									var i = 0;
									while(i < _contents.length){
										if(_contents[i].id === _id){
											_contents[i] = {id:_id, title:_title, desc:_desc};
											break;
										}

										i = i + 1;
									} //while

									// mode를 read로 바꾸면 update후 바뀐 내용으로 상세보기 내용(content)이 바뀌게
									this.setState({
										contents: _contents,
										mode: 'read' 
									});
							  }.bind(this)}
						  ></UpdateContent>
		} //else if

		return _article;
	} //getContent

	render() {
		//console.log('*** render-this: ', this);
		return (
			<div className="App">
				{/* <Subject title="WEB" sub="World Wide Web!!!"/> */}
				<Subject 
					title={this.state.subjectJOE.title} 
					sub={this.state.subjectJOE.sub}
					//Subject.js에서 만든 Subject 컴포넌트를 사용하는 중인데 title, sub, onChangePageJOE는
					//props name이고 이들 각  props name에 props value를 주는데 아래는 함수를 value로 줌
					onChangePageJOE = {function(){
						//alert('hihi~~~~~~~');
						this.setState({mode:'welcome'});
						{/*
						if(this.state.mode === 'read'){
							this.setState({mode:'welcome'});
						} else if (this.state.mode === 'welcome'){
							this.setState({mode:'read'});
						}
						*/}
					}.bind(this)}
					>
				</Subject> 
				{/* ****** 테스트 용도 
                        	<header>
                                	<h1><a href="/" onClick={function(e){
							e.preventDefault(); 
							console.log(e);
							var str = '';
							if(this.state.mode === 'read'){
								str = 'welcome';
							} else if (this.state.mode === 'welcome'){
								str = 'read';
							}	
							//아래의 this는 이벤트 호출시 실행되는 함수 안에서는 컴포넌트 자신을
							//가리키지 않고  아무 값도 셋팅되어 있지 않음. 이 문제 해결할려면
							//함수가 끝나는 곳에서 .bind(this)를 해 주면 됨. 그러면 이 함수 안의
							//this는 컴포넌트 자신이 됨. 그러나 아래에서 에러는 안나지만 state가
							//변경되었다고 react가 인식을 못함
							// this.state.mode = 'welcome';
							//위와 같은 코드 대신에 아래와 같이해야 state의 값을 정상적으로 변경가능
							this.setState({
							   mode: str //'welcome'
							});
							//alert('hi');
						}.bind(this)}>{this.state.subjectJOE.title}</a></h1>
                                	<h3>{this.state.subjectJOE.sub}</h3>
                        	</header>
				테스트 용도 ***** */}
				<hr/>
				{/* 여기서 title, sub를 props name이라고 하고 
				 React, For UI를 props value라고 한다 
				 이렇게 props는 외부에서 사용자가 사용하는 속성 정보이고 state는 내부에서 사용하는 정보
				 이렇게 props는 그 Component를 사용하는 사용자에게 중요한 정보이다.
				 반면에 그 컴포넌트 사용자에게는 알필요도 없고 알수도 없는 정보를 state라고 한다. 
				<Subject title="React" sub="For UI"/>	
				<hr/>
				*/}

				{/* TOC라는 컴포넌트의 data라는 props에 state의 값 중에서 
					contents라는 속성의 값을 주입 */}
				<TOC 	
					onChangePageJOE={function(param){
						//alert('param: ' + param);
						this.setState({
							mode: 'read',
							//아래 속성에 지정되는 값의 title, desc가 Content 내용에 표시됨
							//아래 속성의 값을(1,2,3중 어느 값) 지정하는 건 TOC 컴포넌트에서 처리
							//props나 state의 값이 바뀌면 해당되는 컴포넌트의 render()가 자동 호출.
							//즉 props나 state의 값이 바뀌면 화면이 다시 그려진다.
							selected_content_id:Number(param)
						});
					}.bind(this)} 
					data={this.state.contents} />
				<hr/>
				{/* Control 컴포넌트는 Create, Update, Delete 기능 용도의 컴포넌트임 */}
				<Control onChangeMode={function(_mode){
						// alert(_mode);
						this.setState({
							mode: _mode
						});
					}.bind(this)}>
				</Control>
				<hr/>

				{/* <ReadContent title={_title} desc={_desc} /> 
					이 영역이 클릭 이벤트 종류에 따라 ReadContent 컴포넌트가 정의한 형식대로의
					내용이 나오는 영역인데 컴포넌트 종류 자체도 위와 같이 하드 코딩형식으로 뿐만 아니라
					동적으로 컴포넌트를 사용할수 있는 방식이 컴포넌트도 변수에 담아서 아래와 같은
					방식으로 활용할수 있다.
				*/}

				{/* 컴포넌트를 아래와 같이 변수에 담아서 컴포넌트를 동적으로 사용할수도 있다.
				{_article} */}

				{this.getContent()}

				<hr/>
				<h5 >일반적인 html 태그임</h5>
			</div>
		);
	}
}

export default App;
