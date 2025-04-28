import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    start_container: {
        flex: 1,
        position: "relative"
    },
    start_image_container: {
        backgroundColor: "#22812B",
    },
    start_image: {
        marginTop: 60,
        flexDirection: "row",
        justifyContent: 'center',
        alignSelf: "center",
        width: 300,
        height: 350,
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
        color: "#22812B"
    },
    button_container: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    button_start: {
        backgroundColor: "#fff",
        color: "#09CC1C",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
	button_text: {
		backgroundColor: "#22812B",
		color: "#fff",
		textAlign: 'center',
		paddingHorizontal: 10,
		paddingVertical: 4,
		fontSize: 18,
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
        height: 50,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        justifyContent: "center",
        fontSize: 16,
    },
    picker: {
        height: 50,
    },
    link: {
        color: '#0000EE'
    },

});

export default styles;