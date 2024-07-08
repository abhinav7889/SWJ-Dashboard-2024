import {Button, Card, Input, Label, makeStyles, CardHeader} from "@fluentui/react-components";
import {useFormik} from "formik";
import Head from "next/head";
import {useEffect, useId} from "react";
import * as yup from "yup";
import ErrorText from "../components/ErrorText";
import loginActionable from "../helpers/loginActionable";
import {useRouter} from "next/router";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
});

const useStyles = makeStyles({
    form: {
        '@media (max-width: 768px)': {
            boxShadow: "none",
            position: "relative",
        },
        display: "flex",
        flexDirection: "column",
        maxWidth: "480px",
        minWidth: "480px",
        width: "100%",
        marginInline: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    gradientBackground: {
        backgroundColor: '#f5f5f5',
        backgroundImage: 'linear-gradient(to bottom, #0078d450, #00bcf250)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
        position: "absolute",
        minHeight: "100vh"
    }
});

export default function Login() {
    const emailId = useId("email");
    const passId = useId("password")
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const user = loginActionable.apply(this, [values.email, values.password])

            if (!user) return formik.setErrors({password: "Credentials are invalid"})

            localStorage.setItem("user_data", btoa(JSON.stringify(user)))

            router.push("/dashboard")
        }
    });

    const c = useStyles();

    return (
        <div className={c.gradientBackground}>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Card as="form" className={c.form} onSubmit={formik.handleSubmit}>
                <CardHeader header={<h1>Login</h1>} description={<p>Login with SWJ credentials to continue</p>}/>
                <Label htmlFor={emailId} required>Email</Label>
                <Input id={emailId}
                       onBlur={formik.handleBlur}
                       onChange={formik.handleChange}
                       value={formik.values.email} placeholder="me@company.com" name="email"/>
                <ErrorText error={formik.errors.email} touched={formik.touched.email}/>

                <Label htmlFor={passId} required>Password</Label>
                <Input id={passId} type="password"
                       onBlur={formik.handleBlur}
                       onChange={formik.handleChange}
                       value={formik.values.password} name="password"/>
                <ErrorText error={formik.errors.password}
                           touched={formik.touched.password}/>
                <Button appearance="primary" type="submit">Submit</Button>
            </Card>
        </div>
    )
}