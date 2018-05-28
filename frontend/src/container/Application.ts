import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Application as Component, ApplicationProps} from "../Application";
import {AppState} from "../redux";
import {Dispatch} from "../redux/Action";
import {AuthActions} from "../redux/module/auth";

function mapStateToProps(state: AppState): ApplicationProps {
	return {
		authenticated: state.auth.established ? state.auth.id && state.auth.id.length > 0 : null
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		onLogout: AuthActions.logout,
	}, dispatch);
}

export const Application = connect(mapStateToProps, mapDispatchToProps)(Component);
