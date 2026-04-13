const numeroMinimo = 100;
const numeroMaximo = 200;
const tentativasLimite = 10;

function gerarNumero() {
  return (
    Math.floor(Math.random() * (numeroMaximo - numeroMinimo + 1)) + numeroMinimo
  );
}

let numeroAleatorio = gerarNumero();

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tentativas = 0;

function perguntar() {
  rl.question(
    `Digite um número entre ${numeroMinimo} e ${numeroMaximo}: `,
    function (resposta) {
      const numeroUsuario = parseInt(resposta);

      if (
        isNaN(numeroUsuario) ||
        numeroUsuario < numeroMinimo ||
        numeroUsuario > numeroMaximo
      ) {
        console.log(
          `Entrada inválida! Digite um número entre ${numeroMinimo} e ${numeroMaximo}.`,
        );
        perguntar();
        return;
      }

      tentativas++;

      if (numeroUsuario === numeroAleatorio) {
        console.log(`\nParabéns! Você acertou em ${tentativas} tentativa(s)!`);
        reiniciar();
      } else if (tentativas >= tentativasLimite) {
        console.log(
          `\nSuas tentativas acabaram! O número era ${numeroAleatorio}.`,
        );
        reiniciar();
      } else {
        const dica = numeroUsuario < numeroAleatorio ? "MAIOR" : "MENOR";
        console.log(
          `O número secreto é ${dica} que ${numeroUsuario}. (Tentativa ${tentativas}/${tentativasLimite})`,
        );
        perguntar();
      }
    },
  );
}

function reiniciar() {
  rl.question("\nDeseja jogar novamente? (s/n): ", function (resposta) {
    if (resposta.toLowerCase() === "s") {
      tentativas = 0;
      numeroAleatorio = gerarNumero();
      console.log("\n--- Novo Jogo Iniciado ---");
      perguntar();
    } else {
      console.log("Obrigado por jogar! Até a próxima.");
      rl.close();
    }
  });
}

perguntar();
