import React from "react";
import Page from "../components/page";
import CommentForm from "../components/ui/commentForm";

const Comments = ({ title, addStyle }) => {
    return (
        <Page title={title} addStyle={addStyle} pageMargin="">
            <CommentForm/>
        </Page>
    );
}

export default Comments;
