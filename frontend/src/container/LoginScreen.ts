import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {LoginScreen as Component} from "../component/LoginScreen";
import {Dispatch} from "../redux/Action";
import {AuthActions} from "../redux/module/auth";

function mapStateToProps() {

}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		onRegister: AuthActions.register,
		onLogin: AuthActions.login,
		onReset: AuthActions.reset
	}, dispatch);
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Component);
