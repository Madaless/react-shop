import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterProducts, sortProducts } from '../actions/productActions'
import PropTypes from 'prop-types'

class Filter extends Component {

    render() {
        return (
            <div className="row">
                {/* <div className="col-md-4">{this.props.count} products found.</div> */}
                <div className="col-md-4">
                    Order by
                    <select className="form-control" value={this.props.sort}
                        onChange={(e) => this.props.sortProducts(this.props.orderedProducts, e.target.value)}>
                        <option value="">select</option>
                        <option value="lowest">From lowest to highest</option>
                        <option value="highest">From highest to lowest</option>
                    </select>
                </div>
                <div className="col-md-4">
                    Filter size
                    <select className="form-control" value={this.props.size}
                        onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
                        <option value="">ALL</option>
                        <option value="x">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                    </select>
                </div>
            </div>
        )
    }
}

Filter.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        price: PropTypes.number,
        title: PropTypes.string,
        availableSizes: PropTypes.arrayOf(PropTypes.string),
    })
};
const mapStateToProps = state => (
    {
        products: state.products.items,
        size: state.products.size,
        sort: state.products.sort,
        orderedProducts: state.products.filteredItems
    }
);
export default connect(mapStateToProps, { filterProducts, sortProducts })(Filter);