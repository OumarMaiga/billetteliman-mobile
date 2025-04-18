import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    //All
    container: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 28
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 40,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: 'center',
    },
    custom_button: {
        backgroundColor: "#22812B",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 18,
    },

    //Home
    adds_container: {
        marginBottom: 20
    },
    adds_image: {
        width: "100%",
        height: 200,
        backgroundColor: '#c4c4c4'
    },
    station_container: {
        margin: 5,
    },
    station_title: {
        fontSize: 22,
        marginLeft: 10
    },
    station_item_container: {
        flex: 1,
        flexDirection: "row"
    },
    search_section: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: -45,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#22812B',
    },
    search_icon: {
        padding: 10,
    },    
    search_input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
        height: 50,
        fontSize: 18,
        borderRadius: 5
    },

    //Detail
    ticket_detail_container: {
        padding: 20,
        backgroundColor: "#EFEFEF"
    },
    ticket_detail_station: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
    ticket_detail_item_row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    ticket_detail_item: {
        flex: 1,
    },
    ticket_detail_item_label: {
        fontSize: 12,
        color: "#979797"
    },
    ticket_detail_item_text: {
        fontSize: 18,
        fontWeight: "bold"
    },
    ticket_detail_form_container: {
        padding: 20
    },
    ticket_detail_form_billet: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: 18,
        fontWeight: "600"
    },
    ticket_detail_qr_container: {
        padding: 20,
        flex: 1,
        marginTop: 10,
        marginBottom: 20
    },
    qr_code_image: {
        justifyContent: "center",
        alignSelf: "center",
        height: 250,
        width: 250
    },
    ticket_detail_nb_title: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16
    },
    ticket_detail_nb_text: {
        color: "black",
        fontWeight: "normal",
        fontSize: 16
    },

    //Profile
    profile_ticket_bought_container: {
        flexDirection: "row",
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#EFEFEF',
    },
    profile_ticket_bought: {
        flex: 1,
    },
    profile_ticket_bought_image: {
        width: 40, 
        height: 40,
    },
    profile_header_container: {
        backgroundColor: "#09CC1C",
        padding: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    profile_header_title: {
        fontSize: 28,
        color: "#fff",
        fontWeight: "bold"
    },
    profile_info_perso_container: {
        padding: 20,
        marginBottom: 20
    },
    profile_info_perso_item_container: {
        flexDirection: "row",
        marginBottom: 10
    },
    profile_info_perso_item_icon: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    profile_info_perso_item: {
        padding: 10
    },
    profile_info_perso_item_label: {
        fontSize: 12,
        color: "#979797"
    },
    profile_info_perso_item_text: {
        fontSize: 18,
        fontWeight: "bold"
    },


    //Setting
    setting_item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20
    },
    setting_item_content: {
        flexDirection: "row",
        alignItems: "center",
    },
    setting_item_text: {
        fontSize: 18,
        marginLeft: 10
    },

    //Search 
    ticket_available_container: {
        margin: 10
    },
    ticket_available_title: {
        fontSize: 28,
        fontWeight: "bold"
    },
    ticket_available_date: {
        fontSize: 18,
        marginTop: 5
    },
    ticket_available: {
        fontSize: 14,
        fontWeight: '300',
        marginTop: 10
    },


    // Drawer Navigation
  head_info: {
    padding: 20,
    flexDirection: "row",
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#09CC1C',
    marginBottom: 20,
  },
  head_icon: {
    padding: 10,
  },
  user_name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  user_email: {
    fontSize: 14,
    color: '#666',
  },
});

export default styles;