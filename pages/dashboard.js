import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Button, makeStyles
} from '@fluentui/react-components';
import { dashboardRowItems } from "../fixtures/mock";
import Head from "next/head";
import Image from "next/image";
import ErrorText from "../components/ErrorText";
import NavBar from "../components/Navbar";
import { useRouter } from "next/router";
import DropdownAction from "../components/DropdownAction";

const handleViewProof = (email) => {
    alert(`Viewing payment proof for ${email}`);
};

const useStyles = makeStyles({
    viewProofButton: {
        display: "flex", alignItems: "center", fontWeight: "600", gap: "0.6rem"
    },
    rootTable: {
        margin: "1rem", maxWidth: "80rem", minWidth: "540px", width: "100%", position: "relative", marginInline: "auto",
    }
})

const App = () => {
    const c = useStyles();
    const router = useRouter();
    const [user, setUser] = useState({ name: null, email: null, token: null });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const user_data = localStorage.getItem("user_data");
        try {
            const data = JSON.parse(atob(user_data));
            setUser(data);
        } catch {
            localStorage.removeItem("user_data");
            router.push("/login");
        }
        if (!user_data) router.push("/login");
    }, [router]);

        if (!isClient) {
            return null; // Render nothing on the server to avoid hydration mismatch
        }

    return (
        <div>
            <NavBar user={user} />
            <Head>
                <title>SWJ Dashboard</title>
                <meta name="description" content="Dashboard page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Table className={c.rootTable}>
                <h2 style={{ paddingLeft: "0.5rem" }}>Welcome {user.name}</h2>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Phone</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                        <TableHeaderCell>Payment Proof</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dashboardRowItems.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell><DropdownAction /></TableCell>
                            <TableCell>
                                {row.paymentProof ? (
                                    <Button
                                        className={c.viewProofButton}
                                        onClick={() => handleViewProof(row.email)}>
                                        View Proof {row.paymentMethod.includes("UPI") &&
                                        <Image height={15} width={60} src="/assets/UPI-logo.png" alt="UPI icon" />}
                                    </Button>
                                ) : <ErrorText error="Payment proof not available" touched />}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default App;
