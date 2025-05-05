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
        <div className='flex flex-col items-center justify-center h-[600px] w-[400px] bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4 text-black'>Login</h1>

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}