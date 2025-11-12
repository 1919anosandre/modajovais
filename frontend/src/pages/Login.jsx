// src/pages/Login.js
import { useState } from 'react';
import '/src/styles/Login.css';
import '/src/styles/global.css';
import { useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";



export default function Auth() {
  const [modo, setModo] = useState('login'); // 'login' ou 'register'
  const navigate = useNavigate();

  // estados do login
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  // estados do registro
  const [nomeReg, setNomeReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [senhaReg, setSenhaReg] = useState('');

  const [mensagem, setMensagem] = useState('');

  // login
  const handleLogin = () => {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailLogin, senha: senhaLogin }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMensagem(data.error);
        } else {
          setMensagem(`Bem-vindo, ${data.nome}!`);
          localStorage.setItem('usuarioLogado', JSON.stringify(data));
          navigate('/Home'); // redireciona para rota /Home
        }
      });
  };

  // registro
  const handleRegister = () => {
    if (!nomeReg || !emailReg || !senhaReg) {
      setMensagem('Preencha todos os campos');
      return;
    }
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nomeReg, email: emailReg, senha: senhaReg }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMensagem(data.error);
        } else {
          setMensagem('Cadastro realizado com sucesso! Faça login.');
          setModo('login');
          setNomeReg('');
          setEmailReg('');
          setSenhaReg('');
          navigate('/Home'); // redireciona para rota /Home

        }
      });
  };

  return (
    <div className="ContainerLogin">
      {modo === 'login' ? (
        <>
          <h2>Login</h2>
          <input
            placeholder="Email"
            value={emailLogin}
            onChange={e => setEmailLogin(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            value={senhaLogin}
            onChange={e => setSenhaLogin(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
          <li>ou entre com: </li>
  <div className="logarRedesSocias">
<FaInstagram style={{ fontSize: "30px" , color: "white" , cursor:"pointer" }} />
<FaFacebookF style={{ fontSize: "30px" , color: "white" , cursor:"pointer"  }} />
<FaGoogle style={{ fontSize: "30px" , color: "white" , cursor:"pointer"  }} />

  </div>
          
          <p>
            <button
              className="linkButton"
              onClick={() => {
                setMensagem('');
                setModo('register');
              }}
            >
            Não tem conta?  Cadastre-se aqui
            </button>
          </p>
        </>
      ) : (
        <>
          <h2>Cadastro</h2>
          <input
            placeholder="Nome"
            value={nomeReg}
            onChange={e => setNomeReg(e.target.value)}
          />
          <input
            placeholder="Email"
            value={emailReg}
            onChange={e => setEmailReg(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            value={senhaReg}
            onChange={e => setSenhaReg(e.target.value)}
          />
          <button onClick={handleRegister}>Cadastrar</button>
          <p>
            <button
              className="linkButton"
              onClick={() => {
                setMensagem('');
                setModo('login');
              }}
            >
              Já tem conta? Faça login
            </button>
          </p>
        </>
      )}

      {mensagem && <p className="login-message">{mensagem}</p>}
    </div>
  );
}