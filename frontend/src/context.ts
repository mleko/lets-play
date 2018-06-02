import createHashHistory from "history/createHashHistory";
import {applyMiddleware, compose, createStore, StoreCreator} from "redux";
import {AxiosHttpClient} from "./infrastructure/http/implementation/AxiosHttpClient";
import {appReducer, initialAppState} from "./redux";
import {aggregateMiddlewares} from "./redux/Middleware";
import {AuthMiddleware} from "./redux/module/auth/AuthMiddleware";
import {RoutingMiddleware} from "./redux/module/routing/RoutingMiddleware";

export const httpClient = new AxiosHttpClient({}, {baseUrl: "/api"});

export const history = createHashHistory();

const devTools = window["devToolsExtension"] && process.env["NODE_ENV"] !== "production" ? window["devToolsExtension"]() : undefined;
let localCreateStore: StoreCreator = createStore;
localCreateStore = compose(applyMiddleware(aggregateMiddlewares(
	new AuthMiddleware(httpClient),
	new RoutingMiddleware(history)
)))(localCreateStore);
export const store = localCreateStore(appReducer, initialAppState, devTools);
