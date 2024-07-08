import React from 'react';
import {
    makeStyles,
    shorthands,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverSurface, Button
} from '@fluentui/react-components';
import Image from "next/image";
import { ChevronDownRegular , SignOutRegular } from "@fluentui/react-icons";
import {useRouter} from "next/router";
const useStyles = makeStyles({
    root: {
        width: '100%',
        ...shorthands.padding('10px'),
        ...shorthands.borderRight('1px', 'solid', '#eee'),
        backgroundColor: '#f5f5f5',
    },
    navbar: {
        margin: "auto",
        display: 'flex',
        flexDirection: "row",
        gap: "1rem",
        position: "relative",
        width: "100%",
        maxWidth: "80rem",
        '@media (max-width: 768px)': {
            maxWidth: "480px",
        },
        justifyContent: "space-between",
        alignItems: "center"
    },
    navItem: {
        ...shorthands.margin('10px', '0'),
        gap: "0.5rem",
        display: "flex",
        alignItems: "center",
    },
    navLink: {
        textDecoration: 'none',
        color: '#333',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

const NavBar = ({user}) => {
    const styles = useStyles();
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem("user_data")
        router.push("/login")
    }

    return (
        <nav className={styles.root}>
            <div className={styles.navbar}>
                <div className={styles.navItem}>
                    <Image src="/assets/logo-main.png" alt="header logo" width={150} height={50}/>
                </div>
                {user &&
                    <Popover trapFocus>
                        <PopoverTrigger disableButtonEnhancement>
                            <Button appearance="outline" style={{cursor: "pointer"}} className={styles.navItem}>
                                <Avatar name={user.name} color={"colorful"}/>
                                <span
                                    style={{fontSize: "1rem", fontWeight: 600}}>{user.name}</span>
                                <ChevronDownRegular/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverSurface  disableButtonEnhancement style={{display : "flex" , flexDirection : "column", gap: "1rem"}}>
                            <div>
                                Ready to leave?
                            </div>

                            <div>
                                <Button onClick={handleLogout} appearance="outline" icon={<SignOutRegular/>}> Logout</Button>
                            </div>
                        </PopoverSurface>
                    </Popover>
                }
            </div>
        </nav>
    );
};

export default NavBar;
