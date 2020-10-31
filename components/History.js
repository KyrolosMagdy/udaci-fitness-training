import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { addEntry, receiveEntries } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalenderResults } from "../utils/api";
import UdacityFitnessCalendar from "udacifitness-calendar-fix";
import { white } from "../utils/colors";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";
import { AppLoading } from "expo";

class History extends React.Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetchCalenderResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then((entries) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue(),
            })
          );
        }
      })
      .then(() => {
        this.setState({
          ready: true,
        });
      });
  }

  renderItem = ({ today, ...metrics }, formatedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <View>
          <DateHeader date={formatedDate} />
          <Text style={styles.noDataText}> {today} </Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => console.log("pressed!")}>
          <MetricCard metrics={metrics} date={formatedDate} />
        </TouchableOpacity>
      )}
    </View>
  );

  renderEmptyDate = (formatedDate) => (
    <View style={styles.item}>
      <DateHeader date={formatedDate} />
      <Text style={styles.noDataText}>
        {" "}
        You didn't logged any data on this day.{" "}
      </Text>
    </View>
  );

  render() {
    const { entries } = this.props;
    const { ready } = this.state;
    if (!ready) {
      return <AppLoading />;
    }
    return (
      <UdacityFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

function mapStateToProps(entries) {
  return {
    entries,
  };
}

export default connect(mapStateToProps, null)(History);
