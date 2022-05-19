import { NextPage } from "next";
import { ReactNode, useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/LoadingWrapper.module.css";

const LoadingWrapper: NextPage<{ children: ReactNode }> = (
  props
) => {
  const ctx = useContext(Ctx);
  if (!ctx.loading) return <>{props.children}</>;
  return <div className={styles.spinner}></div>;
};

export default LoadingWrapper;
