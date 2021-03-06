import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {LoginScreen as Component} from "../component/LoginScreen";
import {Dispatch} from "../redux/Action";
import {AuthActions} from "../redux/module/auth";

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		onRegister: AuthActions.register,
		onLogin: AuthActions.login,
		onReset: AuthActions.initReset
	}, dispatch);
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Component);
