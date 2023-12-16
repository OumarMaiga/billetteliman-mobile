import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    start_container: {
        flex: 1,
        backgroundColor: "#09CC1C",
        position: "relative"
    },
    start_image: {
        marginTop: 60,
        flexDirection: "row",
        justifyContent: 'center',
        alignSelf: "center",
        width: 300,
        height: 300
    },
    start_item_container: {
        bottom: 40, 
        position: "absolute", 
        marginHorizontal: 20
    },
    start_title: {
        marginBottom: 20,
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 40,
        marginHorizontal: 20,
        color: "#fff"
    },
    button_container: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    button_start: {
        backgroundColor: "#fff",
        color: "#09CC1C",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    button_start_text: {
        color: "#09CC1C", 
        fontSize: 22
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        paddingLeft: 5,
        marginBottom: 10,
        height: 40,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        fontSize: 16,
    },
    link: {
        color: '#0000EE'
    }

});

export default styles;