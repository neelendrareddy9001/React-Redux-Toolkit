import './App.css';
import PostList from './features/Posts/PostList';
import AddPostForm from './features/Posts/AddPostForm';

function App() {
  return (
    <main className='App'>
      <AddPostForm/>
      <PostList/>
    </main>
  );
}

export default App;
