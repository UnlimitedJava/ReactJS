import React, { Component } from 'react';

class UpdateContent extends Component {
   constructor(props){
        super(props);
        this.state = {
                mId: this.props.mData.id,
                mTitle: this.props.mData.title,
                mDesc: this.props.mData.desc
        }
        //onChange = {this.inputFormHandler.bind(this)} 이렇게 매번 함수 뒤에 bind(this)를 하지 않을려면
        //아래와 같이 하면 된다.
        this.inputFormHandler = this.inputFormHandler.bind(this);
   } //constructor    

   //input 항목의 onChange()에 중복코드를 아래 함수로 묶기
   inputFormHandler(e){
        //[e.target.name]에는 titleJOE, descJOE가 각각 input 입력항목, textarea 입력항목에 값 변경시마다 담기게 된다.
        console.log("############## e.taget.name :  ", [e.target.name]);
        console.log("############## e.taget.name222 :  ", e.target.name);
        this.setState({[e.target.name]: e.target.value}); 
   } //inputFormHandler

   render(){
      console.log('UpdateContent render: ', this.props.mData);
      return(
           <article>
                <h2>Update</h2>
                <form action="create_process" method="post"
                        //onSubmit 이벤트는 submit 버튼 클릭시 아래에서 아벤트를 처리하겠다는 
                        // html 고유의 기능임
                        onSubmit={function(e){
                                //아래는 submit 버튼 클릭시 원래 html동작은 페이지 전환이
                                //발생하는데 페이지 전환 없이 하는 React에서는 이 페이지 전환을
                                //막기 위해 아래 코드 필요
                                e.preventDefault();
                                // alert("Submit....");
                                this.props.onSubmitUpdate(
                                        // e.target.titleJOE.value, 
                                        // e.target.descJOE.value
                                        this.state.mId,
                                        e.target.mTitle.value, 
                                        e.target.mDesc.value                                        
                                );
                        }.bind(this)} 
                >  
                    {/* 수정할 항목이 몇 번째인지 알리는 값 */}
                    <input type="hidden" name="mId" value={this.state.mId}></input>

                    <p><input
                         type="text" 
                        //name을 titleJOE로 하면 안된다. 왜냐하면 constructor의 state의 두 속성 명이 mTitle, mDesc이기 때문이다.
                        //name="titleJOE" 
                        name="mTitle" 
                        // input의 value={this.props.mData.mTitle}과 같이하면 입력항목이 readonly가 됨 
                        //state를 이용해서 값을 할당해 주면 onChange() 통해 값 변경 가능
                         value={this.state.mTitle} 
                        //아래 onChange()가 input의 입력 값 들어올때마다 입력 항목에 값 표시되게 함  
                        //  onChange={function(e){
                        //         // console.log(e.target.value);
                        //         this.setState({mTitle:e.target.value}); 
                        //  }.bind(this)}
                        //위와 같이 onChange() 내용을 매번 써 주는대신 inputFormHandler()를 만들어 처리
                        //아래에서 매번 bind(this)를 하지 않도록 할려면 constructor()에서 아래와 같이 해 주면
                        //bins(this)를 생략해도 된다.
                        //this.inputFormHandler = this.inputFormHandler.bind(this);
                        //  onChange = {this.inputFormHandler.bind(this)}
                        onChange = {this.inputFormHandler}
                         placeholder="title">
                       </input>
                    </p>  
                    <p><textarea 
                        //name을 descJOE로 하면 안된다. 왜냐하면 constructor의 state의 두 속성 명이 mTitle, mDesc이기 때문이다.
                        //name="descJOE" 
                        name="mDesc" 
                        value={this.state.mDesc} 
                        // onChange={function(e){
                        //         this.setState({mDesc: e.target.value});
                        // }.bind(this)}
                        //onChange={this.inputFormHandler.bind(this)}
                        //아래에서 bind(this)를 없애기 위해 constructor()에서 bind된 inputFormHandler 만들었기 때문
                        onChange={this.inputFormHandler}
                        placeholder="description"></textarea>
                    </p>   
                    <p><input type="submit"></input></p>
                </form>
           </article>
      );
   }
}

export default UpdateContent;
