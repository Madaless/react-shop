import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import PropTypes from 'prop-types'

class Products extends Component {

    componentWillMount() {
        this.props.fetchProducts()
    }
    render() {
        const productItems = this.props.products.map(product => (
            <div className="col col-lg-4" key={product.id}>
                <div className="thumbnail text-center">
                    <a href={`#${product.id}`} onClick={(e) => { this.props.handleAddToCart(e, product) }}>
                        <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
                        <p>
                            {product.title}
                        </p>
                    </a>
                    <div>
                        <b>{product.price}$</b>
                        <button className="btn btn-default" onClick={(e) => { this.props.handleAddToCart(e, product) }}>Add to card</button>
                    </div>
                </div>
            </div>
        )
        )
        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}

Products.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        price: PropTypes.number,
        title: PropTypes.string,
        availableSizes: PropTypes.arrayOf(PropTypes.string),
    })
};

const mapStateToProps = state => ({ products: state.products.filteredItems });
export default connect(mapStateToProps, { fetchProducts })(Products);