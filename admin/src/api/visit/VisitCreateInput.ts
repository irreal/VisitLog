export type VisitCreateInput = {
  amount: number;
  date: Date;
  description: string;
  isPaid: boolean;
  note?: string | null;
  price: number;
};
