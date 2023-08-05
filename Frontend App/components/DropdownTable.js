import React, { useEffect, useState } from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import axios from "axios";
import { useDashboardContext } from "../context/dashboard_context";
import { API } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Spinner from "react-native-loading-spinner-overlay";

const DropdownTable = () => {
  const [loading, setLoading] = useState(false);

  const { tableData, setTableData, currCompany } = useDashboardContext();

  const getTableData = async () => {
    console.log("babby", currCompany);
    const resultUrl = `${API}/result/${currCompany}`;
    console.log("result url", resultUrl);
    const movementUrl = `${API}/movement/${currCompany}`;
    const token = await AsyncStorage.getItem("token");
    try {
      setLoading(true);
      const result = await axios.get(resultUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const genResultData = result.data.result.map((element) => {
        return {
          col1: element.date,
          col2: element.time,
          col3: element.movement,
          col4: element.changes,
          col5: element.iv_range,
        };
      });

      const resultHeaders = [
        "Result Date",
        "Time",
        "Movement",
        "Changes",
        "IV Range",
      ];
      const createdResultData = { data: genResultData, headers: resultHeaders };

      // for movement

      const movement = await axios(movementUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const genMovementData = movement.data.movement.map((element) => {
        return {
          col1: element.col_name,
          col2: element.high,
          col3: element.low,
          col4: element.diff,
          col5: element.daily_avg,
        };
      });

      const movementHeaders = [
        "FO Movement",
        "High",
        "Low",
        "Diff",
        "Daily % avg",
      ];
      const createdMovementData = {
        data: genMovementData,
        headers: movementHeaders,
      };

      setTableData([createdResultData, createdMovementData]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    getTableData();
  }, [currCompany]);
  return (
    <View>
      <Spinner visible={loading} color="green" />
      {tableData.length !== 0 && (
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={0}
          showPagination={true}
          paginationStyle={{
            position: "relative",
          }}
          //   // vertical={true}
          data={tableData}
          renderItem={({ item }) => (
            // <View style={[styles.child, { backgroundColor: item }]}>

            <View style={styles.container}>
              <View style={styles.headerRow}>
                {item.headers.map((header) => {
                  // console.log("insider header");
                  // console.log(item);
                  return <Text style={styles.header}>{header}</Text>;
                })}
              </View>
              {item.data.map((i, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.row,
                      index % 2 === 0 ? styles.evenRow : styles.oddRow,
                    ]}
                  >
                    <Text style={styles.cell}>{i.col1}</Text>
                    <Text style={styles.cell}>{i.col2}</Text>
                    <Text style={styles.cell}>{i.col3}</Text>
                    <Text style={styles.cell}>{i.col4}</Text>
                    <Text style={styles.cell}>{i.col5}</Text>
                  </View>
                );
              })}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DropdownTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // position: "absolute",
    marginTop: 270,
    backgroundColor: "#3a3332",
    width: responsiveWidth(100),
    // marginLeft: 2,
    height: 258,
    // alignItems: "center",
    // justifyContent: "center",
  },
  headerRow: {
    // padding: 10,
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: "black",
  },
  header: {
    padding: 10,
    borderWidth: 0.2,
    borderColor: "black",

    // margin: 0.5,
    backgroundColor: "rgb(132, 194, 37)",
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    borderWidth: 0.2,
    borderColor: "#ccc",
    flexDirection: "row",
    borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    padding: 4,
  },
  evenRow: {
    backgroundColor: "#474545",
  },
  oddRow: {
    backgroundColor: "#8c8787",
  },
  cell: {
    // borderLeftWidth: 1,
    // padding: 1,

    // borderColor: "black",
    // marginLeft: 3,
    color: "white",
    flex: 1,
    textAlign: "center",
  },
});
