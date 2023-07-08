<script>
import axios from 'axios';

export default {
    data() {
        return {
            helloResult: '',
            almostSecretResult: '',
            quizApiQuestion: '',
            loading: false,
        }
    },
    methods: {
        callHelloFunction() {
            this.loading = true;
            axios.get('/.netlify/functions/hello')
                .then((response) => {
                    // handle success
                    console.log(response);
                    this.helloResult = response.data.message;
                    this.loading = false;
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                });
        },
        callAlmostSecretFunction() {
            this.loading = true;
            axios.get('/.netlify/functions/almost-secret')
                .then((response) => {
                    // handle success
                    console.log(response);
                    this.almostSecretResult = response.data.message;
                    this.loading = false;
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                });
        },
        callQuizApi() {
            this.loading = true;
            axios.get('/.netlify/functions/quizapi')
                .then((response) => {
                    // handle success
                    console.log(response);
                    this.quizApiQuestion = response.data.response[0].question;
                    this.loading = false;
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                });
        }
    }
}

</script>

<template>
    <div class="wrapper">
        <h2>
            Impostare correttamente le API key in progetti front-end
        </h2>
        <p>
            Ispezionando il codice di questo sito potete vedere come i valori presenti nel codice JS siano facilmente
            visibili a
            tutti gli utenti.
            Questo è un grave problema di sicurezza quando succede con dati sensibili (es. una API Key che dovrebbe invece
            essere privata e non disponibile a tutti).
        </p>

        <p>
            Cliccando sul seguente pulsante eseguiamo la chiamata ad una funzione di Netlify e ne leggiamo il risultato qui:
            [<span>{{ helloResult }}</span>]
            <button @click="callHelloFunction()">HELLO</button>
        </p>

        <p>
            Cliccando sul seguente pulsante eseguiamo la chiamata ad una funzione di Netlify che legge il contenuto di una
            variabile d'ambiente impostata dal pannello di controllo:
            [<span>{{ almostSecretResult }}</span>]
            <button @click="callAlmostSecretFunction()">ALMOST SECRET</button>
            Ovviamente il contenuto adesso non è più segreto... come fare quindi per esegure una chiamata API che ha
            necessità
            di trasmettere anche una API Key, in modo sicuro?
        </p>

        <p>
            Eseguiamo adesso una chiamata ad una API reale - QuizAPI - che richiede la trasmissione di un token:
            [<span>{{ quizApiQuestion }}</span>]
            <button @click="callQuizApi()">CALL QUIZ API</button>
            La chiamata è andata a buon fine, il token è stato trasmesso correttamente, ma nessuno è in grado di leggerlo o
            copiarlo per poterlo utilizzare al posto nostro.
        </p>
    </div>

    <div v-if="loading" class="loader">
        <h3>LOADING...</h3>
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.loader {
    align-items: center;
    background-color: grey;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
}

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.wrapper p {
    padding: 10px;
    border: 1px solid grey;
}

.wrapper p span {
    font-weight: bold;
    text-transform: uppercase;
}
</style>
