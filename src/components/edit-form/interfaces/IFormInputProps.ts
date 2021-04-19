import { ChangeEvent } from "react";

export interface IFormInputProps {
  message: string;
  onMessageChange: (e: ChangeEvent) => void;
}
