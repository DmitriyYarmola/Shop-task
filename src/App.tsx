import React from 'react'
import { Route } from 'react-router'
import { routets } from './router'

export const App = (): React.ReactElement => {
	return (
		<div>
			{routets.map(({ exact, path, Component }) => {
				return <Route key={path} exact={exact} path={path} render={() => <Component />} />
			})}
		</div>
	)
}
