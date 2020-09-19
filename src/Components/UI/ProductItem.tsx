import React from 'react'
import './style.sass'

export interface ProductType {
	name: string
	historyChange: string[]
	lastChange: string
	priority: number
	isAvailable: boolean
	id: number
}
interface PropsType {
	name: string
	lastChange: string
	priority: number
	isAvailable: boolean
	id: number
	onChangeAvailable: (id: number) => void
	onDeleteProduct: (id: number) => void
	onView: (item: ProductType) => void
	item: ProductType
}
export const ProductItem: React.FC<PropsType> = ({
	name,
	lastChange,
	isAvailable,
	onChangeAvailable,
	id,
	onDeleteProduct,
	item,
	onView,
}): React.ReactElement => {
	return (
		<div className='list-group-item' style={{ marginTop: '25px' }}>
			<button type='button' className='btn btn-primary' onClick={() => onView(item)}>
				View
			</button>
			<button
				type='button'
				className='btn btn-danger'
				onClick={() => onDeleteProduct(id)}
			>
				Delete
			</button>
			<span>{name}</span>
			<div className='actions-item'>
				<span className='last-change'>{lastChange}</span>
				{isAvailable ? (
					<span className='green'>Have</span>
				) : (
					<span className='red'>Run out</span>
				)}
				<input
					type='checkbox'
					checked={isAvailable}
					className='form-check-input'
					id='exampleCheck1'
					onChange={() => onChangeAvailable(id)}
				/>
			</div>
		</div>
	)
}
