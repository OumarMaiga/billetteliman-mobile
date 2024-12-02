import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    //Profile
    profile_header: {
        paddingBottom: 10
    },
    profile_header_icon_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "#22812B",
        height: 170,
        paddingTop: 40
    },
    profile_header_info: {
        alignItems: "center",
        marginTop: -100
    },
    profile_image: {
        height: 160,
        width: 160,
        borderRadius: 160,
        borderWidth: 4,
        borderColor: "#fff",
        backgroundColor: "#C4C4C4",
        resizeMode: 'cover'
    },
    profile_body: {
        margin: 20
    },
    profile_title: {
        fontWeight: "bold",
        fontSize: 24
    },
    menu_item: {
        padding: 6,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#979797",
        borderBottomWidth: 1,
    }
});

export default styles;