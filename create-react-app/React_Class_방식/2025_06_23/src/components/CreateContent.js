import React, { Component } from 'react';

class CreateContent extends Component {
   render(){
      //console.log('Content render');
      return(
           <article>
                <h2>Create</h2>
                <form action="create_process" method="post"
                        //onSubmit 이벤트는 submit 버튼 클릭시 아래에서 아벤트를 처리하겠다. html 고유의 기능임
                        onSubmit={function(e){
                                //아래는 submit 버튼 클릭시 원래 html동작은 페이지 전환이
                                //발생하는데 페이지 전환 없이 하는 React에서는 이 페이지 전환을
                                //막기 위해 아래 코드 필요
                                e.preventDefault();
                                // alert("Submit....");
                                this.props.onSubmitJOE(
                                        e.target.title.value, 
                                        e.target.desc.value
                                );
                        }.bind(this)} 
                >
                    <p><input type="text" name="title" placeholder="title"></input></p>  
                    <p><textarea name="desc" placeholder="description"></textarea></p>   
                    <p><input type="submit"></input></p>
                </form>
           </article>
      );
   }
}

export default CreateContent;
