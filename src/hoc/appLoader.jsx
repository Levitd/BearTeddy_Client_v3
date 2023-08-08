import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUsersLoadingStatus, loadUserById } from "../store/users";
import { useEffect } from "react";
import PropTypes from "prop-types";
import localStorageService from "../services/localStorage.service";
import { loadShops } from "../store/shops";
import { getProductIsLoading, loadProducts } from "../store/products";
import { loadViewedProductsByIdUser } from "../store/viewed";
import SpinnerLader from "../components/SpinnerLoader";
import { loadAutorProducts } from "../store/autorProducts";


const AppLoader = ({ children }) => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUsersLoadingStatus());
    const isLoadingProducts = useSelector(getProductIsLoading());

    if (!isLoadingProducts) dispatch(loadProducts());
    useEffect(() => {
        if (isLoggedIn) {
            const userId = localStorageService.getUserId();
            dispatch(loadUserById(userId));
            dispatch(loadShops(userId));
            dispatch(loadViewedProductsByIdUser(userId));
            dispatch(loadAutorProducts(userId));
        }
    }, [isLoggedIn, dispatch]);
    // if (userStatusLoading) return "Loading...";
    return (
        <>
            {userStatusLoading && <SpinnerLader />}
            {!userStatusLoading &&
                children
            }
        </>
    );
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
};

export default AppLoader;
