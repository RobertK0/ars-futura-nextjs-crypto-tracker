import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

type context = {
  favorites: string[];
  setFavorites: Function;
  showFav: boolean;
  toggleShowFav: Function;
  searchTerm: string;
  setSearchTerm: Function;
  page: string;
  setPage: Function;
  perPage: string;
  setPerPage: Function;
  loading: boolean;
  setLoading: Function;
};

const initialFavorites: string[] =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("favourites") || "[]")) ||
  [];

const Ctx = createContext<context>({
  favorites: [],
  setFavorites: () => {},
  showFav: false,
  toggleShowFav: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  page: "1",
  setPage: () => {},
  perPage: "10",
  setPerPage: () => {},
  loading: false,
  setLoading: () => {},
});

export const CtxProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFav, setShowFav] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<string>("1");
  const [perPage, setPerPage] = useState<string>("10");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFavorites(initialFavorites);
  }, []);

  const setFavoritesHandler = function (id: string) {
    const persistData = function (data: string[]) {
      if (typeof window !== "undefined")
        localStorage.setItem("favourites", JSON.stringify(data));
      return data;
    };

    setFavorites((prevState) => {
      return persistData(
        !prevState.includes(id)
          ? [...prevState, id]
          : [...prevState].filter((coin) => coin !== id)
      );
    });
  };

  const showFavHandler = function () {
    setLoading(true);
    setPage("1");
    setPerPage((prevState) => (prevState !== "250" ? "250" : "10"));
    setShowFav((prevState) => !prevState);
  };

  const searchTermChangeHandler = function (term: string) {
    setPage("1");
    setPerPage(term ? "250" : "10");
    setSearchTerm(term);
  };

  const setPageHandler = function (next: boolean) {
    setPage((curPage) =>
      !next
        ? curPage !== "1"
          ? `${+curPage - 1}`
          : "1"
        : `${+curPage + 1}`
    );
  };

  const setPerPageHandler = function (page: string) {
    //Placeholder
  };

  const setLoadingHandler = function (state: boolean) {
    setLoading(state);
  };

  const ctxValue = {
    favorites,
    setFavorites: setFavoritesHandler,
    showFav,
    toggleShowFav: showFavHandler,
    searchTerm,
    setSearchTerm: searchTermChangeHandler,
    page,
    setPage: setPageHandler,
    perPage,
    setPerPage: setPerPageHandler,
    loading,
    setLoading: setLoadingHandler,
  };

  return <Ctx.Provider value={ctxValue}>{children}</Ctx.Provider>;
};

export default Ctx;
