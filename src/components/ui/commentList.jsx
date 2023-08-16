import React, { useEffect, useState, useRef } from "react";
import Page from "../page";
import configFile from "../../config.json";
import { FormattedNumber } from "react-intl";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { getComment, getCommentIsLoading, getCommentsUsers, loadCommentByProduct } from "../../store/comment";
import ImgFileld from "../common/form/img";
import { getCurrentUser } from "../../store/users";

const CommentList = ({ title, addStyle, product_id }) => {
    const commentList = useSelector(getComment());
    //Имеем массив объектом с Id_user коментариев к товару, нам нужен просто массив для передачи в запрос

    const dispatch = useDispatch();

    const loadingComment = useSelector(getCommentIsLoading());
    const [loadedData, setloadedData] = useState(loadingComment);
    const intl = useIntl();
    const curentUser = useSelector(getCurrentUser());
    let usersCommentsList = useSelector(getCommentsUsers());

    useEffect(() => {
        if (!loadingComment) {
            dispatch(loadCommentByProduct(product_id));
        }

        setloadedData(loadingComment)
    }, [loadedData])

    const firebaseStorigeUrl = configFile.imgPreviewPathFirebaseStorige;

    if (usersCommentsList && usersCommentsList && curentUser && curentUser.length > 0) {
        usersCommentsList = [...usersCommentsList, curentUser[0]]
    } else if (!usersCommentsList && curentUser && curentUser.length > 0) {
        usersCommentsList = curentUser[0];
    }
    console.log(usersCommentsList, curentUser);

    if (commentList && commentList.length > 0 && usersCommentsList && usersCommentsList.length > 0) {
        const commentListNew = commentList.map((comm) => {
            return { ...comm, user: usersCommentsList.find((user) => user._id === comm.user_id) }
        })
        return (
            <Page title={title} addStyle={addStyle} widthScreen="flex flex-col flex-wrap gap-5 my-2" pageMargin="">
                {
                    commentListNew.map((comm, idx) => {
                        return (
                            <div key={"com_" + idx} className={"grid grid-cols-5 gap-2 lg:gap-3"}>
                                <ImgFileld
                                    path="imgProfilePathFirebaseStorige"
                                    file={`${(comm.user.image.length === 0) ? "no-image-icon.png" : comm.user.image[0].name}`}
                                    token={comm.user.image.length === 0 ? "f7499845-a9dc-49f5-80ff-bb444a933d15" : comm.user.image[0].token}
                                    addClass="w-16 h-auto mx-left mb-2 rounded-md place-self-center" />
                                <p className={"bg-slate-200 col-span-4 rounded-md p-1 text-base text-gray-800"}>
                                    {comm.comment}
                                </p>
                            </div>
                        )
                    })
                    //     return (
                    //             <div key={"b1_" + prod._id} className="grid grid-cols-10 grid-rows-4 items-center justify-items-center content-start bg-slate-100 ">
                    //                     <div className="col-span-2 lg:col-span-1 row-span-4 " key={"b3_" + prod._id}>
                    //                         <NavLink to={"/myshop/products/" + prod._id} key={"nl_" + prod._id}>
                    //                            {prod.image && prod.image.length > 0 &&
                    //                                <img className="inline-block border-0 shadow-inner" src={`${firebaseStorigeUrl}${prod.image[0].name}?alt=media&token=${prod.image[0].token}`} alt="" key={`activeProductImage_${prod.image[0].name}`} />
                    //                            }
                    //                         </NavLink>
                    //                     </div>
                    //                     <div className="col-span-8 lg:col-span-4 row-span-2 lg:row-span-4 px-2 bg-slate-100 w-full h-full text-sm lg:text-base font-normal text-sky-800 " key={"v4_" + prod._id}>
                    //                         {prod.name}
                    //                     </div>
                    //                 <HeaderBasket/>
                    //                 <div className={style+" col-span-2 lg:col-span-1 flex flex-row items-center"}>
                    //                     {prod.count}
                    //                     {(!prod.quantity || prod.quantity<1) &&
                    //                        <ExclamationCircleIcon onClick={handleInfoCount} className="ms-2 h-6 w-6 lg:h-10 lg:w-10 text-red-400 hover:text-red-800 cursor-pointer hover:scale-150 transition-transform duration-300" key={`0info_${prod._id}`} />
                    //                     }
                    //                 </div>
                    //                 <div className={style+" col-span-2 lg:col-span-1"}>
                    //                     <FormattedNumber value={prod.price} style={`currency`} currency='USD' />
                    //                 </div>
                    //                 <div className={style+" col-span-2 lg:col-span-1"}>
                    //                     <FormattedNumber value={prod.shipping} style={`currency`} currency='USD' />
                    //                 </div>
                    //                 <div className={style+" col-span-2 lg:col-span-1 flex flex-row relative"}>
                    //                     <FormattedNumber value={(Number(prod.price)+Number(prod.shipping))*Number(prod.count)} style={`currency`} currency='USD' />
                    //                     <button data-product={prod._id} onClick={handleTrashProductFromBasket} className={"absolute lg:hidden -right-1 -top-14"}>
                    //                         <TrashIcon className="h-8 w-8 text-red-400 hover:text-red-800 cursor-pointer hover:scale-150 transition-transform duration-300" key={`0trash_${prod._id}`} />
                    //                     </button>
                    //                 </div>
                    //                 <div className={style+" col-span-1 lg:col-span-1 relative"}>
                    //                     {/* desktop*/}
                    //                     <button data-product={prod._id} className={"hidden lg:block"}>
                    //                         <TrashIcon onClick={handleTrashProductFromBasket} className="h-12 w-12 text-red-400 hover:text-red-800 cursor-pointer hover:scale-150 transition-transform duration-300" key={`0trash_${prod._id}`} />
                    //                     </button>
                    //                 </div>
                    //             </div>
                    //     );
                    // })
                }
            </Page>
        )
    } else {
        return (
            <>
                {<Page title={"no_comments_be_the_first"} />}
            </>
        )
    }
}

export default CommentList;
