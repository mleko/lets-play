import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Application as Component, ApplicationProps} from "../Application";
import {AppState} from "../redux";
import {Dispatch} from "../redux/Action";
import {AuthActions} from "../redux/module/auth";

function mapStateToProps(state: AppState): Partial<ApplicationProps> {
	return {
		authenticated: state.auth.established ? null !== state.auth.user : null,
		user: state.auth.user
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		onLogout: AuthActions.logout,
	}, dispatch);
}

export const Application = connect(mapStateToProps, mapDispatchToProps)(Component);
