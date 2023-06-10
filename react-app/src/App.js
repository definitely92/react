import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function Article(props) {
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}
function Header(props) {
  return <header>
  <h1><a href='/' onClick={event => {
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>);
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}
function Create(props) {
  return <article>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value; //event가 일어난 form을 target으로 잡고 그 안에 있는 title의 value
      const body = event.target.body.value;
      props.onCreate(title,body);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='create'></input></p>
    </form>
  </article>
}
function App() {
  const [mode,setMode] = useState('WELCOME');
  const [id,setId] = useState(null);
  const [nextId,setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id : 1, title:'html', body : 'html is...'},
    {id : 2, title:'css', body : 'css is...'},
    {id : 3, title:'javascript', body : 'js is...'}
  ]);
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    let title , body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id );
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE') {
    content = <Create onCreate={(_title,_body) => {
      const newTopic = {id:nextId, title:_title, body: _body};
      const copyTopics = [...topics]; // topics 복제
      copyTopics.push(newTopic); // 복제한topics에 새로 생성된 topic 넣기
      setTopics(copyTopics); //topics와 복제한 topics가 다르면 컴포넌트를 다시 렌더링
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
         setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <a href='/create' onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
    </div>
  );
}
export default App;
