import {
  CHANGE_COMPANIES,
  CHANGE_CURR_COMPANY,
  CHANGE_CURR_TYPE_OF_GRAPH,
  CHANGE_DDFOCUS_1,
  CHANGE_DDFOCUS_2,
  CHANGE_DDVALUE_1,
  CHANGE_DDVALUE_2,
  CHANGE_GRAPH_DATA,
  CHANGE_TABLE_DATA,
  CHANGE_TYPEOFGRAPH,
  CHANGE_SELECTED_IV_COMPANY,
  FILTEREDCOMPANY,
} from "../action";

const dashboard_reducer = (state, action) => {
  if (action.type === CHANGE_DDVALUE_1) {
    return { ...state, ddValue1: action.payload };
  }
  if (action.type === CHANGE_DDVALUE_2) {
    return { ...state, ddValue2: action.payload };
  }
  if (action.type === CHANGE_DDFOCUS_1) {
    return { ...state, ddFocus1: action.payload };
  }
  if (action.type === CHANGE_DDFOCUS_2) {
    return { ...state, ddFocus2: action.payload };
  }
  if (action.type === CHANGE_COMPANIES) {
    return { ...state, companies: action.payload };
  }
  if (action.type === CHANGE_TYPEOFGRAPH) {
    return { ...state, typeOfGraph: action.payload };
  }
  if (action.type === CHANGE_CURR_COMPANY) {
    return { ...state, currCompany: action.payload };
  }
  if (action.type === CHANGE_CURR_TYPE_OF_GRAPH) {
    return { ...state, currTypeOfGraph: action.payload };
  }
  if (action.type === CHANGE_GRAPH_DATA) {
    return { ...state, graphData: action.payload };
  }
  if (action.type === CHANGE_TABLE_DATA) {
    return { ...state, tableData: action.payload };
  }
  if (action.type === CHANGE_SELECTED_IV_COMPANY) {
    return { ...state, selectedIVcompany: action.payload };
  }
  if (action.type === FILTEREDCOMPANY) {
    return { ...state, filteredCompany: action.payload };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default dashboard_reducer;
