import React from "react";
import Page from "../page";
import { FormattedMessage, useIntl } from "react-intl";
import FormComponent, { ButtonField, SubmitCancelButton } from "../common/form";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import { updateProduct } from "../../store/products";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import configFile from "../../config.json";
import { UploadFileToFireBaseStorage } from "../../utils/filesToFromFirebaseStorage";
import { uploadImageActiveProductStart } from "../../services/localStorage.service";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteFileInActiveProduct, updateActiveProduct } from "../../store/activeProduct";
import Title from "../title";

const ProductEditForm = ({ path, currentUser, param, productId, activeProduct }) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const savedData = { ...activeProduct };
    const navigate = useNavigate();
    let newAP = { ...savedData };

    const validatorConfig = {
        name: {
            isRequired: {
                message: <FormattedMessage id='name_is_required' />
            },
            min: { message: <FormattedMessage id='name_must_be_at_least_2_characters' />, value: 2 }
        },
        password: {
            isRequired: {
                message: <FormattedMessage id='password_is_required' />
            },
            isCapitalSymbol: { message: <FormattedMessage id='password_must_contain_at_least_1_capital_letter' /> },
            isContainNumber: { message: <FormattedMessage id='password_must_contain_at_least_1_number' /> },
            min: { message: <FormattedMessage id='password_must_be_at_least_8_characters' />, value: 7 }
        },
        dateOfBirth: {
            maxDate: { message: <FormattedMessage id='max_date_of_birth' /> }
        },
        telegram: {
            isLink: { message: <FormattedMessage id="link_is_incorrect" /> }
        }
    };

    const handleSubmit = (data) => {
        const haveImage = data.image ? [...data.image] : [];

        console.log(haveImage)
        const files = document.querySelector(`#avatar`).files;

        if (files && files.length > 0) {
            uploadImageActiveProductStart();
            UploadFileToFireBaseStorage(files, "imgPreviewPath");
            let upFiles = false;//localStorage.getItem("uploadToFitebaseEnd");
            waitUp();
            function waitUp() {
                setTimeout(() => {
                    upFiles = JSON.parse(localStorage.getItem("uploadToFitebaseEnd"));
                    if (upFiles) {
                        const newImage = JSON.parse(localStorage.getItem("uploadToFitebaseFiles"));
                        newImage.map((ni) => {
                            haveImage.push(ni);
                        })
                        data.image = [...haveImage];
                        savedData.image = [...haveImage];
                        UpLoad(data)
                    } else {
                        waitUp();
                    }
                }, 500)
            }
        } else {
            UpLoad(data);
        }
    };
    function UpLoad(data) {
        dispatch(updateProduct(data));
        dispatch(updateActiveProduct(data));
        toast.info(intl.messages["data_saved"]);
        navigate(-1);
    };
    const recalculation = (data, setData) => {
        if (newAP.image !== data.image) {
            setData({ ...data, image: newAP.image });
        }
    };

    const HandleTrash = (e) => {
        let el = e.target.parentNode;
        if (el.tagName === "svg") el = el.parentNode;

        let images = [];
        activeProduct.image.map((f) => {
            if (f.name !== el.id) images.push(f);
        });
        newAP = { ...activeProduct, image: images }
        dispatch(deleteFileInActiveProduct(el.id));
        dispatch(updateProduct(newAP, el.id));
    }

    const firebaseStorigeUrl = configFile.imgPreviewPathFirebaseStorige;
    //
    const images = (activeProduct.image) ? activeProduct.image : [];
    //TODO сделать перетаскиванием установку главного фото
    const imageMain = images.length > 1 ? [images[0]] : [];
    const imagesNext = images.length > 2 ? images.filter((i, idx) => idx > 0) : [];
    console.log(imageMain, imagesNext);
    return (
        <Page title={activeProduct.name ? activeProduct.name : "Добавление нового товара"} noTranslate={true} widthScreen="w-full my-5 px-5 p-5 mx-auto bg-state-300 rounded border-2 shadow-md">
            {/* <div className="flex flex-col lg:flex-row gap-5 relative"> */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-5 relative">

                <div className="w-full lg:col-span-2 lg:row-span-2">
                    <FormComponent onSubmit={handleSubmit}
                        validatorConfig={validatorConfig}
                        defaultData={savedData}
                        recalculation={recalculation}
                    >
                        <input type="file"
                            id="avatar" name="avatar" multiple
                            accept="image/png, image/jpeg"></input>

                        {/* <img src={firebaseStorigeUrl + activeProduct.image[0].name + "?alt=media&token=" + activeProduct.image[0].token} alt="" /> */}

                        {/* <ImgFileld path="imgProfilePath" file={savedData.profile} addClass="h-32 w-auto mx-left mb-2 rounded-md" /> */}
                        <TextField
                            label={<FormattedMessage id='name' />}
                            name="name"
                            autoFocus
                        />
                        <TextAreaField
                            label={<FormattedMessage id='description' />}
                            name="about"
                            type="textarea"
                            rows={10}
                        />
                        <TextField
                            label={<FormattedMessage id='price' />}
                            name="price"
                            type={"number"}
                        />
                        <TextField
                            label={<FormattedMessage id='shipping' />}
                            name="shipping"
                            type={"number"}
                        />
                        <TextField
                            label={<FormattedMessage id='country' />}
                            name="country"
                        />
                        {/* <TextField
                    label={<FormattedMessage id='date_of_birth' />}
                    name="dateOfBirth"
                    type="date"
                    max={today}
                /> */}
                        {/* <TextField
                                label={<FormattedMessage id='full_years' />}
                                name="fullYears"
                                readOnly="readonly"
                                disabled={true}
                                noValid={true}
                            /> */}
                        {/* <RadioField
                    options={[
                        { name: <FormattedMessage id='male' />, value: "male", description: "" },
                        { name: <FormattedMessage id='female' />, value: "female", description: "" }
                    ]}
                    name="sex"
                    label={<FormattedMessage id='choose_your_gender' />}
                    valueDefault={savedData.sex}
                /> */}
                        {/* <TextField
                    label={<FormattedMessage id='your_telegram_profile' />}
                    labelLeft={<i className="bi bi-telegram icon-size-big"></i>}
                    type="text"
                    name="telegram"
                /> */}
                        <SubmitCancelButton name="submitCancelButton">
                            <ButtonField type="submit" name="submit" label="save_changes" />
                            <ButtonField type="cancel" name="cancel" label="cancel_changes" />
                        </SubmitCancelButton>
                        {/* <MessageWindow label="data_saved" name="message" type="message" /> */}
                    </FormComponent>
                </div>
                <div className="w-full lg:row-span-2">

                    <div className="flex flex-col gap-3 lg:max-w-[350px] mx-auto">
                        {imageMain && imageMain.map((p) => {
                            return (
                                <>
                                    <div key={`div_${p.name}`} className="relative mx-auto">
                                        <Title label={"Основное фото"} addStyleTitle="mb-0"></Title>
                                        <button onClick={HandleTrash} id={p.name} >
                                            <TrashIcon className="bg-white h-12 w-12 text-red-400 hover:text-red-800 absolute left-4 top-20 cursor-pointer hover:scale-150 transition-transform duration-300" key={`trash_${p.name}`} />
                                        </button>
                                        <img src={`${firebaseStorigeUrl}${p.name}?alt=media&token=${p.token}`} alt="" key={`activeProductImage_${p.name}`} />
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
                {imagesNext && imagesNext.map((p) => {
                    return (
                        <div className="flex flex-col gap-3 lg:max-w-[350px] mx-auto">
                            <div key={`div_${p.name}`} className="relative">
                                <button onClick={HandleTrash} id={p.name} >
                                    <TrashIcon className="bg-white h-12 w-12 text-red-400 hover:text-red-800 absolute left-4 top-10 cursor-pointer hover:scale-150 transition-transform duration-300" key={`trash_${p.name}`} />
                                </button>
                                <img src={`${firebaseStorigeUrl}${p.name}?alt=media&token=${p.token}`} alt="" key={`activeProductImage_${p.name}`} />
                            </div>
                        </div>
                    )
                })}
            </div>


        </Page>
    );
}

export default ProductEditForm;