import { connect } from 'react-redux';
import { singleProductSelector } from '../../../redux/productsReducer';
import Product from './Product';

const mapStateToProps = (state, ownProps) => ({
  product: singleProductSelector(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(Product);
