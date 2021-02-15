import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'
import Auth from './containars/Auth/Auth'
import QuizCreater from './containars/QuizCreater/QuizCreater'
import QuizList from './containars/QuizList/QuizList'
import Quiz from './containars/Quiz/Quiz'



class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/quiz-creator' component={QuizCreater}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/' component={QuizList}/>
        </Switch>
      </Layout>
    );
  }
}



export default App;
