import iconeLivro from '../../assets/iconeLivro.png';
import s from './queroDoar.module.scss';
import { useState } from 'react';
import axios from 'axios';

export default function QueroDoar() {
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [autor, setAutor] = useState("");
    const [image_url, setImage_url] = useState("");
    const [sucesso, setSucesso] = useState(false);

    const capturaTitulo = (e) => setTitulo(e.target.value);
    const capturaCategoria = (e) => setCategoria(e.target.value);
    const capturaAutor = (e) => setAutor(e.target.value);
    const capturaImg = (e) => setImage_url(e.target.value);

    const envioDados = async (e) => {
        e.preventDefault();
        
        const dadosParaEnviar = { titulo, categoria, autor, image_url };

        try {
            await axios.post("https://desafio2-livrosvainaweb.onrender.com/doar", dadosParaEnviar);
            setSucesso(true);
            setTimeout(() => setSucesso(false), 5000);
        } catch (error) {
            console.error("❌ Erro ao enviar os dados:", error);
        }
    };

    return (
        <section className={s.queroDoarSection}>
            <p>Por favor, preencha o formulário com suas informações e as informações do livro.</p>
            
            <form onSubmit={envioDados}>
                <div>
                    <img src={iconeLivro} alt="📘 Ícone de livro" />
                    <h2>Informações do Livro</h2>
                </div>
                <input type="text" placeholder="✏️ Título" onChange={capturaTitulo} required />
                <input type="text" placeholder="📂 Categoria" onChange={capturaCategoria} required />
                <input type="text" placeholder="🖋️ Autor" onChange={capturaAutor} required />
                <input type="url" placeholder="🔗 Link da Imagem" onChange={capturaImg} required />
                <input type="submit" value="📨 Doar" className={s.buttonDoar} />
            </form>

            {sucesso && <div className={s.popupSucesso}>✅ Sua doação foi enviada com sucesso! 🎉📚</div>}
        </section>
    );
}
