import { TextareaAutosize } from "@material-ui/core";
import { IFormInputProps } from "../interfaces";

export const Form = (props: IFormInputProps) => {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      onChange={props.onMessageChange}
      value={props.message}
      style={{
        width: "100%",
      }}
      rowsMin={5}
    />
  );
};
