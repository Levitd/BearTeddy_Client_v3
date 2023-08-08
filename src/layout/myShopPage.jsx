import React from "react";
import Page from "../components/page";
import MyShopForm from "../components/ui/myShopForm";

const MyShopPage = ({ shop }) => {
    return (
        <Page widthScreen="max-w-lg my-5 px-5 p-5 mx-auto bg-state-300 rounded border-2 shadow-md" title={shop ? "shop_settings" : "create_shop"}>
            <MyShopForm shop={shop} />
        </Page>
    );
};

export default MyShopPage;
