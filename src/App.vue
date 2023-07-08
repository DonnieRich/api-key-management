<script>
import axios from 'axios';

export default {
    data() {
        return {
            helloResult: '',
            almostSecretResult: '',
            quizApiQuestion: ''
        }
    },
    methods: {
        callHelloFunction() {
            axios.get('/.netlify/functions/hello')
                .then((response) => {
                    // handle success
                    console.log(response);
                    this.helloResult = response.data.message;
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                });
        },
        callAlmostSecretFunction() {
            axios.get('/.netlify/functions/almost-secret')
                .then((response) => {
                    // handle success
                    console.log(response);
                    this.almostSecretResult = response.data.message;
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                });
        },
        callQuizApi() {
            axios.get('/.netlify/functions/quizapi')
                .then((response) => {
                    // handle success
                    console.log(response);
                    this.quizApiQuestion = response.data.response[0].question;
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
    <h2>
        Impostare correttamente le API key in progetti front-end
    </h2>
    <p>
        Ispezionando il codice di questo sito potete vedere come i valori presenti nel codice JS siano facilmente visibili a
        tutti gli utenti.
        Questo è un grave problema di sicurezza quando succede con dati sensibili (es. una API Key che dovrebbe invece
        essere privata e non disponibile a tutti).
    </p>

    <p>
        Cliccando sul seguente pulsante eseguiamo la chiamata ad una funzione di Netlify e ne leggiamo il risultato qui:
        [{{ helloResult }}]
        <button @click="callHelloFunction()">HELLO</button>
    </p>

    <p>
        Cliccando sul seguente pulsante eseguiamo la chiamata ad una funzione di Netlify che legge il contenuto di una
        variabile d'ambiente impostata dal pannello di controllo:
        [{{ almostSecretResult }}]
        <button @click="callAlmostSecretFunction()">ALMOST SECRET</button>
        Ovviamente il contenuto adesso non è più segreto... come fare quindi per esegure una chiamata API che ha necessità
        di trasmettere anche una API Key, in modo sicuro?
    </p>

    <p>
        Eseguiamo adesso una chiamata ad una API reale - QuizAPI - che richiede la trasmissione di un token:
        [{{ quizApiQuestion }}]
        <button @click="callQuizApi()">CALL QUIZ API</button>
        La chiamata è andata a buon fine, il token è stato trasmesso correttamente, ma nessuno è in grado di leggerlo o
        copiarlo per poterlo utilizzare al posto nostro.
    </p>
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
</style>
