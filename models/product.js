'use strict';


module.exports = function ProductModel() {
    return {
        name: 'product',
        title:'Product Page',
        products: [
			{
				id: '1',
				name: 'test product',
				prettyPrice: '10.12',
			},
			{
				id: '2',
				name: 'test product2',
				prettyPrice: '12.56',
			},
			{
				id: '3',
				name: 'test product3',
				prettyPrice: '9.56',
			},
			{
				id: '4',
				name: 'test product4',
				prettyPrice: '9.99',
			},
	]
    };
};
