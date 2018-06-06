import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ResetForm as Component} from "../component/ResetForm";
import {Dispatch} from "../redux/Action";
import {AuthActions} from "../redux/module/auth";

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		onReset: AuthActions.reset
	}, dispatch);
}

export const ResetForm = connect(mapStateToProps, mapDispatchToProps)(Component);
