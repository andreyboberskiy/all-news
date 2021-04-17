import BreakingNews from "modules/BreakingNews/BreakingNews";
import Header from "modules/Header/Header";
import Notes from "modules/Notes/Notes";
import React, { useEffect } from "react";
import MainContainer from "modules/MainContainer/MainContainer";
import ReduxToastr from "react-redux-toastr";
import { Route, Switch } from "react-router-dom";
import Settings from "modules/Settings/Settings";
import routesByName from "routes/routesByName";
import Page404 from "modules/Page404";
import "materialize-css";
import { connect, Provider } from "react-redux";
import { initAppAction } from "modules/app/store/actions";
import Preloader from "components/Preloader/Preloader";
import Saved from "./modules/Saved/Saved";
const App = ({ initApp, appInited }) => {
  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <Preloader />
      {appInited ? (
        <div>
          <Header />
          <Switch>
            <Route exact path="/">
              <BreakingNews />
              <MainContainer />
            </Route>
            <Route exact path={routesByName.settings}>
              <Settings />
            </Route>
            <Route exact path={routesByName.saved}>
              <Saved />
            </Route>
            <Route exact path={routesByName.notes}>
              <Notes />
            </Route>
            <Route exact path="*">
              <Page404 />
            </Route>
          </Switch>
          <ReduxToastr position="bottom-left" newestOnTop closeOnToastrClick />
        </div>
      ) : null}
    </>
  );
};
const mapStateToProps = ({ app: { inited } }) => ({
  appInited: inited,
});

const mapDispatchToProps = {
  initApp: initAppAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
