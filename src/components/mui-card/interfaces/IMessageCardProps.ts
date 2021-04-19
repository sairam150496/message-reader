export interface IMessageCardProps {
  message: string;
  avatar: string;
  title: string;
  subTitle: string;
  id: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}
