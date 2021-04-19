import { useState, useRef } from "react";
import "../styles/gStyles.css";
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
import { Edit } from "@material-ui/icons";

export const MessageCard = (props: IMessageCardProps) => {
  const {
    message,
    avatar,
    onDelete = () => {},
    subTitle,
    title,
    onEdit = () => {},
  } = props;
  const deleteRef = useRef(null);
  const editRef = useRef(null);

  const [touchInitPostn, setTouchInitPostn] = useState<number>(0);

  const classes = useStyles();

  const handleDeleteClick = (e: any) => {
    const idArr = e.target.id.split("_");
    onDelete(idArr[idArr.length - 1]);
  };

  const handleMouseDown = (event: any)=>{
    setTouchInitPostn(event.clientX);
  }

  const handleMouseUp = (event: any)=>{
    const currentMovPostn = event.clientX;
    movementHandle(currentMovPostn, touchInitPostn)
  }

  const handleTouchStart = (event: any) => {
    setTouchInitPostn(event.touches[0].clientX);
  };

  

  const handleEditClick = (event: any) => {
    const idArr = event.target.id.split("_");
    onEdit(idArr[idArr.length - 1]);
    const editElemStyle = (editRef.current! as any).style;
    editElemStyle.display = "";
    editElemStyle.animationName = "";
  };

  const movementHandle = (currentMovPostn: number, touchInitPostn: number)=>{
    const delElemStyle = (deleteRef.current! as any).style;
    const editElemStyle = (editRef.current! as any).style;
    if (currentMovPostn > touchInitPostn + 50) {
      editElemStyle.display = "";
      editElemStyle.animationName = "";
      if (!delElemStyle.display) {
        delElemStyle.display = "flex";
      }
      delElemStyle.animationName = "btn-animation";
    } else if (currentMovPostn + 50 < touchInitPostn) {
      delElemStyle.display = "";
      delElemStyle.animationName = "";
      if (!editElemStyle.display) {
        editElemStyle.display = "flex";
      }
      editElemStyle.animationName = "btn-animation";
    } else if (Math.abs(currentMovPostn - touchInitPostn) < 2) {
    } else {
      editElemStyle.display = "";
      editElemStyle.animationName = "";
      delElemStyle.display = "";
      delElemStyle.animationName = "";
    }
  }

  const handleTouchEnd = (event: any) => {
    const currentMovPostn = event.changedTouches[0].clientX;
    movementHandle(currentMovPostn, touchInitPostn)
  };



  return (
    <Card
      className={classes.root}
      id={`card_${props.id}`}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <CardActions
        ref={deleteRef}
        id={`card_action_delete_${props.id}`}
        className={classes.messageSliderDelete}
        onClick={handleDeleteClick}
      >
        <h3
          id={`card_action_delete_header_${props.id}`}
          className={classes.header}
        >
          {DELETE}
        </h3>
        <DeleteIcon
          id={`card_action_delete_icon_${props.id}`}
          className={classes.deleteIcon}
        />
      </CardActions>
      <div style={{ width: "100%" }}>
        <CardHeader
          id={`card_title_${props.id}`}
          avatar={
            <Avatar
              aria-label="recipe"
              id={`card_title_avatar_${props.id}`}
              className={classes.avatar}
            >
              <img
                id={`card_title_avatar_image_${props.id}`}
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
        <CardContent id={`card_content_${props.id}`}>
          <Typography
            id={`card_message_${props.id}`}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {message}
          </Typography>
        </CardContent>
      </div>
      <CardActions
        ref={editRef}
        id={`card_action_edit_${props.id}`}
        className={classes.messageSliderEdit}
        onClick={handleEditClick}
      >
        <h3
          id={`card_action_edit_header_${props.id}`}
          className={classes.header}
        >
          {"Edit"}
        </h3>
        <Edit
          id={`card_action_edit_icon_${props.id}`}
          className={classes.editIcon}
        />
      </CardActions>
    </Card>
  );
};
