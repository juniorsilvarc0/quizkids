/**
 * Reconectando — Sem Medo — Perguntas
 * 30 perguntas — Série Sem Medo (crianças de 9 a 11 anos)
 */

const questions = [
    // BLOCO 1: A Páscoa e o Cordeiro
    { id: 1, question: "A palavra \"Páscoa\" tem um significado bem legal. O que ela quer dizer?", options: [{ letter: "A", text: "Festa com chocolate" }, { letter: "B", text: "Passagem" }, { letter: "C", text: "Domingo especial" }], correct: "B" },
    { id: 2, question: "Lá no Antigo Testamento, o povo de Deus vivia como escravo em um país. Qual era?", options: [{ letter: "A", text: "Egito" }, { letter: "B", text: "Brasil" }, { letter: "C", text: "Israel" }], correct: "A" },
    { id: 3, question: "Para proteger as famílias na primeira Páscoa, Deus pediu que cada uma preparasse um...", options: [{ letter: "A", text: "Bolo grande" }, { letter: "B", text: "Cordeirinho" }, { letter: "C", text: "Peixe" }], correct: "B" },
    { id: 4, question: "Jesus é chamado de \"Cordeiro de Deus\". Por quê?", options: [{ letter: "A", text: "Porque Ele tinha um cordeirinho de estimação" }, { letter: "B", text: "Porque Ele gostava de ovelhas" }, { letter: "C", text: "Porque Ele se entregou em sacrifício por amor a nós" }], correct: "C" },
    { id: 5, question: "Jesus sentiu medo antes de morrer na cruz? O que isso nos ensina?", options: [{ letter: "A", text: "Não, Jesus nunca sentiu nada" }, { letter: "B", text: "Sim, porque Ele também era homem, mas escolheu confiar no Pai" }, { letter: "C", text: "Sim, e por isso Ele desistiu" }], correct: "B" },
    { id: 6, question: "Quando Jesus estava muito angustiado no jardim, o que Ele fez?", options: [{ letter: "A", text: "Saiu correndo" }, { letter: "B", text: "Orou com ainda mais força a Deus" }, { letter: "C", text: "Dormiu a noite toda" }], correct: "B" },
    { id: 7, question: "Depois que Jesus morreu na cruz... o que aconteceu de incrível?", options: [{ letter: "A", text: "Ele ficou no túmulo para sempre" }, { letter: "B", text: "Ele ressuscitou e venceu a morte" }, { letter: "C", text: "Ninguém soube o que aconteceu" }], correct: "B" },
    { id: 8, question: "Ser forte e corajoso, segundo a Bíblia, é:", options: [{ letter: "A", text: "Nunca ter medo de nada" }, { letter: "B", text: "Fingir que está tudo bem" }, { letter: "C", text: "Confiar em Deus mesmo quando não entendemos tudo" }], correct: "C" },

    // BLOCO 2: Josué e a Terra Prometida
    { id: 9, question: "Depois que Moisés morreu, quem Deus escolheu para liderar o povo?", options: [{ letter: "A", text: "Davi" }, { letter: "B", text: "Josué" }, { letter: "C", text: "Pedro" }], correct: "B" },
    { id: 10, question: "Para onde Josué precisava levar o povo de Deus?", options: [{ letter: "A", text: "De volta para o Egito" }, { letter: "B", text: "Para a Terra Prometida" }, { letter: "C", text: "Para Jerusalém" }], correct: "B" },
    { id: 11, question: "Deus falou 3 coisas super importantes para Josué. Quais foram?", options: [{ letter: "A", text: "Ordem, promessa e encorajamento" }, { letter: "B", text: "Oração, jejum e louvor" }, { letter: "C", text: "Cante, dance e pule" }], correct: "A" },
    { id: 12, question: "Deus disse a Josué: \"Seja forte e corajoso, pois...\"", options: [{ letter: "A", text: "\"...você é o mais forte!\"" }, { letter: "B", text: "\"...eu estarei com você por onde andar\"" }, { letter: "C", text: "\"...ninguém vai te atrapalhar\"" }], correct: "B" },
    { id: 13, question: "Ser corajoso NÃO é nunca sentir medo. Ser corajoso é:", options: [{ letter: "A", text: "Sentir medo, mas confiar em Deus e continuar" }, { letter: "B", text: "Esconder o medo dos outros" }, { letter: "C", text: "Brigar com quem te assusta" }], correct: "A" },
    { id: 14, question: "O caminho do povo de Deus até a Terra Prometida foi:", options: [{ letter: "A", text: "Rápido e super fácil" }, { letter: "B", text: "Longo e com muitos desafios" }, { letter: "C", text: "Feito em apenas um dia" }], correct: "B" },
    { id: 15, question: "Quando a gente passa por dificuldades, elas podem:", options: [{ letter: "A", text: "Nos destruir para sempre" }, { letter: "B", text: "Nos deixar mais fortes e perseverantes" }, { letter: "C", text: "Não mudar nada na nossa vida" }], correct: "B" },
    { id: 16, question: "Jesus disse que no mundo teríamos aflições, mas que devemos ter bom ânimo porque...", options: [{ letter: "A", text: "...Ele venceu o mundo!" }, { letter: "B", text: "...tudo se resolve sozinho" }, { letter: "C", text: "...ninguém vai nos ajudar" }], correct: "A" },
    { id: 17, question: "Josué fez uma declaração famosa: \"Eu e a minha casa...\"", options: [{ letter: "A", text: "\"...vamos ficar em paz\"" }, { letter: "B", text: "\"...serviremos ao Senhor\"" }, { letter: "C", text: "\"...vamos viajar pelo mundo\"" }], correct: "B" },

    // BLOCO 3: Daniel e as Escolhas
    { id: 18, question: "Um menino muito corajoso chamado Daniel escolheu não comer a comida errada do rei. Por quê?", options: [{ letter: "A", text: "Porque ele não gostava da comida" }, { letter: "B", text: "Porque ele queria agradar a Deus" }, { letter: "C", text: "Porque ele estava sem fome" }], correct: "B" },
    { id: 19, question: "Mesmo com muita pressão e longe de casa, Daniel escolheu:", options: [{ letter: "A", text: "Obedecer a Deus" }, { letter: "B", text: "Fazer o que todo mundo fazia" }, { letter: "C", text: "Se esconder" }], correct: "A" },
    { id: 20, question: "Quando escolhemos o caminho errado, o que costuma acontecer no nosso coração?", options: [{ letter: "A", text: "Ficamos super felizes" }, { letter: "B", text: "Perdemos a paz e nos afastamos de Deus" }, { letter: "C", text: "Nada muda" }], correct: "B" },
    { id: 21, question: "E quando escolhemos o caminho certo?", options: [{ letter: "A", text: "Ficamos com paz, leveza e Deus se alegra" }, { letter: "B", text: "Ficamos tristes sem motivo" }, { letter: "C", text: "Perdemos nossos amigos" }], correct: "A" },
    { id: 22, question: "Dizer \"NÃO\" para o que é errado é um ato de:", options: [{ letter: "A", text: "Medo" }, { letter: "B", text: "Coragem" }, { letter: "C", text: "Fraqueza" }], correct: "B" },
    { id: 23, question: "Deus nos obriga a seguir Ele?", options: [{ letter: "A", text: "Sim, ninguém tem escolha" }, { letter: "B", text: "Não, Ele dá liberdade para cada pessoa escolher" }, { letter: "C", text: "Só obriga os adultos" }], correct: "B" },
    { id: 24, question: "Nossas escolhas podem influenciar:", options: [{ letter: "A", text: "Só a nós mesmos" }, { letter: "B", text: "Ninguém" }, { letter: "C", text: "As pessoas que estão perto de nós (família e amigos)" }], correct: "C" },

    // BLOCO 4: Encerramento Sem Medo
    { id: 25, question: "Qual é o versículo-chave da série \"Sem Medo\"?", options: [{ letter: "A", text: "\"Bem-aventurados os mansos\"" }, { letter: "B", text: "\"O Senhor está comigo, não temerei\"" }, { letter: "C", text: "\"Deus é amor\"" }], correct: "B" },
    { id: 26, question: "Na experiência da \"Tempestade no Copo\", a pimenta que boia na água representa:", options: [{ letter: "A", text: "Os nossos amigos" }, { letter: "B", text: "Os problemas e dificuldades da vida" }, { letter: "C", text: "As coisas boas" }], correct: "B" },
    { id: 27, question: "Ainda na experiência, o detergente que faz a pimenta se afastar representa:", options: [{ letter: "A", text: "A nossa força sozinha" }, { letter: "B", text: "A ajuda de Deus na nossa vida" }, { letter: "C", text: "O dinheiro" }], correct: "B" },
    { id: 28, question: "Quem persevera (não desiste) até o fim, segundo a Bíblia, será:", options: [{ letter: "A", text: "Famoso" }, { letter: "B", text: "Rico" }, { letter: "C", text: "Salvo" }], correct: "C" },
    { id: 29, question: "Qual dessas declarações NÃO faz parte do culto \"Sem Medo\"?", options: [{ letter: "A", text: "\"Eu confio em Deus!\"" }, { letter: "B", text: "\"Eu desisto fácil quando tudo dá errado!\"" }, { letter: "C", text: "\"Eu escolho o certo!\"" }], correct: "B" },
    { id: 30, question: "Qual é o grito final do culto \"Sem Medo\"?", options: [{ letter: "A", text: "\"EU SOU O MELHOR!\"" }, { letter: "B", text: "\"EU VOU ATÉ O FIM COM DEUS!\"" }, { letter: "C", text: "\"EU NUNCA SINTO MEDO!\"" }], correct: "B" }
];
