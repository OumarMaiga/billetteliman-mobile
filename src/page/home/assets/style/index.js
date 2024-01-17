import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    //All
    container: {
        flex: 1
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
        height: 40,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        fontSize: 18,
        borderRadius: 5,
        marginBottom: 10
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
    book_container: {
        padding: 16,
        backgroundColor: '#fff'
    },
    book_title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20
    },


    //Detail
    ticket_detail_container: {
        padding: 20
    },
    ticket_detail_station: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20
    },
    ticket_detail_item: {
        flexDirection: "row",
        marginBottom: 10
    },
    ticket_detail_item_title: {
        fontSize: 20,
        fontWeight: "600",
        width: 100
    },
    ticket_detail_item_text: {
        fontSize: 18,
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

    //Profile
    profile_ticket_bought_container: {
        flexDirection: "row",
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#22812B',
        borderRadius: 10
    },
    profile_ticket_bought_left: {
        flex: 1,
        fontSize: 12
    },
    profile_ticket_bought_right: {
        flex: 1,
        fontSize: 12,
        textAlign: "right"
    },
    profile_ticket_bought_image: {
        width: 40, 
        height: 40,
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
    }
});

export default styles;