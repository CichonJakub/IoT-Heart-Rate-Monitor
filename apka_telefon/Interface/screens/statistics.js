import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
//import { BarChart, XAxis } from 'react-native-svg-charts';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
//import { styles } from '../styles/global';
import { socket } from './login';
//import Chart from "react-apexcharts";

 export default function Statistics() {


//   const info = 'To są moje statystyki';
//   const zapytanie = 'SELECT * FROM statystyki ORDER BY data_pomiaru LIMIT 7';
//   socket.emit('statystyki', zapytanie);
//   socket.on('loginResult', function(data1){
//   	data1 = [23,45,67,89]
//   });

//to działa w dol
// class Chart extends Component
// {
//   constructor (props)
//   {
//     super(props);
//   }

//   render ()
//   {
//     const data   = [29, 30, 70, 50, 34, 98, 51];

//     return (
//       <View style={styles.container}>
//         <BarChart
//           style={{ flex: 1 }}
//           data={ data }
//           contentInset={{ top: 30, bottom: 30 }}/>

//         <XAxis
//           style={{ marginHorizontal: -10, marginTop: 15}}
//           data={ data }
//           formatLabel={ (value, index) => index }
//           contentInset={{ left: 25, right: 25 }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     height: '70%'
//   }
// });

// export default Chart;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};
return(
<View>
  <Text>Ostatnie 7 dni</Text>
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
    height={320}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#0027c2",
      backgroundGradientFrom: "#0027c2",
      backgroundGradientTo: "#0027c2",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 100,
      borderRadius: 16
    }}
  />
</View>
)
}