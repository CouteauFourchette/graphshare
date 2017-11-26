import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChartCreator from './chart_creator';
import { fetchDataset, fetchDatasets } from '../../../actions/datasets_actions';
import { receiveChart } from '../../../actions/chart_actions';

const mapStateToProps = state => ({
  datasets: state.entities.datasets,
  currentUserId: state.session.currentUser.id,
});

const mapDispatchToProps = dispatch => ({
  fetchDatasets: userId => dispatch(fetchDatasets(userId)),
  fetchDataset: id => dispatch(fetchDataset(id)),
  receiveChart: chart => dispatch(receiveChart({ chart })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChartCreator));
