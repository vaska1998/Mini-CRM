import React, { useState } from 'react';
import { getConnection } from '../tools/connections';
import { useAppUser } from '../contexts/user.context';
import { useNavigate } from 'react-router-dom';
import type { StateFetchedBatch, StateNamed } from '../infrastructure/state.ts';
import type { ClientErrorResponse } from '../infrastructure/client/response.ts';

type State =
  | StateFetchedBatch<Record<string, never>, ClientErrorResponse>
  | StateNamed<'FETCH'>;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<State>({ type: 'EMPTY' });
  const { signIn } = useAppUser();
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    setState({ type: 'LOADING', startedTime: new Date() });
    const { client } = getConnection();
    const response = await client.auth.signin({
      email: email,
      password: password,
    });
    if (response.type == 'SUCCESS') {
      setState({
        type: 'SUCCESS',
        result: {},
      });
      signIn(
        {
          accessToken: response.result.token,
          refreshToken: '',
        },
        true,
      );
      navigate('/companies', { replace: true });
    } else {
      setState({
        type: 'ERROR',
        error: response,
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full px-6 py-8 max-w-lg flex flex-col items-center bg-white shadow-md rounded-lg">
        <div className="pb-4 text-2xl font-semibold text-gray-800">Login</div>
        <form onSubmit={onSubmit} className="w-full space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state.type === 'ERROR' && (
            <div className="text-red-600 text-sm">
              {state.error.errorMessage}
            </div>
          )}
          <button
            type="submit"
            disabled={state.type === 'LOADING'}
            className={`w-full py-2 rounded-md text-white font-medium transition-colors ${
              state.type === 'LOADING'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {state.type === 'LOADING' ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
