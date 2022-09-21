import {Link, Route, Switch} from 'react-router-dom';
import {Home} from '../../pages/home';
import {Post} from '../../pages/post';

export const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/post">post</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post" component={Post} />
      </Switch>
    </>
  )
}
