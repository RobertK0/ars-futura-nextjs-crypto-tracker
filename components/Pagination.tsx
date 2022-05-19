import type { NextPage } from "next";
import { useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/Pagination.module.css";

const Pagination: NextPage = () => {
  const ctx = useContext(Ctx);

  if (ctx.showFav) return null;
  return (
    <div className={styles.container}>
      <button onClick={ctx.setPage.bind(null, false)}>
        {"<<<"}
      </button>
      <span>{ctx.page}</span>
      <button onClick={ctx.setPage.bind(null, true)}>
        {">>>"}
      </button>
    </div>
  );
};

export default Pagination;
