import React from "react";
import { FormattedMessage } from "react-intl";
const Message = ({message, noTranslate=false, color="black" }) => {
    // если в стиль добавить цвет через ${color}, то он не применяется!!!! ?????
    const styleEl=`text-xs lg:text-sm font-light text-`+color+`-600 h-10 flex items-center bg-gray-200 px-5 rounded-md `;
    return (
        <div className={styleEl}>
            <p className={"m-0"}>{noTranslate ? message : <FormattedMessage id={message} />}</p>
        </div>
    )
};

export default Message;
