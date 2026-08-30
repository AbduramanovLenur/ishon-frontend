import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "../store";

interface IProps {
  children: ReactNode
}

const StoreProvider: FC<IProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider;