import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState
} from "react";
import {useRequest} from "services/Http";
import {defaultTo, get, isEmpty} from "lodash";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Masonry from "@mui/lab/Masonry";

const MasonryLoader = forwardRef((props, ref) => {
    const {
        url,
        initialPageSize = 10,
        columns,
        spacing,
        renderItem,
        renderSkeleton,
        renderEmpty
    } = props;

    const [request, loading] = useRequest();
    const [pageSize] = useState(initialPageSize);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState([]);
    const [sorters, setSorters] = useState([]);
    const [search, setSearch] = useState({});

    const fetchItems = useCallback(() => {
        request
            .post(url, {
                page,
                itemPerPage: pageSize,
                filters,
                sorters,
                search
            })
            .then((response) => {
                setItems((items) => {
                    return page !== 1
                        ? items.concat(response.data)
                        : response.data;
                });

                setHasNextPage(() => {
                    const currentPage = defaultTo(
                        get(response, "meta.current_page"),
                        get(response, "current_page")
                    );

                    const lastPage = defaultTo(
                        get(response, "meta.last_page"),
                        get(response, "last_page")
                    );

                    return currentPage < lastPage;
                });
            })
            .catch((error) => {
                if (!error.canceled) {
                    setHasNextPage(false);
                }
            });
    }, [request, page, pageSize, filters, sorters, search, url]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useImperativeHandle(ref, () => {
        return {
            resetPage() {
                if (page !== 1) {
                    setPage(1);
                } else {
                    fetchItems();
                }
            },

            applyFilters(filters) {
                setFilters(filters);
                setPage(1);
            },

            applySorters(sorters) {
                setSorters(sorters);
                setPage(1);
            },

            applySearch(search) {
                setSearch((state) => ({...state, ...search}));
                setPage(1);
            },

            clearSearch() {
                setSearch({});
                setPage(1);
            }
        };
    });

    const onLoadMore = useCallback(() => {
        setPage((page) => page + 1);
    }, []);

    const [nextRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore
    });

    const showEmpty = !hasNextPage && isEmpty(items);

    return !showEmpty ? (
        <Masonry columns={columns} spacing={spacing}>
            {items.map((i) => renderItem?.(i))}

            {hasNextPage && renderSkeleton?.(nextRef)}
        </Masonry>
    ) : (
        renderEmpty?.()
    );
});

export default MasonryLoader;
