(function () {
    angular.module('starter').factory('firebaseTool', firebaseTool);

    function firebaseTool($q) {

        var service = {};

        service.create = function (url, objeto) {

            // Cria um promisse
            var deferred = $q.defer();

            // Inicializa uma nova chave
            var new_key = firebase.database().ref().child(url).push().key;

            var new_data = {};
            new_data[url + new_key] = objeto;

            // Retorna o promise
            var promise = firebase.database().ref().update(new_data);

            promise.then(function () {
                // Dados inseridos, retorna a new_key
                deferred.resolve(new_key);
            },
                function (error) {
                    deferred.reject("Problemas ao inserir no DB");
                });

            // Retorna o promisse
            return deferred.promise;
        }

        /**
          * Cria/atualiza um path simples com o objeto
          *
          */
        service.set = function (url, objeto) {
            return firebase.database().ref(url).set(objeto);
        }

        /**
          * Faz o upload em um caminho determinado
          */
        service.upload = function (url, file) {

            // Cria uma referencia do storage
            var storageRef = firebase.storage().ref();

            // Cria um MIME do arquivo
            var metadata = {
                contentType: file.type
            };

            // Referencia do objeto
            var uploadTask = storageRef.child(url).put(file, metadata);

            return uploadTask;
        }

        return service;
    }
})();