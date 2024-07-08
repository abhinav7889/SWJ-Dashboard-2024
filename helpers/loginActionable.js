import {loginUsers} from "../fixtures/mock";
import {useEffect} from "react";

/**
 *
 * @param email
 * @param password
 * @return {Object<{name: string, email: string, token: string}>}
 */
export default function (email, password) {
    const target = loginUsers.find(x => x.email === email && x.password === password)
    if (!target) return null;

    return {...target, token: "TEST"}
}