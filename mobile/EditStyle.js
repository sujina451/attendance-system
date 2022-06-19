import { StyleSheet } from "react-native";
import  { colors, height, width } from './Theme'


const editstyles = StyleSheet.create({
    mainFont: {
        fontFamily:'Nunito-SemiBold',
    },
    maintask_wrap: {
        position: 'relative',
        backgroundColor: "#fff",
        width: "90%",
        backgroundColor:colors.color_white,
        marginBottom:20,
        borderRadius: 10,
        shadowColor: colors.color_black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    task_wrap: {
        position: 'relative',
        backgroundColor: "#fff",
        width: width*0.9,
        backgroundColor:colors.color_white,
        marginBottom:20,
        paddingRight: 25,
        borderRadius: 10,
        shadowColor: colors.color_black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    task_heading: {
        fontFamily:'Nunito-SemiBold',
        color: '#666',
        fontSize: 15,
    },
    statusColor: {
        // position: "absolute",
        left: 0,
        top: 0,
        width: 10,
        height: '100%',
        backgroundColor: colors.status_color,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    pendingstatusColor:{
        width: 10,
        height: '100%',
        backgroundColor: colors.pendingstatus_color,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    holdstatusColor:{
        width: 10,
        height: '100%',
        backgroundColor: colors.holdbutton_background,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    completestatusColor:{
        width: 10,
        height: '100%',
        backgroundColor: colors.completestatus_color,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    task_wrapTop: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 5,
        
    },
    task_downIcon: {
        position: "absolute",
        top: 0,
        right: 5,
        fontSize: 16,
        color: "#666"
    },
    contentWrap: {
        width: "100%",
        paddingVertical:20,
        paddingHorizontal:10,
       
    },
    taskContent: {
        marginTop:10
    },
    taskform:{
        width: "100%",
        marginBottom:10,
    },
    taskDescription: {
        marginTop: 10,
    },
    taskTimeWrap: {
        flexDirection: "row",
        width:'100%',
        justifyContent:"space-between"
    },
    taskEstimatedTime: {
        flexBasis: "45%"
    },
    taskSpentTime: {
        flexBasis: "45%",
       
    },
    taskInput: {
       width:"100%",
        height: 30,
        paddingLeft: 10,
        paddingVertical: 5,
        marginTop: 8,
        borderBottomWidth: 0,
        borderRadius: 5,
        backgroundColor: "#f2f2f2",
        fontSize:12,
    },
    tasktimeInput:{
        width:"45%",
        height: 30,
        paddingLeft: 10,
        paddingVertical: 5,
        marginTop: 8,
        borderBottomWidth: 0,
        borderRadius: 5,
        backgroundColor: "#f2f2f2",
        fontSize:12,
    },
    dateInput: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 5,
        marginTop: 8,
        borderBottomWidth: 0,
        borderRadius: 5,
        backgroundColor: "#f2f2f2",
    },
    inputTopText: {
        fontSize: 12,
        color: "#555",
        fontFamily:'Nunito-SemiBold',
        
    },
    timeSeparator: {
        width: 10,
        height: 3,
        backgroundColor: "#4A6888",
        marginTop: 20,
        borderRadius: 15,
        opacity: 0.8
    },
    taskButtonWrap: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent:"space-between",
    },
    startButton: {
        width: 100,
        padding: 5,
        backgroundColor: colors.color_green,
        fontSize: 12,
        textAlign: "center",
        borderRadius: 15,
    },
    addtaskButton: {
        width: 100,
        padding: 5,
        backgroundColor: colors.savebutton_background,
        display: "flex",
        borderRadius: 15,
    },
    holdButton: {
        width: 100,
        padding: 5,
        backgroundColor: colors.holdbutton_background,
        display: "flex",
        borderRadius: 15,
        textAlign: "center",
        alignItems:'center'
    },
 
    pendingButton: {
        width: 100,
        padding: 5,
        height:25,
        backgroundColor: colors.pendingbutton_background,
        display: "flex",
        borderRadius: 15,
        textAlign: "center",
        alignItems:'center'
    },
    completeButton: {
        width: 100,
        paddingVertical: 5,
        height:25,
        backgroundColor: colors.completebutton_background,
        borderRadius: 15,
        display: "flex",
        alignItems:'center',
        textAlign:'center'
    },
    dashboardStart: {
        width: 100,
        padding: 5,
        backgroundColor: colors.color_green,
        fontSize: 12,
        textAlign: "center",
        borderRadius: 15,
        opacity: 0.2,
    },
    checkoutButton: {
        width: 100,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: "#FC574B",
        fontSize: 12,
        textAlign: "center",
        borderRadius: 20,
    },
    checkoutbtnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily:'Nunito-SemiBold',
        textAlign: "center"
    },
    btnText: {
        color: colors.button_text,
        fontSize: 12,
        height: 18,
        display: "flex",
        alignItems: "center",
        fontFamily:'Nunito-SemiBold',
        textAlign: "center",
    },
    checkInPageBox: {
        display: "flex",
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between"
    },
    checkInTimeInfo: {
        fontSize: 20,
        marginTop: 1,
        fontFamily:'Nunito-SemiBold',
    },
    checkInTimeTitle: {
        color: "#999",
        fontSize: 11,
        fontFamily:'Comfortaa-Bold',
    },
    taskWrapHead: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    checkInPageHeading: {
        fontSize:25,
        fontFamily:'Nunito-SemiBold',
        color:colors.text_color,
        justifyContent:'flex-start',
        alignSelf:'flex-start',
    },
    dashboardMainTaskWrap: {
        paddingVertical: 15,
        paddingLeft: 15,
        width: "100%",
    },
    dashboardPageWrap: {
        position: "relative",
    },
    accordionEdit: {
        // paddingVertical: 10,
        margin: 0,
        // height: 180
    },
    accordionContainer: {
        margin: 0,
        marginBottom: 0,
        backgroundColor: "#333",
        padding: 0,
    },
    leavereportBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
        height: "auto",
        backgroundColor: colors.color_white,
        marginBottom: 10,
        padding: 20,
        borderRadius: 20,
        shadowColor: colors.color_black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
        overflow: "hidden",
        marginTop: 10,
    },
    btnGreen: {
        width: 100,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: "#00C99D",
        fontSize: 12,
        textAlign: "center",
        borderRadius: 20,
        marginTop: 5,
    },
    mainbtnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily:'Nunito-SemiBold',
        textAlign: "center"
    },
    textBold: {
        fontFamily:'Nunito-Bold',
        marginTop: 5,
    }
});

export default editstyles;
    