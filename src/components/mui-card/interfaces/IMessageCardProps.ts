export interface IMessageCardProps {
  message: string;
  avatar: string;
  title: string;
  subTitle: string;
  onDelete?: () => void;
}
