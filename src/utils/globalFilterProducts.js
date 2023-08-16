import localStorageService from "../services/localStorage.service";

const getGlobalFilter = () => {
    const globalFilter = localStorageService.getGlobalFilter();
    let filter = null;
    if (globalFilter && "listBay" in globalFilter) {
        switch (globalFilter.listBay) {
            case 3: // не проданные
                filter = { filter: JSON.stringify({ quantity: { $gt: 0 } }) }
                break;
            case 4: // проданные
                filter = { filter: JSON.stringify({ quantity: 0 }) }
                break;
            default:
                filter = null
        }

    }
    return filter
}
export default getGlobalFilter;
