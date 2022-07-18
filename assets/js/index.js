const search_products = document.getElementById('search-products');
const list = document.querySelector('.list-products');
const productsDOM = document.querySelectorAll('.product');
const products = [
	{
		id: 1,
		name: "Iphone 11",
		price: 2500,
		category: "smartphone"
	},
	{
		id: 2,
		name: "Samsumg S20",
		price: 2000,
		category: "smartphone"
	},
	{
		id: 3,
		name: "Teclado Gamer",
		price: 150,
		category: "hardware"
	},
	{
		id: 4,
		name: "Mouse Gamer",
		price: 80,
		category: "hardware"
	},
	{
		id: 5,
		name: "Monitor Samsumg 124 hertz",
		price: 1200,
		category: "hardware"
	},
	{
		id: 6,
		name: "Notebook Asus",
		price: 2200,
		category: "hardware"
	},
];

const formatPrice = (price) => price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

search_products.onkeyup = (e) => {
	const filteredList = FilterProducts(products, e.target.value);
	if (filteredList.length == []) {
		list.innerHTML = ""
		list.insertAdjacentHTML("beforeend", `<div class="erro erro-product-list">Nenhum produto foi encontrado. Digite corretamente.</div>`)
	} else {
		list.innerHTML = "";
		filteredList.forEach(product => {
			var tag = `
		<div class="product" data-category="${product.category}" data-id="${product.id}">
		<div class="product__image"> </div>
		<div class="product__info">
		<strong class="product__name">${product.name}</strong>
		<small class="product__price">R$ ${formatPrice(product.price)}</small>
		</div>
		</div>`
			list.insertAdjacentHTML('beforeend', tag);
		});
	}
};

function FilterProducts(values, input) {
	const p = Array.from(input).reduce((a, v, i) => `${a}[^${input.substr(i)}]*?${v}`, '');
	const regex = RegExp(p);
	return values.filter(({ name }) => name.toLowerCase().match(regex));
}

function RenderProducts() {
	products.forEach(product => {
		var tag = `
		<div class="product" data-category="${product.category}" data-id="${product.id}">
			<div class="product__image"> </div>
			<div class="product__info">
				<strong class="product__name">${product.name}</strong>
				<small class="product__price">${formatPrice(product.price)}</small>
			</div>
		</div>`
		list.insertAdjacentHTML('beforeend', tag);
	});
};
RenderProducts();