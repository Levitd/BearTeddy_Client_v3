import React from "react";
import Page from "../components/page";
import Title from "../components/title";
import { FormattedMessage } from "react-intl";
import AutorList from "../components/ui/autorList";

const AutorsPage = () => {
    return (
        <Page title={"autors"} addStyle={"mb-5"}>
            <AutorList/>
        </Page>
    );
};

export default AutorsPage;
