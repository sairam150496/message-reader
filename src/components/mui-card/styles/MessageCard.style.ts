import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    marginBottom: "2%",
  },
  header: {
    transform: "rotate(-180deg)",
    fontSize: "1em",
    fontFamily: "sans-serif",
    paddingRight: "2%",
  },

  messageSliderDelete: {
    background: "red",
    color: "#FFFFFF",
    display: "none",
    maxWidth: "10%",
    marginTop: "4%",
    marginLeft: "2%",
    marginBottom: "2%",
    borderRadius: "10px",
    writingMode: "vertical-rl",
    justifyContent: "center",

    animationDuration: "1s",
    animationDelay: "0s",
  },
  messageSliderEdit: {
    background: "blue",
    color: "#FFFFFF",
    display: "none",

    maxWidth: "10%",
    marginTop: "4%",
    marginRight: "2%",
    marginBottom: "2%",
    borderRadius: "10px",
    writingMode: "vertical-rl",
    justifyContent: "center",

    animationDuration: "1s",
    animationDelay: "0s",
  },
  deleteIcon: {
    fontSize: "2.0em",
  },
  editIcon: {
    fontSize: "2.0em",
  },
  avatar: { borderRadius: "50%" },
}));
