import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { HomePage } from './Pages/HomePage';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage}></Route>
        </Switch>
    )
}