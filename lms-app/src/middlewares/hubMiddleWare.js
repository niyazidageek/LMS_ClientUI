import {
  JsonHubProtocol,
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { actionTypes } from "../actions/const";

const startSignalRConnection = (connection) =>
  connection
    .start()
    .then(() => console.info("SignalR Connected"))
    .catch((err) => console.error("SignalR Connection Error: ", err));

const signalRMiddleware = (store) => (next) => async (action) => {
  if (action.type === actionTypes.REFRESH_HUB) {
    const connectionHub = process.env.REACT_APP_BROADCAST_HUB;

    const options = {
      accessTokenFactory: () => action.payload,
    };

    const connection = new HubConnectionBuilder()
      .withUrl(connectionHub, options)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveLink", (res) => {
      let link = JSON.parse(res);
      store.dispatch({
        type: actionTypes.SET_LINK,
        payload: link,
      });
    });

    connection.on("ReceiveNotification", (res) => {
      let appUserNotification = JSON.parse(res);
      store.dispatch({
        type: actionTypes.SET_NOTIFICATION,
        payload: appUserNotification,
      });
    });

    connection.onclose(() =>
      setTimeout(startSignalRConnection(connection), 5000)
    );

    startSignalRConnection(connection);
  }

  return next(action);
};

export default signalRMiddleware;
