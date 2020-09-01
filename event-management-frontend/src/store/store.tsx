import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import { EventsPageState } from "../reducers/EventsPageReducers";
import { LocationPageState } from "../reducers/LocationPageReducer";
import { EventState } from "../reducers/HeaderEventCrudReducer";
import { ReserveFirstPageState } from "../reducers/ReservePageReducer";
import { ReserveSecondPageState } from "../reducers/TicketReservationReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export interface AppState {
  events: EventsPageState;
  eventCrud: EventState;
  location: LocationPageState;
  reserveTicket: ReserveFirstPageState;
  ticketCategories: ReserveSecondPageState;
}
