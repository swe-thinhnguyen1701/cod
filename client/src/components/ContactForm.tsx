import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../graphql/mutations";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Flex, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea, Alert, AlertIcon } from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";

interface FormValues {
    name: string;
    email: string;
    message: string;
}

const ContactForm = () => {
    const [addMessage] = useMutation(ADD_MESSAGE);
    const [alert, setAlert] = useState<{ message: string; status: "success" | "warning" | "error" } | null>(null);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        const scriptId = "recaptcha-script";

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://www.google.com/recaptcha/api.js?render=6LeeFy0rAAAAAPr2xCyI4QoONM2Wdj5uguZ0lVff";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                existingScript.remove();
            }

            const badge = document.querySelector('.grecaptcha-badge') as HTMLElement;
            if (badge) {
                badge.remove();
            }
        };
    }, []);

    const initialValues: FormValues = {
        name: "",
        email: "",
        message: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        message: Yup.string()
            .required("Message is required")
    });

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        try {
            const recaptchaToken = await window.grecaptcha.execute("6LeeFy0rAAAAAPr2xCyI4QoONM2Wdj5uguZ0lVff", { action: "submit" });

            const { data } = await addMessage({
                variables: { ...values, recaptchaToken }
            });

            if (data.addMessage.response.success) {
                actions.resetForm();
                setAlert({ message: data.addMessage.response.message, status: "success" });
            } else {
                setAlert({ message: data.addMessage.response.message, status: "warning" });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setAlert({ message: "Something went wrong. Please try again later.", status: "error" });
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting, values }) => (
                    <Form>
                        <FormControl isInvalid={!!errors.email && touched.email}>
                            <FormLabel>Email</FormLabel>
                            <Field as={Input} name="email" type="email" placeholder="Enter your email" />
                            <FormErrorMessage>{errors.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.name && touched.name}>
                            <FormLabel>Name</FormLabel>
                            <Field as={Input} name="name" type="text" placeholder="Enter your name" />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.message && touched.message}>
                            <FormLabel>Message</FormLabel>
                            <Field name="message">
                                {({ field }: FieldProps) => (
                                    <Textarea {...field} placeholder="Enter your message" resize="none" rows={10} />
                                )}
                            </Field>
                            <Flex justifyContent="flex-end" mt={2}>
                                <Text color="grey">{values.message.length}/2,000 characters</Text>
                            </Flex>
                            <FormErrorMessage>{errors.message}</FormErrorMessage>
                        </FormControl>
                        <Button type="submit" colorScheme="teal" isLoading={isSubmitting} mt={4}>
                            Send <Text paddingLeft={2} as="span"><IoIosSend /></Text>
                        </Button>
                    </Form>
                )}
            </Formik>
            {alert && (
                <Alert status={alert.status} mt={4}>
                    <AlertIcon />
                    {alert.message}
                </Alert>
            )}
        </>
    )
}

export default ContactForm;