import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ProductItem, ProductType } from '@Components/UI'
import './styles.sass'
import { Filter } from '@Components/UI/Filter'
import { useHistory } from 'react-router'

export const ProductsPage = (): React.ReactElement => {
	const [products, setProduct] = useState<ProductType[]>([])
	const [filterValue, setFilterValue] = useState<boolean | string>('')
	const [value, setValue] = useState('')
	const [priorityValue, setpriorityValue] = useState('1')
	const history = useHistory()
	useEffect(() => {
		const products = localStorage.getItem('products')
		if (products) {
			setProduct([...JSON.parse(products)])
		}
	}, [])
	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}, [])
	const onChangePriorityValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setpriorityValue(e.currentTarget.value)
	}, [])
	const onAddProduct = useCallback(() => {
		const product = {
			name: value,
			lastChange: new Date().toLocaleString(),
			historyChange: [new Date().toLocaleString()],
			isAvailable: true,
			priority: Number(priorityValue),
			id: Date.now(),
		}
		console.log('date', new Date().toLocaleDateString())
		setValue('')
		setProduct([...products, product])
		localStorage.setItem('products', JSON.stringify([...products, product]))
	}, [value, products, priorityValue])

	const onChangeAvailable = useCallback(
		(id: number) => {
			setProduct(() => {
				const changedProduct = products.map((product) => {
					if (product.id === id) {
						return {
							...product,
							isAvailable: !product.isAvailable,
							historyChange: [...product.historyChange, new Date().toLocaleString()],
							lastChange: new Date().toLocaleString(),
						}
					}
					return product
				})
				localStorage.setItem('products', JSON.stringify([...changedProduct]))
				return changedProduct
			})
		},
		[products]
	)

	const onDeleteProduct = useCallback(
		(id: number) => {
			setProduct(() => {
				return products.filter((product) => product.id !== id)
			})
			localStorage.setItem(
				'products',
				JSON.stringify([...products.filter((product) => product.id !== id)])
			)
		},
		[products]
	)

	const onFilter = useCallback((e: any) => {
		const value = e.currentTarget.value
		setFilterValue(value ? Boolean(+e.currentTarget.value) : '')
	}, [])

	const results = useMemo(
		() =>
			filterValue === ''
				? products
						.sort((a, b) => b.priority - a.priority)
						.sort((a, b) => {
							const nameA = a.name.toLowerCase()
							const nameB = b.name.toLowerCase()
							if (nameA < nameB) return -1
							if (nameA > nameB) return 1
							return 0
						})
				: products
						.filter((product) => product.isAvailable === filterValue)
						.sort((a, b) => b.priority - a.priority),
		[products, filterValue]
	)

	const onViewItem = useCallback(
		(item: ProductType) => {
			history.push({ pathname: '/product', state: { item } })
		},
		[history]
	)
	console.log('results', results)
	return (
		<div className='container'>
			<div className='add-product'>
				<input
					type='text'
					className='form-control'
					placeholder='Input product name'
					onChange={onChange}
					value={value}
				/>
				<input
					type='number'
					className='form-control'
					placeholder='Input product priority'
					max={5}
					min={1}
					value={priorityValue}
					onChange={onChangePriorityValue}
				/>
				<button type='button' className='btn btn-success' onClick={onAddProduct}>
					Add
				</button>
			</div>
			<Filter onChange={onFilter} />
			<div className='products'>
				{results.length ? (
					results.map((product) => {
						return (
							<ProductItem
								key={product.id}
								item={product}
								id={product.id}
								name={product.name}
								lastChange={product.lastChange}
								priority={product.priority}
								isAvailable={product.isAvailable}
								onChangeAvailable={onChangeAvailable}
								onDeleteProduct={onDeleteProduct}
								onView={onViewItem}
							/>
						)
					})
				) : (
					<div
						style={{
							fontSize: '24px',
							fontWeight: 'bold',
							textAlign: 'center',
							marginTop: '30px',
						}}
					>
						Products is empty
					</div>
				)}
			</div>
		</div>
	)
}
