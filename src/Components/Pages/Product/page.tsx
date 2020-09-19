import React from 'react'
import { Redirect, useHistory, useLocation } from 'react-router'
import './style.sass'
import { ProductType } from '@Components/UI/ProductItem'

export const ProductPage: React.FC = (): React.ReactElement => {
	const location = useLocation()
	const history = useHistory()
	if (location.state) <Redirect to='/' />
	console.log(location.state)
	//@ts-ignore
	const { name, historyChange, isAvailable, id, priority } = location.state.item
	const onDeleteItem = (): void => {
		const products = localStorage.getItem('products')
		if (products) {
			const parseProducts = JSON.parse(products)
			const newProducts = parseProducts.filter(
				(product: ProductType) => product.id !== id
			)
			localStorage.setItem('products', JSON.stringify(newProducts))
			history.push('/')
		}
	}
	return (
		<div className='card-wrapped'>
			<div className='card'>
				<div className='card-body'>
					<p className='card-text'>{name}</p>
					<div style={{ fontWeight: 'bold' }}>
						Is available:{' '}
						{isAvailable ? (
							<span className='green'>Have</span>
						) : (
							<span className='red'>Run out</span>
						)}
					</div>
					<div style={{ fontWeight: 'bold' }}>Priority: {priority}</div>
					<span style={{ fontWeight: 'bold' }}>
						History of changes:{' '}
						{historyChange.map((change: string) => {
							return <div>{change}</div>
						})}
					</span>
					<div className='card-actions'>
						<button
							type='button'
							className='btn btn-primary'
							onClick={() => history.push('/')}
						>
							Back
						</button>
						<button type='button' className='btn btn-danger' onClick={onDeleteItem}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
