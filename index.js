let express = require('express');
let cors = require('cors');

/* Criar uma Lista de Objetos com, pelo menos, 10 itens na lista.*/
// BANCO DE DADOS 
let livros = [
    {id: 1, 
        titulo: 'O jogo do amor ódio', 
        autor: 'Sally Thorne', 
        genero: ['romance', 'enemies to lovers'], 
        paginas: 400, 
        mediaEstrelas: 4, 
        editora: 'Universo dos livros'},
    {id: 2, 
        titulo: 'Corte de espinhos e rosas', 
        autor: 'Sarah J. Maas', 
        genero: ['romance', 'fantasia'], 
        paginas: 434, 
        mediaEstrelas: 4.8, 
        editora: 'Galera Record'}, 

    {id: 3, 
        titulo: 'Teto para dois', 
        autor: 'Beth O´ Leary', 
        genero: ['romance', 'ficção contemporânea'], 
        paginas: 377, 
        mediaEstrelas: 4.7, 
        editora: 'Intrínseca'},  

    {id: 4, 
            titulo: 'O acordo', 
            autor: 'Elle Kennedy', 
            genero: ['romance', 'new adult'], 
            paginas: 360, 
            mediaEstrelas: 4.8, 
            editora: 'Paralela'}, 
            
    {id: 5, 
        titulo: 'O visconde que me amava', 
        autor: 'Julia Quinn', 
        genero: ['romance', 'romance de época'], 
        paginas: 304, 
        mediaEstrelas: 4.8, 
        editora: 'Arqueiro'},  

    {id: 6, 
        titulo: 'A garota do lago', 
        autor: 'Charlie Donlea', 
        genero: ['ficção científica', 'ficção'], 
        paginas: 296, 
        mediaEstrelas: 4.7, 
        editora: 'Faro Editorial'}, 
        
    {id: 7, 
        titulo: 'É assim que acaba', 
        autor: 'Colleen Hoover', 
        genero: ['romance', 'drama'], 
        paginas: 368, 
        mediaEstrelas: 4.8, 
        editora: 'Galera Record'},
        
    {id: 8, 
        titulo: 'Novembro 9', 
        autor: 'Colleen Hoover', 
        genero: ['romance', 'drama'], 
        paginas: 352, 
        mediaEstrelas: 4.7, 
        editora: 'Galera Record'},
        
    {id: 9, 
        titulo: 'A seleção', 
        autor: 'Kiera Cass', 
        genero: ['distopia', 'romance'], 
        paginas: 363, 
        mediaEstrelas: 4.8, 
        editora: 'Seguinte'},  

    {id: 10, 
        titulo: 'E não sobrou nenhum', 
        autor: 'Agatha Christie', 
        genero: ['thriller', 'suspense'], 
        paginas: 400, 
        mediaEstrelas: 4.7, 
        editora: 'Globo livros'},  
]


// ROTAS
let rotas = express.Router();

// http://localhost:3333/
rotas.get('/', (req, res) => {
    res.send('Rota inicial do servidor')
} )

rotas.get('/titulo', (req, res) => {
    res.status(200).json(livros);
})

rotas.get('/titulo/:nomeTit', (req, res) => {
    let nomeTit = req.params.nomeTit;

    let livroTitulo = livros.filter(item => item.titulo == nomeTit);

    if (livroTitulo === undefined) {
        res.status(200).json({ msg: 'livro não encontrado'})
    } else {
        res.status(200).json(livroTitulo);
    }
})

rotas.get('/autor/:nome', (req, res) => {
    let nome = req.params.nome;

    let livro = livros.filter(item => item.autor == nome);
    if (livro === undefined) {
        res.status(200).json({ msg: 'livro não encontrado'})
    } else {
        res.status(200).json(livro);
    }
})

rotas.get('/genero/:nomeGen', (req, res) => {
    let nomeGen = req.params.nomeGen;

    let livro1 = livros.filter(item => item.genero.some( (gen) => nomeGen == gen));
    if (livro1 === undefined) {
        res.status(200).json({ msg: 'livro não encontrado'})
    } else {
        res.status(200).json(livro1);
    }
})

rotas.get('/status/:pagina/:limite', (req, res) => {
    let pagina = req.params.pagina;
    let limite = req.params.limite;

    let resultado = [];

    for(i = pagina * limite-limite; i < pagina * limite; i++) {
        resultado.push(livros[i]);
    }

    res.status(200).json(resultado);

})

//CONFIGURAÇÃO DO SERVIDOR 
let app = express();
app.use(cors());
app.use(express.json());
app.use(rotas);

let porta = 4444;

app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));

/* Cada Objeto deve ter 6 atributos (nome, autor, diretor, gênero, etc...)*/
/* Pelo menos um dos campos do Objeto deve ser uma lista de itens (por exemplo o campo gênero pode conter mais de um gênero, como Ação, Aventura)*/