import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { CardActions } from "@material-ui/core";
import { useStyles } from "../styles";
import { DELETE } from "../../../common";
import { IMessageCardProps } from "../interfaces";

export const MessageCard = (props: IMessageCardProps) => {
  const { message, avatar, onDelete = () => {}, subTitle, title } = props;

  const classes = useStyles();

  const handleDeleteClick = () => {
    onDelete();
  };

  const handleMouseDown = (event: any) => {
    console.log("mouseDown", event);
  };

  const handleMouseUp = (event: any) => {
    console.log("mouseUp", event);
  };

  const handleMouseMove = (event: any) => {
    console.log("mouseMove", event);
  };

  const handleMouseEnter = (event: any) => {
    console.log("mouseEnter", event);
  };

  const handleMouseLeave = (event: any) => {
    console.log("mouseLeave", event);
  };

  return (
    <Card
      className={classes.root}
      onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      // onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActions
        className={classes.messageSlider}
        onClick={handleDeleteClick}
      >
        <h3 className={classes.header}>{DELETE}</h3>
        <DeleteIcon className={classes.deleteIcon} />
      </CardActions>
      <div>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img
                src={`${process.env.PUBLIC_URL}${avatar}`}
                height="100%"
                width="100%"
                alt=""
              />
            </Avatar>
          }
          title={title}
          subheader={subTitle}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {message}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};
