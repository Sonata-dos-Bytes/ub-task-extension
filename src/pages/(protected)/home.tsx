import React from "react";
import { useSession } from "../../contexts/auth-context";

export default function HomePage() {
    const { signOut, user } = useSession();
    const userData = user();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Pagina Home</h1>

            <h2>Bem-vindo, {userData?.name}</h2>
            <h3>Seu login é: {userData?.authorization.login}</h3>

            <button
                onClick={() => signOut()}
            >
                Logout
            </button>
        </div>
    );
}