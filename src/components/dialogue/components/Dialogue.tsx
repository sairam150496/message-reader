import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CANCEL, SAVE } from "../../../common";
import { Form } from "../../edit-form";
import { IDialogueProps } from "../interfaces";

export default function FormDialog(props: IDialogueProps) {
  const {
    open,
    onMessageChange,
    onCancel,
    onSave,
    onDialogueClose,
    message,
  } = props;

  const handleCanel = () => {
    if (onCancel) onCancel();
  };
  const handleSave = () => {
    if (onSave) onSave();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onDialogueClose}
        scroll="paper"
        fullWidth={true}
        maxWidth={"lg"}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Message"}</DialogTitle>
        <DialogContent>
          <Form message={message} onMessageChange={onMessageChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCanel} color="secondary">
            {CANCEL}
          </Button>
          <Button onClick={handleSave} color="primary">
            {SAVE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
