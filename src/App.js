import React, { useEffect, useState } from "react";
import "./App.css";
import ImageSlider from "./ImageSlider";
import { SliderData, sliderImagem } from "./SliderData";

export default function App() {
  const [bandas, setBandas] = useState([
    {
      nome: "Bullet Bane",
      imagemUrl:
        "https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2014/01/bullet-bane.jpg",
    },
    {
      nome: "Black Days",
      imagemUrl: "https://rocknbold.com/wp-content/uploads/2020/05/1.png",
    },
    {
      nome: "Pense",
      imagemUrl:
        "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/d/4/1/c/d41c9c97a935f61a455bf60db1f60528.jpg",
    },
    {
      nome: "Far From Alaska",
      imagemUrl:
        "https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2017/06/Far-From-Alaska.jpg",
    },
    {
      nome: "Dead Fish",
      imagemUrl:
        "https://rollingstone.uol.com.br/media/_versions/dead_fish_divulgacao_widelg.jpg",
    },
    {
      nome: "Glória",
      imagemUrl:
        "https://i0.wp.com/br.nacaodamusica.com/wp-content/uploads/2016/12/gloria-gloriarock-2016.jpg",
    },
    {
      nome: "Esteban",
      imagemUrl:
        "https://spinoff.com.br/entrete/wp-content/uploads/2020/12/Esteban.jpg",
    },
    {
      nome: "Zimbra",
      imagemUrl:
        "https://1.bp.blogspot.com/-2GWCnJ9z4vA/XVYRzvpfjbI/AAAAAAAAAt4/n0aeJtvuy0MEFjbBo-CtE6UOWyxyrVvnQCLcBGAs/s1600/thumbnail_ZIMBRA_1.jpg",
    },
  ]);

  const [nomeBanda, setNomeBanda] = useState("");
  const [imagem, setImagem] = useState("");
  const [editando, setEditando] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);

  useEffect(() => {
    if (indiceEditando !== null && editando) {
      setNomeBanda(bandas[indiceEditando].nome);
      setImagem(bandas[indiceEditando].imagemUrl);
    }
  }, [indiceEditando]);

  const handleNameChange = (evento) => {
    setNomeBanda(evento.target.value);
  };

  const handleImgChange = (evento) => {
    setImagem(evento.target.value);
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    if (editando) {
      const bandasAtualizadas = bandas.map((banda, indice) => {
        if (indiceEditando === indice) {
          banda.nome = nomeBanda;
          banda.imagemUrl = imagem;
        }
        return banda;
      });

      setBandas(bandasAtualizadas);
      setEditando(false);
      setIndiceEditando(null);
    } else {
      setBandas([
        ...bandas,
        {
          nome: nomeBanda,
          imagemUrl: imagem,
        },
      ]);
      setNomeBanda("");
      setImagem("");
    }
  };

  const handleDelete = (indice) => {
    setBandas(bandas.filter((banda, setId) => setId !== indice));
  };

  const [showForm, setShowForm] = useState(false);
  const toggle = () => {
    setShowForm(!showForm);
  };
  function BotaoForm() {
    return (
      <button id="toggle" type="button" onClick={toggle}>
        {showForm ? "Finalizar" : "Sugerir mais bandas"}
      </button>
    );
  }

  return (
    <div>
      <header>
        <img src="../header.png" alt="skater et"></img>
      </header>
      <section>
      <ImageSlider slides={SliderData} />
      </section>
      <h>
        {" "}
        O Pedrada Festival será o primeiro festival de Punk Rock que ocorrerá
        após o (longo) período de quarentena imposto pela (incompetencia do
        bolsonaro) pandemia da Covid-19. Cadastre o seu line-up ideal!
      </h>
      
      
      <section className="buttonToggle">
        <div id="buttonToggle">
          <BotaoForm />
        </div>
      </section>
      {showForm && (
        <form>
          <label> Sugira novas bandas para compor o nosso lineup </label>
          <input
            type="text"
            value={nomeBanda}
            placeholder="Nome da Banda"
            onChange={handleNameChange}
          />
          <input
            type="text"
            value={imagem}
            placeholder="URL da imagem"
            onChange={handleImgChange}
          />
          <button type="submit">Cadastre</button>
        </form>
      )}
      <ul>
        {bandas.map((f, indice) => (
          <li key={indice}>
            <h3>{f.nome}</h3>
            <img src={f.imagemUrl} alt={f.nome} />
            <br></br>
            <button
              id="delete"
              type="button"
              onClick={() => handleDelete(indice)}
            >
              Excluir
            </button>
            <button
              id="edit"
              type="button"
              onClick={() => {
                setEditando(true);
                setIndiceEditando(indice);
              }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
      <br></br>
      <h2 id="local">
        O show vai acontecer no CineJóia, um espaço bem adaptado para a melhor
        visibilidade, veja abaixo o melhor trajeto para você!
      </h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.4200736804833!2d-46.63811198502234!3d-23.553351884686816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a95f4ee287%3A0xebbd752137f61b6b!2sCine%20Joia!5e0!3m2!1spt-BR!2sbr!4v1630261233511!5m2!1spt-BR!2sbr"
        width="600"
        height="450"
        title="cinejoia"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
      <article></article>
      <br></br>
      <footer> @cbernardox © 2021</footer>
    </div>
  );
}
