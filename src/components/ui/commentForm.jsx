import React  from "react";
import {Formik} from "formik";
import * as Yup from 'yup';
import FormikTextArea from "../common/form/formik/formikTextArea";

import {useIntl} from "react-intl";
import FormikButton from "../common/form/formik/formikButton";


const CommentForm = () => {
    const intl = useIntl();
    const handleSubmit = async event => {
        event.preventDefault();
        console.log('submit')
    }
    return (
        <Formik
            initialValues={{
                comment: '',
                parent_comment_id:'',
                product_id:''
            }}
            validateOnMount={true}
            validationSchema={ Yup.object({
                comment: Yup.string()
                    .min(1, 'comment_text_must_not_be_empty')
                    .required('required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                console.log('1')
                await new Promise(r => setTimeout(r, 500));
                setSubmitting(false);
            }}
            >
            {formik => (
                <form onSubmit={handleSubmit} >
                    <FormikTextArea
                        placeholder={intl.messages["your_comment"]}
                        name="comment"
                        rows="4"
                    />
                    <FormikButton
                        name="submit"
                        label={"submit_comment"}
                        type="submit"
                        disabled={!formik.isValid}
                    />
                </form>
            )}
        </Formik>
    );
}

export default CommentForm;