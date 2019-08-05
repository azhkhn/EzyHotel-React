/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from "redux-form/immutable";
import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";
import history from "utils/history";
import languageProviderReducer from "containers/LanguageProvider/reducer";
import uiReducer from "./modules/ui";
import treeTable from "./modules/treeTable";
import crudTable from "./modules/crudTable";
import priceRateCrudTable from "./modules/priceRateCrudTable";
import crudTableForm from "./modules/crudTableForm";
import salesPackageCrudTableForm from "./modules/salesPackageCrudTableForm";
import initval from "./modules/initForm";
import reserveFacilityForm from "./modules/reserveFacilityForm";
import createProgramForm from "./modules/createProgramForm";
import login from "./modules/login";
import socmed from "./modules/socialMedia";
import ecommerce from "./modules/ecommerce";
import contact from "./modules/contact";
import chat from "./modules/chat";
import email from "./modules/email";
import calendar from "./modules/calendar";
import taskboard from "./modules/taskboard";

/**
 * Branching reducers to use one reducer for many components
 */

function branchReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    initval,
    reserveFacilityForm,
    createProgramForm,
    login,
    socmed,
    calendar,
    ecommerce,
    contact,
    chat,
    email,
    taskboard,
    treeTableArrow: branchReducer(treeTable, "treeTableArrow"),
    treeTablePM: branchReducer(treeTable, "treeTablePM"),
    crudTableDemo: branchReducer(crudTable, "crudTableDemo"),
    priceRateCrudTable: branchReducer(priceRateCrudTable, "priceRateCrudTable"),
    crudTableForm,
    crudTbFrmDemo: branchReducer(crudTableForm, "crudTbFrmDemo"),
    salesPackageCrudTbFrmDemo: branchReducer(salesPackageCrudTableForm, "salesPackageCrudTbFrmDemo"),
    language: languageProviderReducer,
    ...injectedReducers
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
