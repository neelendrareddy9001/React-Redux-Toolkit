import PostList from './features/PostList';
import './App.css';
import AddPostForm from './features/AddPostForm';

function App() {
  return (
    <main className='App'>
      <AddPostForm/>
      <PostList/>
    </main>
  );
}

export default App;
