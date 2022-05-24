import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import AddUser from "./add-user"
import usersList from "./list-users"
/*
import ProductList from './product-list'
import AddProduct from './add-product'
import EditProduct from './edit-product'
import Orders from './orders'


<Route path={`${match.url}/users-list`} component={usersList} />
*/

const Users = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/users-list`} />
			<Route path={`${match.url}/add-user`} component={AddUser} />
            <Route path={`${match.url}/users-list`} component={usersList} />
		</Switch>
	)
}

export default Users

