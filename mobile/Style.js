import { StyleSheet } from "react-native";
import { colors, width, height } from "./Theme";

const styles = StyleSheet.create({
  customContainer: {
    paddingHorizontal: width * 0.05,
    margin: "auto",
    backgroundColor: colors.body_background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.body_background,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: colors.input_background,
    color: colors.input_text,
    fontFamily: "Comfortaa-Regular",
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    marginTop: 10,
    color: "#333",
    width: "100%",
    fontFamily: "Nunito-Bold",
  },
  button: {
    padding: 10,
    backgroundColor: colors.secondary_color,
    borderRadius: 5,
    width: 100,
    fontSize: 10,
    marginVertical: 10,
    fontFamily: "Comfortaa-Regular",
  },
  icon: {
    color: colors.color_white,
    fontSize: 30,
    backgroundColor: colors.secondary_color,
    padding: 15,
    paddingLeft: 20,
    width: 60,
    height: 60,
    textAlign: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
    marginTop: 25,
    textAlignVertical: "center",
  },
  footer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  footer_text: {
    color: colors.footer_text,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    color: colors.text_color,
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
  },
  heading: {
    fontSize: 25,
    fontFamily: "Nunito-SemiBold",
    color: colors.text_color,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  progressbar_text: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 12,
    paddingVertical: 5,
    color: colors.text_color,
  },
  boxstyle: {
    width: "90%",
    height: "auto",
    backgroundColor: colors.color_white,
    marginBottom: 30,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 20,
    shadowColor: colors.color_black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
    marginTop: 30,
  },
  progressboxstyle: {
    width: "90%",
    height: "auto",
    backgroundColor: colors.color_white,
    marginBottom: 30,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 20,
    shadowColor: colors.color_black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  dashboard_image: {
    width: "100%",
    overflow: "hidden",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    height: 150,
  },
  dashboard_top: {
    flex: 1,
    flexDirection: "row",
    width: width * 0.9,
    alignSelf: "center",
    margin: "auto",
    justifyContent: "space-between",
  },
  dashboard_content: {
    height: "100%",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  dashprofile: {
    position: "relative",
    alignSelf: "center",
  },
  dashheading: {
    fontSize: 20,
    fontFamily: "Comfortaa-Bold",
    color: colors.color_white,
  },
  dashsmall: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 12,
    color: colors.color_white,
  },
  drop_menu: {
    marginTop: 70,
    backgroundColor: "#fff",
  },
  dropdown_icon: {
    fontSize: 14,
    color: colors.dropdown_icon,
    paddingHorizontal: 10,
  },
  dropdown_text: {
    fontSize: 15,
    color: colors.text_color,
    paddingHorizontal: 10,
    fontFamily: "Nunito-SemiBold",
  },

  dashboard_options_header: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    backgroundColor: colors.primary_color,
    padding: 8,
    color: colors.color_white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
  },
  checkin_section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  checkin_text: {
    fontSize: 16,
    color: colors.primary_text,
    fontFamily: "Nunito-SemiBold",
    marginTop: 5,
  },
  progressbar: {
    height: 8,
    borderColor: "#fff",
    marginBottom: 15,
  },
  progressbar_layout: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  progressbar_text: {
    fontFamily: "Comfortaa-Regular",
    flex: 1,
    fontSize: 12,
    color: colors.text_color,
  },
  progress_bullet: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(242, 242, 242, 0.5)",
  },
  loader: {
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },

  dashboardPageWrap: {
    position: "relative",
  },
  leaveboxstyle: {
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
    marginTop: 20,
  },
  Leaveinput: {
    height: 40,
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: colors.input_background,
    color: colors.input_text,
    fontFamily: "Comfortaa-Regular",
    borderRadius: 10,
    fontSize: 12,
  },
  leaveheading: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    alignSelf: "flex-start",
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  leavesubtitle: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    alignItems: "flex-start",
  },
  LeaveButtonWrap: {
    flex: 1,
    marginVertical: 20,
  },
  leaveButton: {
    width: 100,
    padding: 5,
    backgroundColor: colors.savebutton_background,
    borderRadius: 15,
  },
  leavebtnText: {
    color: colors.button_text,
    fontSize: 14,
    height: 18,
    display: "flex",
    alignItems: "center",
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
  },
});

export default styles;