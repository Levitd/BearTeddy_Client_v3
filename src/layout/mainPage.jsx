import React from "react";
import { useIntl } from "react-intl";
import ListBoxFilter from "../components/ListBoxFilter";
import Page from "../components/page";
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import InputSearch from "../components/inputSearch";
import ProductList from "../components/ui/productList";
import ViewedList from "../components/ui/viewedList";

const MainPage = ({ locale }) => {
    const intl = useIntl()
    // console.log(intl.messages.search)
    const placeholder = intl.messages.search;

    // const handleClickFilters = () => {
    //     console.log("handleClickFilters");
    //     const filtersEl = document.querySelector(".filters");
    //     filtersEl.classList.toggle("filters_show");
    // };
    const listBay = [
        { id: 1, name: intl.messages.the_newest },
        { id: 2, name: intl.messages.favorite },
        { id: 3, name: "Еще не проданные" },
        { id: 4, name: "Нашедшие свой дом" },
        { id: 5, name: "Ищут новый дом" },
    ];
    const listSize = [
        { id: 1, name: intl.messages.all_sizes },
        { id: 2, name: "до 14 см" },
        { id: 3, name: "от 14 см до 20 см" },
        { id: 4, name: "от 20 см до 35 см" },
        { id: 5, name: "от 35 см и выше" },
    ];
    const listPrice = [
        { id: 1, name: intl.messages.any_price },
        { id: 2, name: "до 100$" },
        { id: 3, name: "от 100$ до 250$" },
        { id: 4, name: "от 250$ до 500$" },
        { id: 5, name: "от 500$ и выше" },
    ];
    const filterStyle = "w-full lg:max-w-xs";
    return (
        <>
            <div className="mb-20 lg:mb-0" >
                <Page border=" rounded border-0 shadow-none lg:border-2 lg:shadow-md" pageMargin={""}>
                    <div className="main">
                        <div className="flex flex-col lg:flex-row">
                            <InputSearch name="search" placeholder={placeholder} />
                            <div className="filters pe-2 py-2 hidden lg:flex flex-col lg:flex-row w-11/12 lg:w-full mx-auto justify-around flex-wrap sm:flex-nowrap flex-auto gap-2 place-content-stretch">
                                <div className={filterStyle}>
                                    <ListBoxFilter name="listBay" list={listBay} locale={locale} />
                                </div>
                                <div className={filterStyle}>
                                    <ListBoxFilter name="listSize" list={listSize} locale={locale} />
                                </div>
                                <div className={filterStyle}>
                                    <ListBoxFilter name="listPrice" list={listPrice} locale={locale} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Page>
                <ProductList list="all" title={"the_newest"} />
                <ViewedList title={"recently_viewed"} />
            </div>
        </>
    );
};

export default MainPage;
