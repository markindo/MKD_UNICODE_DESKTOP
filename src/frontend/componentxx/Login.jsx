import { ModalLogin } from "./ModalLogin";
import React, { useState, useEffect } from "react";

export const Login = ({ openLogin, setOpenLogin }) => {

    // const { ip_address, port, name, id } = printer;
    // const [username, setUserName] = useState("");

    useEffect(() => {
        getLogin();
    }, [])
    async function getLogin() {
        const getLogin = await window.be.getLogin(password);
        console.log(getLogin)
        setOpenLogin(getLogin);

    }

    const [password, setPassword] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        const login = await window.be.login(password);
        console.log(login)
        setOpenLogin(login);
    }

    //const [openPrinter, setOpenPrinter] = useState(false);
    return (
        <>
            <ModalLogin isOpen={openLogin} onClose={() => setOpenLogin(false)}>
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label className="block text-sm font-medium">Masukkan Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"

                            className="w-full px-3 py-2 border rounded-lg"

                            required
                        />
                    </div>



                    <button

                        type="submit"
                        className="mt-3 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                    >
                        Login
                    </button>
                </form>
            </ModalLogin></>
    )

}