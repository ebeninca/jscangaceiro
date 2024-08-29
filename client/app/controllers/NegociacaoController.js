class NegociacaoController {

    constructor() {
        //é uma copia da função querySelector, por referência, mantendo o contexto (document). 
        let $ = document.querySelector.bind(document);

        // buscando os elementos
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoes = new Negociacoes();
    }

    adiciona(event) {
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao()); // modificação!
        this._negociacoes.paraArray().length = 0;
        console.log(this._negociacoes.paraArray());
        this._limpaFormulario();
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0
        this._inputData.focus();
    }

    _criaNegociacao() {
        // retorna uma instância de negociação
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }
}