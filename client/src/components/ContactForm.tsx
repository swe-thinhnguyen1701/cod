import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text, Textarea } from '@chakra-ui/react';
import { IoIosSend } from "react-icons/io";

interface FormValues {
    name: string;
    email: string;
    message: string;
}

const formspreeURL = "https://formspree.io/f/xrbqevkd";

const ContactForm = () => {
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
            await fetch(formspreeURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            actions.resetForm();
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Error sending message. Please try again.");
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting }) => (
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
                                <Textarea {...field} placeholder="Enter your message" resize="none" />
                            )}
                        </Field>
                        <FormErrorMessage>{errors.message}</FormErrorMessage>
                    </FormControl>

                    <Button type="submit" colorScheme="teal" isLoading={isSubmitting} mt={4}>
                        Send <Text paddingLeft={2} as="span"><IoIosSend /></Text>
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default ContactForm;