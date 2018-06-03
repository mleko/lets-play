import {connect} from "react-redux";
import {Snackbars as Component, SnackbarsProps} from "../component/Snackbars";
import {AppState} from "../redux";
import {Dispatch} from "../redux/Action";
import {SnackbarActions} from "../redux/module/snackbar";

function mapStateToProps(state: AppState): Partial<SnackbarsProps> {
	return {
		message: state.snackbar.message,
		show: state.snackbar.show
	};
}

function mapDispatchToProps(dispatch: Dispatch): Partial<SnackbarsProps> {
	return {
		onExited: () => {
			dispatch(SnackbarActions.exited());
		},
		onClose: (e, reason) => {
			dispatch(SnackbarActions.close(reason));
		}
	};
}

export const Snackbars = connect(mapStateToProps, mapDispatchToProps)(Component);
