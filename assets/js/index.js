const search_products = document.getElementById('search-products');
const list = document.querySelector('.list-products');
const productsDOM = document.querySelectorAll('.product');

// data
const categories = [
	{
		id: 1,
		name: "home electronics"
	},
	{
		id: 2,
		name: "hardware"
	},
	{
		id: 3,
		name: "smartphone"
	},
	{
		id: 4,
		name: "sports"
	},
	{
		id: 5,
		name: "technology"
	}
]
const products = [
	{
		id: 1,
		name: "iPhone 11",
		price: 2500,
		category: categories[2].name
	},
	{
		id: 2,
		name: "Samsumg S20",
		price: 2000,
		category: "smartphone"
	},
	{
		id: 3,
		name: "Keyboard Gamer",
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
		name: "Bike",
		price: 560,
		category: "sports"
	},
	{
		id: 8,
		name: "Batedeira EletroLux",
		price: 260,
		category: categories[0].name
	},
];

// verify if the array is empty or not;
const verifyArrayLength = (arr) => arr.length == 0 ? true : false;

// formating a price for Real (R$)
const formatPrice = (price) => price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/// event activated when insert values in input;
search_products.onkeyup = (e) => {
	const filtered_list = FilterProducts(products, e.target.value);
	// verify if the --filtered_list-- is empty or not;
	if (filtered_list.length == []) {
		list.innerHTML = "";
		list.insertAdjacentHTML("beforeend", `
		<div class="erro erro-product-list">
			Nenhum produto foi encontrado. Digite corretamente.
		</div>`);
	} else {
		list.innerHTML = "";
		filtered_list.forEach(product => CreateCard(product));
	}
};

// filtering products using REGEX, for one to one letter;
function FilterProducts(values, input) {
	const p = Array.from(input).reduce((a, v, i) => `${a}[^${input.substr(i)}]*?${v}`, '');
	const regex = RegExp(p);
	return values.filter(({ name }) => name.toLowerCase().match(regex));
}

// render the products;
function RenderProducts() {
	products.forEach(product => CreateCard(product));
};
RenderProducts();

// get all categories after page load;
window.onload = () => {
	const inputs_categories = document.querySelectorAll('.aside-categories-radio');
	// each input is active a event, and leading a id to input;
	inputs_categories.forEach(input => input.onchange = (e) => FilterByCategory(e.target.id));
}

// filtering products by category
function FilterByCategory(category) {
	// filtering the list, comparing 2 properties in capitals
	const list_found = products.filter(product => product.category.toUpperCase() == category.toUpperCase());
	search_products.value = "";
	if (category == "all-products") {
		list.innerHTML = "";
		RenderProducts();
	}
	else if (list_found.length == 0) {
		list.innerHTML = "";
		list.insertAdjacentHTML("beforeend", `<div class="erro erro-product-list">Nenhum produto foi encontrado.</div>`);
	} else {
		list.innerHTML = "";
		list_found.forEach(product => CreateCard(product));
	}
}

function CreateCard(product) {
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

function RenderCategories() {
	categories.forEach(category => CreateCategories(category));
}
RenderCategories();

function CreateCategories(category) {
	const disabled = verifyArrayLength(products.filter(e => e.category == category.name));
	const categories_list = document.querySelector('.aside-categories-list');
	var element = `
	<li class="aside-categories-item">
		<input name="category-products" type="radio" class="aside-categories-radio" id="${category.name}" ${disabled ? "disabled=true" : ""}>
		<label for="${category.name}" class="aside-categories-label">${category.name}</label>
	</li>
	`;
	// insert categories in -DOM-;
	categories_list.insertAdjacentHTML("beforeend", element);
}

const sliderPrice = document.querySelector('#js-slider-price');
const displaySliderPrice = document.querySelector('#display-slider-price');

// component -Slider state : Disabled > Start
sliderPrice.oninput = (e) => {
	displaySliderPrice.innerHTML = "";
	// create a label for show values to range;
	displaySliderPrice.innerHTML = `
		price from
		<strong>R$ 100</strong> to
		<strong>${formatPrice(Number(e.target.value))}</strong>`;
	FilterByPrice(Number(e.target.value));
}

function FilterByPrice(price_selected) {
	// filtering by price;
	const products_list = products.filter(({ price }) => price === price_selected);
	if (products_list.length == 0) {
		list.innerHTML = "";
		list.insertAdjacentHTML("beforeend", `<div class="erro erro-product-list">Nenhum produto foi encontrado.</div>`);
	} else {
		list.innerHTML = "";
		products_list.forEach(product => CreateCard(product));
	}
}
// component -Slider- > End