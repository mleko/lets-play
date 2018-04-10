import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {TopBar as Component} from "../component/TopBar";
import {Dispatch} from "../redux/Action";
import {AuthActions} from "../redux/module/auth";

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		onLogout: AuthActions.logout
	}, dispatch);
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Component);
