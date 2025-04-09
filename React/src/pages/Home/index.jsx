import "./style.css";
import { useState, useRef } from "react";
import Lixeira from "../../assets/lixeira.svg";
import api from "../../services/api";
import { useEffect } from "react";

function Home() {
  const [count, setCount] = useState(0);
  console.log("home foi renderizado");
  const [users, setUsers] = useState([]);
  let inputName = useRef();
  let inputAge = useRef();
  let inputEmail = useRef();

  async function getUsers() {
    const usersGeral = await api.get("/usuarios");
    setUsers(usersGeral.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
        <input placeholder="Email" name="email" type="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span> {user.name}</span>
            </p>
            <p>
              Idade: <span> {user.age}</span>
            </p>
            <p>
              Email: <span> {user.email}</span>{" "}
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Lixeira} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
