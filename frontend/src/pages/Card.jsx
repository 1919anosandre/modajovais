import { useState, useEffect } from 'react';
import CardProduto from "/src/components/CardProduto";
import "/src/styles/Card.css";
import '/src/styles/global.css';

import camisapolopreta from "/src/assets/camisapolomasculinapreta.webp";
import camisapolocinza from "/src/assets/camisapolomasculinacinza.jpg";
import camisapoloazul from "/src/assets/camisapolomasculinaazul.webp";
import imgcamisaoversizedverde from "/src/assets/camisaoversized-vede.jpg";
import Imgcamisetaoversized from "/src/assets/camiseta-oversized-masculina-removebg-preview.png";
import imgcamisaeuropeia from "/src/assets/camisamasculinahiphop.jpg";
import imgcamisetaoverzdebranca from "/src/assets/camisetaoversidebranca.jpg";
import imgcamisapretabasica from "/src/assets/camisas-estilosas-preta.jpg";
import imgcamisabrancabasica from "/src/assets/camisa-branca-basica-removebg-preview.png";
import imgcamisabrancabasicafeminina from "/src/assets/camiseta-feminina-levis-feminina.webp"
import imgcamisarosabasica from "/src/assets/camisa-rosa-basica.webp";
import imgcamisetaellus from "/src/assets/camiseta-ellus-feminina.webp";
import imgcamisetalevis from "/src/assets/camiseta-feminina-levis-feminina.webp";
import imgcamisetabasicapretafeminina from "/src/assets/camiseta-basica-preta-feminina.webp";
import imgcamisasocialcrepeestampabolinhas from "/src/assets/camisa-social-crepe-estampa-bolinhas.jpg";
import imgblusacreperosabolinha from "/src/assets/Marjori_Blusa_Evangelica_Manga_Curta_Estampada_MariaLiModas (1)-800x1000.png";
import imgmoletomburncroppedfemininopreto from "/src/assets/moletom-burn-cropped-feminino-preto.webp";
import imgmoletomfemininocapuzfacinellirosa from "/src/assets/moletom-feminino-capuz-facinelli-rosa.webp";
import imgmoletomfemininoflaneladopreto from "/src/assets/moletom-feminino-flanelado-preto.webp";
import imgmoletomcolccifitnessfeminino from "/src/assets/moletom-colcci-fitness-feminino.webp";
import imgblusachiffonfeminina from "/src/assets/blusa-chiffon-decote-branca-feminina.jpg";
import imgblusawearfeminina from "/src/assets/blusa-wear-feminina.jpg";
import imgblusasocialfemininamangalongacaramelo from "/src/assets/blusa-social-feminina-manga-longa-caramelo.jpg";
import imgblusaheringfemininamangafeminina from "/src/assets/blusa-hering-feminina-manga-feminina.webp";
import imgcalcajeansfeminina from "/src/assets/calça-jeans-feminina.webp";
import imgcalçaslimmasculina from "/src/assets/calca_masculina_alfaiataria_sarja_slim_marrom.webp";
import imgkit3calcasfemininaelastano from "/src/assets/calcas-feminina-kit3.webp";
import imgblusamasculinamalha from "/src/assets/blusa-masculina-malha.jpg";
import imgblusamasculinamalhapreta from "/src/assets/blusa-masculina-malha-preta.jpg";
import imgternopretomasculino from "/src/assets/terno-preto-masculino.jpg";
import imgblazerfeminino from "/src/assets/blazer-feminino.jpg";
import imgternofemininoelegante from "/src/assets/terno-feminino-elegante.jpg";
import imgcamisaurbanamasculina from "/src/assets/camisa-preta-moda-urbana.jpg";
import imgcroppedcaneladogolaalta from "/src/assets/cropped Canelado Feminino.jpg";
import imgcroppedcaneladoalcinha from "/src/assets/cropped-canelado-alcinha.jpg"
import imgconjuntoalfaitariafemininoazul from "/src/assets/conjuntoalfaitariaazulfeminina.webp";
import imgconjuntoalfaitariafemininoabege from "/src/assets/conjuntofemininoEstilo2025bege.jpg";
import imgconjuntoalfaitariafemininoverde from "/src/assets/conjuntofemininoEstilo2025verde.jpg";
import imgcalcabaggyfeminina from "/src/assets/calca-jeans-baggy.webp";
import imgconjuntocybermasculino from "/src/assets/conjunto-cyber-verao-masculino.jpg";
import imgconjuntofitnessfemininoazul from "/src/assets/conjuntofitnessfemininomarinhoazul.webp";
import imgconjuntofitnessfemininorosa from "/src/assets/conjuntofitnessfemininorosa.webp";
import videocamisabolinhasfeminina from "/src/video/Hailuo_Video_441902774979112962.mp4";
import videocroppedfeminino from "/src/video/Hailuo_Video_441907919204884486.mp4";
import videoblusafeminina from "/src/video/Hailuo_Video_442616606244802568.mp4";
import videocamisabasicafeminina from "/src/video/Hailuo_Video_442628256406462466.mp4";
import videomoletomfemininocinza from "/src/video/Hailuo_Video_442984605221040131.mp4";


export default function Card({ filtro }) {
  const [carrinho, setCarrinho] = useState([]);
  const [busca, setBusca] = useState("");


  useEffect(() => {
    const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(carrinhoLocal);
  }, []);

  const limparCarrinho = () => {
    localStorage.removeItem("carrinho");
    setCarrinho([]);
  };

  const coresPorProduto = {
    "Camiseta Oversized": ["rgb(25, 25, 58)", "rgb(3, 48, 3)"],
    "Camiseta europeia hip hop": ["#ffffff", "#2a2a2a"],
    "Camiseta Preta Básica": ["#000000", "#ffffff", "#ffc0cb"],
    "Camisa Polo": ["#000000", "rgb(25, 25, 58)", "#808080"],
    "Camiseta basica feminina": ["#ffffff" , "#000000", "rgb(255, 0, 0)"],
    "Camisa social crepe bolinhas": ["#1d4a2a", "#ff86f7"],
    "Moletom burn cropped preto feminino": ["#000000"],
    "Moletom rosa capuz facinelli feminino": ["#ffb6c1" , "#000000"],
    "Moletom preto flanelado feminino": ["#000000"],
    "Moletom Colcci cinza fitness feminino": ["#808080"],
    "Blusa chiffon branca feminina": ["#ffffff"],
    "Blusa wear feminina": ["#f8f8ff"],
    "Blusa social caramelo": ["#a0522d"],
    "Blusa hering manga longa": ["#dcdcdc"],
    "Calça Jeans feminino": ["#1e3d59", "#2f4f4f"],
    "Calça slim marrom masculina": ["#8b4513", "#a0522d"],
    "blusascores": ["#4A90E2" , "#000000"],
    "Conjunto alfaitaria": [" rgba(210, 196, 172, 1)","rgb(25, 25, 58)",  "rgb(3, 48, 3)"]
  };

    /*
  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

*/
  return (

    <div>

<div className="containerDestaques">
       <div
        className="promocao-moda"
          style={{ display: filtro === "" || filtro === "promocao-moda" ? "block" : "none" }}
>
<h2>destaques</h2>

 <div className="produtos">

          <CardProduto
            nome="Terno Preto Masculino"
                        precosemdesconto = "450,00 "
            preco="399.90"
            imagem={[imgternopretomasculino]}
            cores={coresPorProduto["Ternos"]}
                selo="Oferta Limitada"
          />

          <CardProduto
            nome="Blazer Feminino"
                                    precosemdesconto = "350,00 "
            preco="299.90"
            imagem={[imgblazerfeminino]}
            cores={coresPorProduto["Camiseta Oversized"]}
                selo="Mais Vendido"
          />

                    <CardProduto
            nome="Terno Elegante Feminino"
                                    precosemdesconto = "450,00 "
            preco="399.90"
            imagem={[imgternofemininoelegante]}
            cores={coresPorProduto["Camiseta Oversized"]}
                selo="Mais Vendido"

          />

                    <CardProduto
            nome="Camiseta Urbana Masculina"
                 precosemdesconto = "150,00 "
            preco="99.90"
            imagem={[imgcamisaurbanamasculina]}
            cores={coresPorProduto["Camiseta Oversized"]}
                selo="Quase Esgotado"

          />

             <CardProduto
            nome="Cropped Canelado Feminino"
                                    precosemdesconto = "110,00 "
            preco="80.90"
            imagem={[imgcroppedcaneladoalcinha , imgcroppedcaneladogolaalta]}
                          video={videocroppedfeminino} // vídeo separado

            cores={coresPorProduto["Camiseta Oversized"]}
                selo="Mais Vendidos"

          />

             <CardProduto
            nome="Conjunto Alfaitaria Feminino"
                                    precosemdesconto = "120,00 "
            preco="199.90"
            imagem={[imgconjuntoalfaitariafemininoabege, imgconjuntoalfaitariafemininoazul, imgconjuntoalfaitariafemininoverde]}
            cores={coresPorProduto["Conjunto alfaitaria"]}
                selo="Mais vendidos"

          />

             <CardProduto
            nome="Calca Jeans Baggy feminina "
                                    precosemdesconto = "150,00 "
            preco="110.90"
            imagem={[imgcalcabaggyfeminina]}
            cores={coresPorProduto["Camiseta Oversized"]}
                selo="Quase Esgotado"

          />

             <CardProduto
            nome="Conjunto verao 2025"
             precosemdesconto = "220,00 "
            preco="199.90"
            imagem={[imgconjuntocybermasculino]}
            cores={coresPorProduto["Camiseta Oversized"]}
                selo="Oferta Limitada"

          />

          
             <CardProduto
            nome="Conjunto fitness feminino"
            precosemdesconto = "250,00 "
            preco="199.90"
            imagem={[imgconjuntofitnessfemininoazul, imgconjuntofitnessfemininorosa]}
            cores={coresPorProduto["Camiseta Oversized"]}
                selo="Oferta Limitada"

          />
</div>
          </div>
</div>

      <h3>Confira nossos produtos</h3>

      {/* Masculino camisetas */}
      <div
        className="moda-masculina-camisetas"
        style={{ display: filtro === "" || filtro === "moda-masculina-camisetas" ? "block" : "none" }}
      >
        <div className="produtos">

          <CardProduto
            nome="p.Camiseta Oversized"
            preco="p.59.90"
            imagem={[Imgcamisetaoversized, imgcamisaoversizedverde]}
            cores={coresPorProduto["Camiseta Oversized"]}
          />
          <CardProduto
            nome="Camiseta europeia hip hop"
            preco="59.90"
            imagem={[imgcamisetaoverzdebranca, imgcamisaeuropeia]}
            cores={coresPorProduto["Camiseta europeia hip hop"]}
          />
          <CardProduto
            nome="Camiseta Preta Básica"
            preco="59.90"
            imagem={[imgcamisapretabasica, imgcamisabrancabasica, imgcamisarosabasica]}
            cores={coresPorProduto["Camiseta Preta Básica"]}
          />
          <CardProduto
            nome="Camisa Social Polo"
            preco="59.90"
            imagem={[camisapolopreta, camisapoloazul, camisapolocinza]}
            cores={coresPorProduto["Camisa Polo"]}
          />

        </div>
      </div>

      {/* Feminino camisetas */}
      <div
        className="moda-feminina-camisetas"
        style={{ display: filtro === "" || filtro === "moda-feminina-camisetas" ? "block" : "none" }}
      >
        <div className="produtos">

          <CardProduto
            nome="Camiseta basica feminina"
            preco="59.90"
            imagem={[imgcamisabrancabasicafeminina, imgcamisetabasicapretafeminina, imgcamisetaellus, ]}
                          video={videocamisabasicafeminina} // vídeo separado
            cores={coresPorProduto["Camiseta basica feminina"]}
          />

          <CardProduto
            nome="Cropped Canelado Feminino"
                                    precosemdesconto = "110,00 "
            preco="80.90"
            imagem={[imgcroppedcaneladoalcinha , imgcroppedcaneladogolaalta]}
                          video={videocroppedfeminino} // vídeo separado

            cores={coresPorProduto["Camiseta Oversized"]}
                selo="Mais Vendidos"

          />

          <CardProduto
            nome="Camisa social crepe bolinhas"
            preco="59.90"
            imagem={[imgcamisasocialcrepeestampabolinhas,imgblusacreperosabolinha]}
              video={videocamisabolinhasfeminina} // vídeo separado
            cores={coresPorProduto["Camisa social crepe bolinhas"]}
          />

        </div>
      </div>

      {/* Feminino moletons */}
      <div
        className="moda-feminina-moletons"
        style={{ display: filtro === "" || filtro === "moda-feminina-moletons" ? "block" : "none" }}
      >
        <div className="produtos">

          <CardProduto nome="Moletom burn cropped preto feminino" preco="59.90" imagem={[imgmoletomburncroppedfemininopreto , imgmoletomfemininocapuzfacinellirosa]} cores={coresPorProduto["Moletom burn cropped preto feminino"]} />
          <CardProduto nome="Moletom rosa capuz facinelli feminino" preco="59.90" imagem={[imgmoletomfemininocapuzfacinellirosa , imgmoletomfemininoflaneladopreto]} cores={coresPorProduto["Moletom rosa capuz facinelli feminino"]}
                        video={videoblusafeminina} // vídeo separado

          />
          <CardProduto nome="Moletom Colcci cinza fitness feminino" preco="59.90" imagem={[imgmoletomcolccifitnessfeminino]} cores={coresPorProduto["Moletom Colcci cinza fitness feminino"]}
                                  video={videomoletomfemininocinza} // vídeo separado

          />

          </div>
      </div>

      {/* Feminino blusas */}
      <div
        className="moda-feminina-blusas"
        style={{ display: filtro === "" || filtro === "moda-feminina-blusas" ? "block" : "none" }}
      >
        <div className="produtos">

          <CardProduto nome="Blusa chiffon branca feminina" preco="59.90" imagem={[imgblusachiffonfeminina]} cores={coresPorProduto["Blusa chiffon branca feminina"]} />
          <CardProduto nome="Blusa wear feminina" preco="59.90" imagem={[imgblusawearfeminina]} cores={coresPorProduto["Blusa wear feminina"]} />
          <CardProduto nome="Blusa social caramelo" preco="59.90" imagem={[imgblusasocialfemininamangalongacaramelo]} cores={coresPorProduto["Blusa social caramelo"]} />
          <CardProduto nome="Blusa hering manga longa" preco="59.90" imagem={[imgblusaheringfemininamangafeminina]} cores={coresPorProduto["Blusa hering manga longa"]} />

          </div>
      </div>

      {/* Feminino calças */}
      <div
        className="moda-feminina-calcas"
        style={{ display: filtro === "" || filtro === "moda-feminina-calcas" ? "block" : "none" }}
      >
        <div className="produtos">
          <CardProduto nome="Calça Jeans feminino" preco="59.90" imagem={[imgcalcajeansfeminina]} cores={coresPorProduto["Calça Jeans feminino"]} />
                  <CardProduto nome="kit 3 calcas feminina elastano" preco="59.90" imagem={imgkit3calcasfemininaelastano} cores={coresPorProduto["Calça Jeans feminino"]} />

        </div>
      </div>

      {/* Masculino calças */}
      <div
        className="moda-masculina-calcas"
        style={{ display: filtro === "" || filtro === "moda-masculina-calcas" ? "block" : "none" }}
      >
        <div className="produtos">
          <CardProduto nome="Calça slim marrom masculina" preco="59.90" imagem={[imgcalçaslimmasculina]} cores={coresPorProduto["Calça slim marrom masculina"]} />
        </div>
      </div>

         <div
        className="moda-masculina-moletons"
        style={{ display: filtro === "" || filtro === "moda-masculina-blusas" ? "block" : "none" }}
      >
        <div className="produtos">
          <CardProduto nome="Blusa  masculina malha" preco="59.90" imagem={[imgblusamasculinamalha , imgblusamasculinamalhapreta]} cores={coresPorProduto["blusascores"]} />
        </div>
      </div>

         <div
        className="moda-masculina-moletons"
        style={{ display: filtro === "" || filtro === "moda-masculina-moletons" ? "block" : "none" }}
      >
        <div className="produtos">
          <CardProduto nome="Calça slim marrom masculina" preco="59.90" imagem={[imgcalçaslimmasculina]} cores={coresPorProduto["Calça slim marrom masculina"]} />
        </div>
      </div>

         <div
        className="moda-masculina-shorts"
        style={{ display: filtro === "" || filtro === "moda-masculina-shorts" ? "block" : "none" }}
      >
        <div className="produtos">
          <CardProduto nome="Calça slim marrom masculina" preco="59.90" imagem={[imgcalçaslimmasculina]} cores={coresPorProduto["Calça slim marrom masculina"]} />
        </div>
      </div>

         <div
        className="moda-feminina-shorts"
        style={{ display: filtro === "" || filtro === "moda-feminina-calcas" ? "block" : "none" }}
      >
        <div className="produtos">
          <CardProduto nome="Calça slim marrom masculina" preco="59.90" imagem={[imgcalçaslimmasculina]} cores={coresPorProduto["Calça slim marrom masculina"]} />
       
       
        </div>

      </div>

    </div>
    
  );
}
