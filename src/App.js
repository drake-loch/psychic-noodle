import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/firebase/AuthContext';
import Landing from './components/Pages/Landing/Landing';
import Post from './components/Pages/Post/Post';
import PostBrowser from './components/Pages/PostBrowser/PostBrowser';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/post-browser" component={PostBrowser} />
          <Route path="/post/:id" exact component={Post} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
