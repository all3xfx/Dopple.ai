import { createQuery } from "react-query-kit";
import { request } from "../fetch";

interface Variables {
  user: string;
}
export const useDopplesData = createQuery<DoppleList, Variables>({
  primaryKey: "/firebase/getDopplesDataByUser",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    return request(`${primaryKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
  },
});
