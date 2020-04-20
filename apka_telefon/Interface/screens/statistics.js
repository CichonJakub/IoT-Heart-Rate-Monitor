import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
//import { BarChart, XAxis } from 'react-native-svg-charts';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
//import { styles } from '../styles/global';
import { socket } from './login';
//import Chart from "react-apexcharts";

 export default function Statistics() {

	return(
	<View>

		<LineChart
	    data={{
	      labels: ["0", "2", "4", "6", "8", "10", "12","14","16","18","20","22","24"],
	      datasets: [
	        {
	          data: [
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random(),
	          ]
	        }
	      ]
	    }}
	    width={Dimensions.get("window").width} 
	    height={Dimensions.get("window").height/2-50}
	    xAxisLabel=""
	    yAxisSuffix=""
	    yAxisInterval={1} // optional, defaults to 1
	    chartConfig={{
	      backgroundColor: '#edb879',
	      backgroundGradientFrom: '#f2f2f2',
	      backgroundGradientTo: '#f2f2f2',
	      decimalPlaces: 2, // optional, defaults to 2dp
	      color: (opacity = 1) => `rgba(140,33,85, ${opacity})`,
	      labelColor: (opacity = 1) => `rgba(90,0,44, ${opacity})`,
	      style: {
	        borderRadius: 16,
	      },
	      propsForDots: {
	        r: "6",
	        strokeWidth: "2",
	        stroke: "#5a002c"
	      }
	    }}
	    bezier
	    style={{
	      marginVertical: 20,
	    }}
	  />
	  
	  <LineChart
	    data={{
	      labels: ["Pon", "Wt", "Sr", "Czw", "Pt", "Sob", "Nd"],
	      datasets: [
	        {
	          data: [
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random(),
	            Math.random()  
	          ]
	        }
	      ]
	    }}
	    width={Dimensions.get("window").width} 
	    height={Dimensions.get("window").height/2-50}
	    yAxisLabel=""
	    yAxisSuffix=""
	    yAxisInterval={1} // optional, defaults to 1
	    chartConfig={{
	      backgroundColor: '#edb879',
	      backgroundGradientFrom: '#f2f2f2',
	      backgroundGradientTo: '#f2f2f2',
	      decimalPlaces: 2, // optional, defaults to 2dp
	      color: (opacity = 1) => `rgba(140,33,85, ${opacity})`,
	      labelColor: (opacity = 1) => `rgba(90,0,44, ${opacity})`,
	      style: {
	        borderRadius: 16,
	      },
	      propsForDots: {
	        r: "6",
	        strokeWidth: "2",
	        stroke: "#5a002c"
	      }
	    }}
	    bezier
	  />
	</View>
	)
}
