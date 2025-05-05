import { useSession } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { signIn } = useSession();
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            await signIn({ login: '22.1.71557', password: 'PEDROEROSA' });
            console.log('Login successful');

            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Pagina Login</h1>

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}