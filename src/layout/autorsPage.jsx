import React from "react";
import Page from "../components/page";
import Title from "../components/title";
import { FormattedMessage } from "react-intl";

const AutorsPage = () => {
    return (
        <Page>
            <Title><FormattedMessage id='autors' /></Title>
        </Page>
    );
};

export default AutorsPage;
