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
    paddingRight: "5%",
  },
  messageSlider: {
    background: "red",
    color: "#FFFFFF",
    display: "none",
    writingMode: "vertical-rl",
    justifyContent: "center",
  },
  deleteIcon: {
    fontSize: "2.2em",
  },
  avatar: { borderRadius: "50%" },
}));
