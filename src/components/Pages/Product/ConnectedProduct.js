import { connect } from 'react-redux';
import { singleProductSelector, getRequest } from '../../../redux/reducer';
import Product from './Product';

const mapStateToProps = (state, ownProps) => ({
  product: singleProductSelector(state, ownProps.match.params.id),
  request: getRequest(state),
});

export default connect(mapStateToProps)(Product);
