const search_products = document.getElementById('search-products');
const list = document.querySelector('.list-products');
const productsDOM = document.querySelectorAll('.product');

// datas
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
	{
		id: 7,
		name: "Bicicleta",
		price: 560,
		category: "sports"
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
		filteredList.forEach(product => CreateHTML(product));
	}
};

function FilterProducts(values, input) {
	const p = Array.from(input).reduce((a, v, i) => `${a}[^${input.substr(i)}]*?${v}`, '');
	const regex = RegExp(p);
	return values.filter(({ name }) => name.toLowerCase().match(regex));
}

function RenderProducts() {
	products.forEach(product => CreateHTML(product));
};
RenderProducts();


// filtrar por categoria
const inputs_categories = document.querySelectorAll('.aside-categories-radio');

inputs_categories.forEach(input => {
	input.onchange = (e) => FilterForCategory(e.target.id);
});

function FilterForCategory(category) {
	const list_found = products.filter(product => product.category.toUpperCase() == category.toUpperCase());
	list.innerHTML = "";
	list_found.forEach(product => CreateHTML(product));
	if (category == "all-products") RenderProducts();
	console.log(list_found);
}

function CreateHTML(product) {
	var card = `
		<div class="product" data-category="${product.category}" data-id="${product.id}">
			<div class="product__image"> </div>
			<div class="product__info">
				<strong class="product__name">${product.name}</strong>
				<small class="product__price">${formatPrice(product.price)}</small>
			</div>
		</div>`;
	list.insertAdjacentHTML("beforeend", card);
}

