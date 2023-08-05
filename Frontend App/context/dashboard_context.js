import React, { useContext, useReducer } from "react";
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
} from "../action";
import dashboard_reducer from "../reducer/dashboard_reducer";

const initialState = {
  selectedIVcompany: "",
  ddValue1: "",
  ddValue2: "",
  ddFocus1: false,
  ddFocus2: false,
  companies: [],
  currCompany: "alkem",
  currTypeOfGraph: "Daily",
  typeOfGraph: [
    { name: "intraDay", value: "1" },
    { name: "Daily", value: "2" },
  ],
  graphData: [],
  tableData: [],
};

const DashboardContext = React.createContext();

export const DashboardProvider = ({ children }) => {
  const [state, dispath] = useReducer(dashboard_reducer, initialState);

  const setDdValue1 = (val) => {
    dispath({ type: CHANGE_DDVALUE_1, payload: val });
  };
  const setDdValue2 = (val) => {
    dispath({ type: CHANGE_DDVALUE_2, payload: val });
  };
  const setDdFocus1 = (val) => {
    dispath({ type: CHANGE_DDFOCUS_1, payload: val });
  };
  const setDdFocus2 = (val) => {
    dispath({ type: CHANGE_DDFOCUS_2, payload: val });
  };
  const setCompanies = (val) => {
    dispath({ type: CHANGE_COMPANIES, payload: val });
  };
  const setTypeOfGraph = (val) => {
    dispath({ type: CHANGE_TYPEOFGRAPH, payload: val });
  };
  const setCurrCompany = (val) => {
    dispath({ type: CHANGE_CURR_COMPANY, payload: val });
  };
  const setCurrTypeOfGraph = (val) => {
    dispath({ type: CHANGE_CURR_TYPE_OF_GRAPH, payload: val });
  };
  const setGraphData = (val) => {
    dispath({ type: CHANGE_GRAPH_DATA, payload: val });
  };
  const setTableData = (val) => {
    dispath({ type: CHANGE_TABLE_DATA, payload: val });
  };
  const setSelectedIVcompany = (val) => {
    dispath({ type: CHANGE_SELECTED_IV_COMPANY, payload: val });
  };

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        setDdValue1,
        setDdValue2,
        setDdFocus1,
        setDdFocus2,
        setCompanies,
        setTypeOfGraph,
        setCurrCompany,
        setCurrTypeOfGraph,
        setGraphData,
        setTableData,
        setSelectedIVcompany,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
