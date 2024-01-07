"use client"
import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { getEnvsEmail } from "@/config/settings";
import { ConstantsFormContact } from '@/utils/constants'

export default function FormContact() {
    const {userId, templateId, serviceId} = getEnvsEmail()
    const form = useRef(null);
    const initialFormValues = {name: "", email: "", message: ""};
    const initialFormErrors = {name: "", email: "", message: ""};
    const initialAlertValues = {isVisible: 'hidden', alertClass: 'alert-info',
        message: ConstantsFormContact.SUCCESS_MESSAGE_SEND
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [isSubmit, setIsSubmit] = useState(false);
    const [alertValues, setAlertValues] = useState(initialAlertValues);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            emailjs.sendForm(
                serviceId as string,
                templateId as string,
                form.current as any,
                userId)
                .then((result) => {
                    console.log(result)
                    setAlertValues({
                        ...alertValues, isVisible: "visible",
                        alertClass: "alert-info",
                        message: ConstantsFormContact.SUCCESS_MESSAGE_SEND
                    });
                    setFormValues(initialFormValues);
                    setIsSubmit(false);
                    setTimeout(
                        function () {
                            setAlertValues(initialAlertValues)
                        }, 2000);
                }, (error) => {
                    console.log(error)
                    setAlertValues({
                        ...alertValues, isVisible: "visible",
                        alertClass: "alert-danger",
                        message: ConstantsFormContact.ERROR_MESSAGE_SEND
                    });
                    setIsSubmit(false);
                    setTimeout(
                        function () {
                            setAlertValues(initialAlertValues)
                        }, 2000);
                });

        }
    },);


    const validate = (values: any): boolean => {
        const errors: any = {};
        const regex = /^[a-zA-Z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/;
        if (!values.name) {
            errors.name = ConstantsFormContact.ERROR_NAME_REQUIRED
        }
        if (!values.email) {
            errors.email = ConstantsFormContact.ERROR_EMAIL_REQUIRED
        } else if (!regex.test(values.email)) {
            errors.email = ConstantsFormContact.ERROR_EMAIL
        }
        if (!values.message) {
            errors.message = ConstantsFormContact.ERROR_MESSAGE_REQUIRED
        }
        return errors;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // @ts-ignore
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    return (
        <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
            <div className={alertValues.alertClass} style={{
                visibility: alertValues.isVisible ? 'hidden' : 'visible'
            }}
            >{alertValues.message}</div>
            <br/>
            <form id="formContact" ref={form} method="post" onSubmit={handleSubmit}>

                <input name="name" type="text" className="form-control" id="name"
                       placeholder="Nombre" value={formValues.name} onChange={handleChange}/>
                <p>{formErrors.name}</p>
                <input name="email" type="email" className="form-control" id="email"
                       placeholder="Correo electrónico" value={formValues.email}
                       onChange={handleChange}/>
                <p>{formErrors.email}</p>
                <textarea name="message" rows={5} className="form-control" id="message"
                          placeholder="Mensaje" value={formValues.message} onChange={handleChange}/>
                <p>{formErrors.message}</p>

                <input name="enviar" type="submit" className="form-control" id="send"
                       value="ENVIAR"/>
            </form>
        </div>
    )
}