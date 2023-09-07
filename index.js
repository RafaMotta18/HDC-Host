/**
 * Função responsável por gerenciar todo o funcionamento
 * das funções
 */

const main = async () => {
    // Obtém o domínio digitado pelo usuário
    const domain = await getDomain();

    // Faz uma solicitação à API para verificar a disponibilidade do domínio
    const requestResult = await Promise.all([request(domain)]);

    // Obtém o resultado da solicitação
    const result = getResult(requestResult[0]);

    // Verifica o resultado e atualiza a div de resposta
    checkResult(result);
    showResult();
};

/**
 * Função responsável por retornar o domínio digitado
 * pelo usuário
 *
 * @returns {string} Domínio digitado pelo usuário
 */

const getDomain = () => {
    // Obtém o elemento DOM da div de domínio
    const elementDomain = document.querySelector("#domain");

    // Retorna o domínio
    return elementDomain.value;
};

/**
 Função responsável por retornar a resposta da requisição
 *
 * @param {string} domain Domínio a ser verificado
 * @returns {string} Resposta da requisição
 */

const request = async (domain) => {
    // Cria a URL da requisição
    const url = `https://domain-checker7.p.rapidapi.com/whois?domain=${domain}`;

    // Cria os headers da requisição
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "9bc325602bmsh6c0ad1b5709d909p1f0939jsnf88fac56147c", /* "9a298f959emsh48358dead9cc19dp1fcbc7jsn3f1519e9cae1" */
            "X-RapidAPI-Host": "domain-checker7.p.rapidapi.com"
        }
    };

    // Faz a requisição
    const result = await fetch(url, options);

    // Obtém o resultado da requisição
    const resultText = await result.text();

    // Retorna o resultado da requisição
    return resultText;
};

/**
 * Função responsável por retornar o resultado da requisição em um
 * array de objetos
 *
 * @param {string} result Resposta da requisição
 * @returns {Array<Object>} Resultado da requisição em um array de objetos
 */

const getResult = (result) => {
    // Converte a resposta da requisição em um objeto JSON
    const data = JSON.parse(result);

    // Cria um array de objetos com os dados da requisição
    let domain = data.domain;
    let valid = data.valid;
    let available = data.available;

    result = { domain, valid, available };

    // Retorna o array de objetos
    return result
};

/**
 * Função responsável por retornar os dados verificados e 
 * traduzidos para portugues
 *
*/
const checkResult = (result) => {

    validBefore = result.valid;
    availableBefore = result.available;

    resultArr = []

    // Converte os valores dos dados de booleanos para strings e insere os dados traduzidos no arry

    if (validBefore == true) {
        resultArr.push("Sim")
    } else {
        resultArr.push("Não")
    }

    if (availableBefore == true) {
        resultArr.push("Sim")
    } else {
        resultArr.push("Não")
    }


    // Atualiza a div de resposta com os dados traduzidos
    const myDiv = document.querySelector(".result_form");

    myDiv.innerHTML = `
    <p> Domínio Digitado = ${result.domain} </p>
    <p> O domínio é válido = ${resultArr[0]}</p>
    <p> O domínio está disponível ?  = ${resultArr[1]}</p>`;
}


/**
 * Função responsável exibir a div que contem a resposta 
 * para o usuario
*/

const showResult = () => {
    let display = document.querySelector(".result_form").style.display;
    if (display == "none")
        document.querySelector(".result_form").style.display = 'block';
}



