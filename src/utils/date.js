import { format } from "date-fns";

export const getDateInFormat = (timestamp) => format(new Date(timestamp), "yyyy/MM/dd");
