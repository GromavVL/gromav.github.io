new Vue({
    el: '#app',
    data: {
        products: [
            { id: 1, title: "Cabbage - regular", short_text: "Vegetable useful", image: "img/t-all/Kapusta-1.png", desc: "Cabbage with natural freshness.", characteristics: { resistance: ["HR: ToMV:0-2; Fol: 1,2; Ve/Vd;", "IR: TYLCV"], plant: ["Robust growth ensuring dense leaf coverage.", "High yield potential with excellent fruit setting.", "Fast-maturing variety."], cycle: ["Spring", "Fall", "Winter"], fruit: ["Long shelf life on plant and post harvest.", "Nice shiny attractive deep red color.", "Average fruit size: 140 – 160 grams."], color: "Green" } },
            { id: 2, title: "Red - cabbage", short_text: "Crispy, spicy", image: "img/t-all/Kapusta-2.png", desc: "Cabbage that smells fresh.", characteristics: { resistance: ["HR: ToMV:0-2; Fol: 1,2; Ve/Vd;"], plant: ["Medium vigor with good leaf structure.", "Consistent fruit setting.", "Late matured variety."], cycle: ["Summer", "Fall"], fruit: ["Slightly sour with crisp texture.", "Bright green color with smooth skin.", "Average fruit size: 130 – 150 grams."], color: "Purple" } },
            { id: 3, title: "Cauliflower", short_text: "Gentle, soft", image: "img/t-all/Kapusta-3.png", desc: "Juice leaves, equal to the taste.", characteristics: { resistance: ["HR: ToMV:0-2; Ve/Vd;"], plant: ["Moderate vigor with upright growth.", "Good productivity and easy harvesting."], cycle: ["Spring", "Summer"], fruit: ["Golden yellow skin with smooth texture.", "Sweet and juicy flesh.", "Average fruit size: 120 – 140 grams."], color: "White" } },
            { id: 4, title: "Broccoli", short_text: "Fragrant", image: "img/t-all/Kapusta-4.png", desc: "Natural freshness in every leaf.", characteristics: { resistance: ["HR: ToMV:0-2; Fol: 1,2;"], plant: ["Vigorous plant with high resistance to pests.", "Good fruit setting even in cooler climates."], cycle: ["Fall", "Winter"], fruit: ["Golden skin with a hint of blush.", "Crisp, sweet flesh with floral notes.", "Average fruit size: 150 – 170 grams."], color: "Green" } },
            { id: 5, title: "Brussels - sprouts", short_text: "Сrispy", image: "img/t-all/Kapusta-5.png", desc: "Fragrant, crispy cabbage.", characteristics: { resistance: ["HR: ToMV:0-2; IR: TYLCV"], plant: ["High vigor with spreading growth.", "Excellent productivity even in poor soils."], cycle: ["Spring", "Fall", "Winter"], fruit: ["Firm, crisp texture with tart flavor.", "Green skin with occasional russeting.", "Average fruit size: 140 – 160 grams."], color: "Green" } }
        ],
        product: {},
        cart: JSON.parse(localStorage.getItem('cart')) || {},
        cartBtnText: "Add to Cart",
        cartPageLink: "contact.html",
        orderPlaced: false,
        contactFields: { name: '', telephone: '', email: '', message: '', captcha: '' }
    },
    methods: {
        getProduct() {
            const productId = +window.location.hash.replace('#', '');
            this.product = this.products.find(p => p.id === productId) || {};
            this.updateCartButton();
        },
        updateCartButton() {
            this.cartBtnText = this.product.id && this.cart[this.product.id] ? "Go to Cart" : "Add to Cart";
        },
        addToCart(id) {
            if (!this.cart[id]) this.cart[id] = { ...this.products.find(p => p.id === id), quantity: 0 };
            this.cart[id].quantity++;
            this.saveCart();
            this.updateCartButton();
        },
        removeFromCart(id) {
            Vue.delete(this.cart, id);
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        goToCart() {
            window.location.href = this.cartPageLink;
        },
        makeOrder() {
            this.cart = {};
            localStorage.removeItem('cart');
            this.orderPlaced = true;
        },
        submitForm() {
            if (Object.values(this.contactFields).some(field => !field)) return;
            this.makeOrder();
        }
    },
    mounted() {
        this.getProduct();
    }
});