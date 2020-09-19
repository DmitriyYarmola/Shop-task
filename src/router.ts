import { ProductsPage } from '@Components/Pages/Products/page'
import { ProductPage } from '@Components/Pages/Product/page'

export const routets = [
	{ path: '/', exact: true, Component: ProductsPage },
	{ path: '/product', exact: true, Component: ProductPage },
]
