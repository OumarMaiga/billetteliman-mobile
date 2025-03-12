import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Loading } from '../../component/Loading.js';
import * as GLOBAL from "../../../data/global.js";
import { getPaymentReturn } from '../../../service/payment.js';

const Payment = ({ route, navigation }) => {
	const { url, boughtTicketId, ticket_id, day } = route.params;
	const [isLoading, setIsLoading] = useState(true);
	const fetchPaymentReturn = async () => {
		try {
		
			if (global.debug >= GLOBAL.LOG.INFO) console.log("Payment::fetchPaymentReturn()");      
			
			setIsLoading(true);      
			
			const response = await getPaymentReturn(boughtTicketId);

			if (response && !response.error) {
				switch (response.datas.status) {
					case 'SUCCESS':
						navigation.navigate('Ticket', {
							"day": day,
							"status": 'success',
							"boughtTicketId": boughtTicketId,
						});            
						break;
					case 'PENDING':
						navigation.navigate('Ticket', {
							"ticket_id": ticket_id,
							"day": day,
							"status": 'pending',
						});
						break;
					case 'INITIATED':
						navigation.navigate('Ticket', {
							"ticket_id": ticket_id,
							"day": day,
							"status": 'initiated',
						});
						break;
					default:
						navigation.navigate('Ticket', {
							"ticket_id": ticket_id,
							"day": day,
							"status": 'echec',
						});
						break;
				}
			} else {
				navigation.navigate('Ticket', {
					"ticket_id": ticket_id,
					"day": day,
					"status": 'echec',
				});
			}
		} catch (error) {
			if (global.debug >= GLOBAL.LOG.ROOT) console.log("Payment::fetchPaymentReturn()::catch ",error.message);
			navigation.navigate('Ticket', {
				"ticket_id": ticket_id,
				"day": day,
				"status": 'echec',
			});
		} finally {
			if (global.debug >= GLOBAL.LOG.ROOT) console.log("Payment::fetchPaymentReturn()::response ",JSON.stringify(response));
			setIsLoading(false);
		}
	}

  const handleNavigationChange = async (navigationState) => {
    const { url } = navigationState;
    if(url.includes("api/payment/")) {
		if(url.includes("api/payment/return")) {
			fetchPaymentReturn();
		} else if(url.includes("api/payment/cancel")) {
			navigation.navigate('Ticket', {
				"ticket_id": ticket_id,
				"day": day,
				"status": 'cancel',
			});
		} else {
			navigation.navigate('Ticket', {
				"ticket_id": ticket_id,
				"day": day,
				"status": 'echec',
			});
		}
	}
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loader}
        />
      )}
      <WebView
        source={{ uri: url }}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={handleNavigationChange}
        style={styles.webview}
      />
      <Loading isLoading={isLoading}/>    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});

export default Payment;
