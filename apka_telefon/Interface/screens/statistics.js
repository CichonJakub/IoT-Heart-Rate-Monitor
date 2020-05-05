import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { statystykiSrednia, statystykiPomiary } from './home';
import { styles } from '../styles/global';

 export default function Statistics() {

 	let srednie = [0,0,0,0,0,0,0];
 	let pomiary_dzisiaj = [0];
 	let nr_pomiaru = [0];
 	var dzis = new Date();

	var dni_tygodnia = new Array(7);
	dni_tygodnia[0] = "Nd";
	dni_tygodnia[1] = "Pon";
	dni_tygodnia[2] = "Wt";
	dni_tygodnia[3] = "Sr";
	dni_tygodnia[4] = "Czw";
	dni_tygodnia[5] = "Pt";
	dni_tygodnia[6] = "Sob";

	let dni = [
		dni_tygodnia[(dzis.getDay()+1) % 7],
		dni_tygodnia[(dzis.getDay()+2) % 7],
		dni_tygodnia[(dzis.getDay()+3) % 7],
		dni_tygodnia[(dzis.getDay()+4) % 7],
		dni_tygodnia[(dzis.getDay()+5) % 7],
		dni_tygodnia[(dzis.getDay()+6) % 7],
		dni_tygodnia[dzis.getDay()]
		]
	
	if(statystykiSrednia != undefined){
		for(let i=0; i < statystykiSrednia.length; i++){
			switch(statystykiSrednia[i].data_pomiaru.substr(0,10)){
				case dzis.getFullYear()+'-'+('0'+(dzis.getMonth()+1)).slice(-2)+'-'+('0' + dzis.getDate()).slice(-2): 
					srednie[6] = statystykiSrednia[i].srednia;
					break;
				case dzis.getFullYear()+'-'+('0'+(dzis.getMonth()+1)).slice(-2)+'-'+('0' + (dzis.getDate()-1)).slice(-2):
					srednie[5] = statystykiSrednia[i].srednia;
					break;
				case dzis.getFullYear()+'-'+('0'+(dzis.getMonth()+1)).slice(-2)+'-'+('0' + (dzis.getDate()-2)).slice(-2):
					srednie[4] = statystykiSrednia[i].srednia;
					break;
				case dzis.getFullYear()+'-'+('0'+(dzis.getMonth()+1)).slice(-2)+'-'+('0' + (dzis.getDate()-3)).slice(-2):
					srednie[3] = statystykiSrednia[i].srednia;
					break;
				case dzis.getFullYear()+'-'+('0'+(dzis.getMonth()+1)).slice(-2)+'-'+('0' + (dzis.getDate()-4)).slice(-2):
					srednie[2] = statystykiSrednia[i].srednia;
					break;
				case dzis.getFullYear()+'-'+('0'+(dzis.getMonth()+1)).slice(-2)+'-'+('0' + (dzis.getDate()-5)).slice(-2):
					srednie[1] = statystykiSrednia[i].srednia;
					break;
				case dzis.getFullYear()+'-'+('0'+(dzis.getMonth()+1)).slice(-2)+'-'+('0' + (dzis.getDate()-6)).slice(-2):
					srednie[0] = statystykiSrednia[i].srednia;
					break;
				default:
					console.log("Brak daty");
			}
		}
	 }

	 if(statystykiPomiary != undefined){
	 	for(let i=0; i < statystykiPomiary.length; i++){
	 		pomiary_dzisiaj[i] = statystykiPomiary[i].wartosc;
	 		nr_pomiaru[i] = i+1;
	 	}
	 }

	return(
		<ScrollView>
			<Text style={styles.s1}> Dzisiejsze pomiary </Text>
			<LineChart
			    data={{
			      labels: nr_pomiaru,
			      datasets: [
			        {
			          data: pomiary_dzisiaj
			        }
			      ]
			    }}
			    width={Dimensions.get("window").width}
			    height={Dimensions.get("window").height/2-50}
			    fromZero 
			    yAxisLabel=""
			    yAxisSuffix=""
			    yAxisInterval={1} // optional, defaults to 1
			    chartConfig={{
			      backgroundColor: '#f2f2f2',
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
			      marginVertical: 10,
			    }}
			/>

			<Text style={styles.s1}> Średnie wyniki pomiarów z ostatnich 7 dni </Text>
			<LineChart
			    data={{
			      labels: dni,
			      datasets: [
			        {
			          data: [
			            srednie[0],
			            srednie[1],
			            srednie[2],
			            srednie[3],
			            srednie[4],
			            srednie[5],
			            srednie[6]
			          ]
			        }
			      ]
			    }}
			    width={Dimensions.get("window").width}
			    height={Dimensions.get("window").height/2-50}
			    yAxisLabel=""
			    yAxisSuffix=""
			    yAxisInterval={1} 
			    chartConfig={{
			      backgroundColor: '#f2f2f2',
			      backgroundGradientFrom: '#f2f2f2',
			      backgroundGradientTo: '#f2f2f2',
			      decimalPlaces: 2, 
			      color: (opacity = 1) => `rgba(140,33,85, ${opacity})`,
			      labelColor: (opacity = 1) => `rgba(90,0,44, ${opacity})`,
			      style: {
			        borderRadius: 16,
			      },
			      propsForDots: {
			        r: "6",
			        strokeWidth: "2",
			        stroke: "#5a002c"
			      },
			    }}
			    bezier
			  />
		</ScrollView>
	)
}

