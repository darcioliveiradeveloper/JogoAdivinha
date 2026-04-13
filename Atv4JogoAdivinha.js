const numeroMaximo = 100;
const tentativasLimite = 10;
const numeroAleatorio = Math.floor(Math.random() * numeroMaximo) + 1;

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tentativas = 0;

function perguntar() {
  rl.question("Digite um número entre 1 e 100: ", function (resposta) {
    const numeroUsuario = parseInt(resposta);

    if (
      isNaN(numeroUsuario) ||
      numeroUsuario < 1 ||
      numeroUsuario > numeroMaximo
    ) {
      console.log("Por favor, digite um número válido entre 1 e 100.");
      perguntar();
      return;
    }

    tentativas++;

    if (numeroUsuario === numeroAleatorio) {
      console.log(
        `Parabéns! Você acertou o número em ${tentativas} tentativa(s)!`,
      );
      reiniciar();
    } else if (tentativas >= tentativasLimite) {
      console.log(
        `Suas tentativas acabaram! O número correto era ${numeroAleatorio}.`,
      );
      reiniciar();
    } else if (numeroUsuario < numeroAleatorio) {
      console.log("O número é maior. Tente novamente.");
      perguntar();
    } else {
      console.log("O número é menor. Tente novamente.");
      perguntar();
    }
  });
}

function reiniciar() {
  rl.question("Deseja jogar novamente? (s/n): ", function (resposta) {
    if (resposta.toLowerCase() === "s") {
      tentativas = 0;
      global.numeroAleatorio = Math.floor(Math.random() * numeroMaximo) + 1;
      perguntar();
    } else {
      console.log("Obrigado por jogar!");
      rl.close();
    }
  });
}

perguntar();
