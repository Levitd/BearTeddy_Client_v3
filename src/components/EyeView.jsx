import React from "react";
import {FormattedDate, FormattedRelativeTime} from "react-intl";
import {EyeIcon} from "@heroicons/react/24/solid";

const EyeView = ({viewed }) => {
    return (
        <div className="flex flex-row flex-nowrap">
            <EyeIcon className="h-6 w-6 text-green-600 hover:text-green-800 pb-2" />
            <div className=" text-xs lg:text-sm font-mono font-light text-slate-400 text-left">{viewed || 0}</div>
        </div>
    )
};

export default EyeView;
