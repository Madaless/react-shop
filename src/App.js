import React, { Component } from 'react';
import './App.css';
import Products from './components/Products.js';
import Filter from './components/Filter'
import Basket from './components/Basket'
import Navbar from './components/Navbar';
import store from './store'
import Footer from './components/Footer';
import { Provider } from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [], cartItems: [], count: 0 }
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }


  componentWillMount() {

    if (localStorage.getItem('cartItems')) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
    }
  }
  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }
  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProducts();
  }

  listProducts() {
    this.setState(state => {
      if (state.sort !== '')
        state.products.sort((a, b) => (state.sort === 'lowest') ? (a.prize > b.prize ? -1 : -1) : (a.prize < b.prize ? 1 : -1))
      else
        state.products.sort((a, b) => (a.id < b.id ? 1 : -1));

      if (state.size !== '')
        return { filteredProducts: state.products.filter(a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0) }
      return { filteredProducts: state.products }
    })
  }

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  }

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    })
  }

  handleBuy = (e) => {
    this.setState(state => {
      const cartItems = []
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar></Navbar>

          <div className="container">
            <h1>Welcome to out shop</h1>
            <hr />
            <div className="row">
              <div className="col-md-9">
                <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.length} />
                <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
                <Footer></Footer>
              </div>
              <div className="col-md-3">
                <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} handleBuy={this.handleBuy} />
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
