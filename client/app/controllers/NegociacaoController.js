class NegociacaoController {

    constructor() {
        //é uma copia da função querySelector, por referência, mantendo o contexto (document). 
        const $ = document.querySelector.bind(document);

        // buscando os elementos
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        );

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        );

        this._service = new NegociacaoService();
    }

    adiciona(event) {

        try {

            event.preventDefault();
            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            //this._negociacoesView.update(this._negociacoes);
            this._limpaFormulario();

        } catch (err) {

            console.log(err);
            console.log(err.stack);

            if (err instanceof DataInvalidaException) {
                this._mensagem.texto = err.message;
            } else {
                // mensagem genérica para qualquer problema que possa acontecer 
                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte';
            }
        }
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

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        //this._negociacoesView.update(this._negociacoes);
    }

    importaNegociacoes() {

        Promise.all([
            this._service.obtemNegociacoesDaSemana(),
            this._service.obtemNegociacoesDaSemanaAnterior(),
            this._service.obtemNegociacoesDaSemanaRetrasada()

        ]).then(periodo => {
            periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
        }).catch(err => {
            this._mensagem.texto = err;
        });
    }

    obtemNegociacoesDoPeriodo() {
        // ACESSA AOS PRÓPRIOS MÉTODOS ATRAVÉS DE THIS
        return Promise.all([
            this.obtemNegociacoesDaSemana(),
            this.obtemNegociacoesDaSemanaAnterior(),
            this.obtemNegociacoesDaSemanaRetrasada()
        ]).then(periodo => {
            // NÃO FAZ MAIS O FOREACH 
            return periodo
                .reduce((novoArray, item) => novoArray.concat(item), []);
        }).catch(err => {
            console.log(err);
            throw new Error('Não foi possível obter as negociações do período')
        });
    }

    importaNegociacoes() {

        this._service
            .obtemNegociacoesDoPeriodo()
            .then(negociacoes => {
                negociacoes.filter(novaNegociacao =>
                    !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao
                        .equals(negociacaoExistente)))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(err => this._mensagem.texto = err);
    }
}