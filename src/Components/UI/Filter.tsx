import React from 'react'

interface PropsType {
	onChange: (e: any) => void
}
export const Filter: React.FC<PropsType> = ({ onChange }): React.ReactElement => {
	return (
		<div>
			<select
				className='form-control'
				id='exampleFormControlSelect1'
				onChange={onChange}
				defaultValue={''}
			>
				<option value=''>All</option>
				<option value='1'>Have</option>
				<option value='0'>Run out</option>
			</select>
		</div>
	)
}
