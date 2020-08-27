class deletaAlunos {

    constructor() {

        this.dataArray = []
    }



    mostrarTabela() {
        console.log(this.dataArray)
        var _this = this;
        _this.dataArray = this.dataArray;
        fetch("http://127.0.0.1:5000/")
            .then(function(response) {
                console.log(_this.dataArray);


                response.json().then(function(data) {
                    console.log(data);

                    if (data.length > 0) {

                        var temp = "<tr><th><input value='.'  type='checkbox' id='ckTodos'> Todos os Nome</input></th></tr>";


                        data.forEach((u, index) => {
                            temp += "<tr>";
                            temp += `<th> <input type='checkbox' id=${u}_${index}>` + u + "</input><th/>";
                            //aspas deitadas, $ e {}-> sintaxe q permite usar variável na string  (index==ordem no array)




                        });

                        document.getElementById("tbNomes").innerHTML = temp;


                        data.forEach((u, index) => {
                            document.getElementById(`${u}_${index}`).onclick = function() {
                                if (this.checked) {
                                    //this.checked == true
                                    _this.dataArray.push(u)
                                } else {
                                    _this.dataArray = _this.dataArray.filter(element => {
                                        //filter== for.each, usada para modificar array
                                        return element != u
                                    })
                                }
                            }
                        })

                        document.getElementById('ckTodos').onclick = function() {

                            if (this.checked) {
                                _this.dataArray = data
                                data.forEach((d, index) => {
                                    document.getElementById(`${d}_${index}`).checked = true
                                });

                            } else {
                                data.forEach((d, index) => {
                                    document.getElementById(`${d}_${index}`).checked = false
                                });
                                _this.dataArray = []
                            }
                        };

                    }
                });
            })
            .catch(function(err) {
                console.error('Failed retrieving information', err);
            });


    }

    deleteData() {
        console.log("morte")
        console.log(this.dataArray)
        const data = { name: this.dataArray }



        fetch(" http://127.0.0.1:5000/deletar", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)



            })
            .then(name => {
                console.log('Sucess:', name)
                document.location.reload(true);

            })
            .catch((error) => {
                console.error('Error:',
                    error);
            });



    }

}

var deletarAlunos = new deletaAlunos()
document.addEventListener('DOMContentLoaded', function() {
    deletarAlunos.mostrarTabela();
}, false);

var deletar = document.getElementById("btExcluir");
deletar.addEventListener("click", function() {
    deletarAlunos.deleteData();
}, false);