import { IFormInputProps } from "../..";

export interface IDialogueProps extends IFormInputProps {
  open: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  onDialogueClose?: () => void;
}
