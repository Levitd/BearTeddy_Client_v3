import React from "react";
import {CurrencyDollarIcon, ShoppingCartIcon, RocketLaunchIcon} from "@heroicons/react/24/solid";
const PriceAndDelivery = ({price, shipping }) => {
    const handleClickBuy = ()=>{
        console.log('click buy')
    }
    return (
        <div className="block text-sm lg:text-base font-medium text-slate-700 text-center flex flex-row justify-around">
            <button onClick={handleClickBuy} className={"hover:scale-125 transition-transform duration-300"}><ShoppingCartIcon className="h-10 w-10 text-red-300 hover:text-red-800 pb-2" /></button>
            <p className={"text-lg font-semibold text-zinc-800 flex flex-row"}>{price}<CurrencyDollarIcon className="h-10 w-10 text-red-300 hover:text-red-800 pb-2" /></p>
            <p className={"text-lg font-semibold text-zinc-800 flex flex-row"}>{shipping}<RocketLaunchIcon className="h-10 w-10 text-red-300 hover:text-red-800 pb-2" /></p>
        </div>
    )
};

export default PriceAndDelivery;
