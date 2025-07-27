import AuthForm from './AuthForm';

export default function RegisterPage() {
  const handleRegister = (data) => {
    console.log('Register data:', data);
    // TODO: kirim ke backend register
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
