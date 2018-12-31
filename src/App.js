import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <a href="https://github.com/grace-ko" target="_blank" className="link">ABOUT</a>
            <Link to='/' className="link">HOME</Link>
            <Link to='/library' className="link">LIBRARY</Link>
          </nav>
          <Link to="/"><h1 className="logo">Bloc Jams</h1></Link>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
