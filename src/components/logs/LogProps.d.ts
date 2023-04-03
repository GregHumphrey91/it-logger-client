export type LogProps = {
  message: string;
  attention: boolean;
  tech: string;
  date: Date;
  id: number;
};

export interface AddLogProps {
  message: string;
  attention: boolean;
  tech: string;
  date: Date;
}
