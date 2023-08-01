const cpfInput = document.querySelector('.cpf-input');
const buttonValidate = document.querySelector('.btn-validate');
const result = document.querySelector('.result');

cpfInput.addEventListener('keypress', e => {
    if(e.keyCode === 13){
        if(!cpfInput.value) return;
        cpfValidate(cpfInput.value);
    }
});
buttonValidate.addEventListener('click', e => {
    if(!cpfInput.value) return;
    cpfValidate(cpfInput.value);
});

function cpfValidate(cpfInput){
    cpf = convertClear(cpfInput);
    cpfArray = Array.from(cpf);

    cpfArray.pop();
    cpfArray.pop();

    cpfArray.push(digitCalc(cpfArray));
    cpfArray.push(digitCalc(cpfArray));

    const validate = convertClear(cpfArray);

    if(cpf === validate) return display(true);
    display(false);
}

function display(validation){
    if(validation){
    result.textContent = 'Esse CPF é válido!';
    result.classList.remove('show-result-invalid');
    result.classList.add('show-result-valid');
    return;
    }
    result.textContent = 'Esse CPF é ínvalido!';
    result.classList.remove('show-result-valid');
    result.classList.add('show-result-invalid');
}

function convertClear(array){
    array = String(array);
    return array.replace(/\D+/g, '');
}

function digitCalc(cpfArray){
    let indice = ((cpfArray.length) + 1);

    cpfArray = cpfArray.map(num => { 
        let temp = Number(num) * indice;
        indice -= 1;
        return temp;
    });

    cpfArray = cpfArray.reduce((ac, val) => ac + Number(val), 0);

    const digito = 11 - (cpfArray % 11);

    return digito <= 9 ? String(digito) : '0';

   

}