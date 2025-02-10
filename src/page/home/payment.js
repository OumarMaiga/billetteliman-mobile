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
						navigation.navigate('BoughtTicket', {
							"day": day,
							"payment_url": 'status=success',
							"boughtTicketId": boughtTicketId,
						});            
						break;
					case 'PENDING':
						navigation.navigate('Ticket', {
							"ticket_id": ticket_id,
							"day": day,
							"payment_url": 'pending',
						});
						break;
					default:
						if (global.debug >= GLOBAL.LOG.ROOT) console.log("Payment::fetchPaymentReturn()::default ");
						navigation.navigate('Ticket', {
							"ticket_id": ticket_id,
							"day": day,
							"payment_url": 'status=echec',
						});
						break;
				}
			} else {
				if (global.debug >= GLOBAL.LOG.ROOT) console.log("Payment::fetchPaymentReturn()::else ");
				navigation.navigate('Ticket', {
					"ticket_id": ticket_id,
					"day": day,
					"payment_url": 'status=echec',
				});
			}
		} catch (error) {
			if (global.debug >= GLOBAL.LOG.ROOT) console.log("Payment::fetchPaymentReturn()::catch "+error.message);
			navigation.navigate('Ticket', {
				"ticket_id": ticket_id,
				"day": day,
				"payment_url": 'status=echec',
			});
		} finally {
			if (global.debug >= GLOBAL.LOG.ROOT) console.log("Payment::fetchPaymentReturn()::response "+JSON.stringify(response));
			setIsLoading(false);
		}
	}

  const handleNavigationChange = async (navigationState) => {
    const { url } = navigationState;
    console.log('url => '+url);
	console.log(url.includes('return'));
	console.log(url.includes('cancel'));
    if(url.includes("api/payment")) {
    	console.log('includes = api/payment');
		switch (url) {
			case url.includes('return'):
    			console.log('includes = return');
                fetchPaymentReturn();
				break;

			case url.includes('cancel'):
				console.log('includes = cancel');
				navigation.navigate('Ticket', {
					"ticket_id": ticket_id,
					"day": day,
					"payment_url": 'status=cancel',
				});
				break;

			default:
				console.log('includes = default');
				navigation.navigate('Ticket', {
					"ticket_id": ticket_id,
					"day": day,
					"payment_url": 'status=echec',
				});     
				break;
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
