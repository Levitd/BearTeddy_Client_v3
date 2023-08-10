import React from "react";
import {EyeIcon, HeartIcon} from "@heroicons/react/24/solid";

const Heart = ({heart }) => {
    return (
        <div className="flex flex-row flex-nowrap">
            <HeartIcon className="h-6 w-6 text-red-300 hover:text-red-800 pb-2" />
            {/*TODO add like counter   */}
            <div className=" text-xs lg:text-sm font-mono font-light text-slate-400 text-left">{heart}</div>
        </div>
    )
};

export default Heart;
