var app = new Vue({
    el: '#app',
    data: {
        statistics: {

            "democrat": [],
            "republican": [],
            "independent": [],
            "votesDemocrats": 0,
            "votesRepublicans": 0,
            "votesIndependents": 0,
            "mostLoyal": [],
            "leastLoyal": [],
            "mostMissed": [],
            "leastMissed": [],

        },
    },
    methods: {
        partys: function () {

            for (var i = 0; i < members.length; i++) {
                if (members[i].party === "D") {
                    app.statistics.democrat.push(members[i])
                } else if (members[i].party === "R") {
                    app.statistics.republican.push(members[i])
                } else if (members[i].party === "I") {
                    app.statistics.independent.push(members[i])
                }
            }
        },
        votesPartys: function (miembros) {
            var promedio = 0;
            if (miembros.length != 0) {
                var porcentajeVotos = [];

                for (var i = 0; i < miembros.length; i++) {
                    porcentajeVotos.push(miembros[i].votes_with_party_pct)
                }

                var suma = porcentajeVotos.reduce((a, b) => a + b, 0);

                promedio = (suma / miembros.length)


            } else {
                promedio = 0
            }
            return promedio;
        },
        toObject: function () {
            app.statistics.votesDemocrats = app.votesPartys(app.statistics.democrat);
            app.statistics.votesRepublicans = app.votesPartys(app.statistics.republican);
            app.statistics.votesIndependents = app.votesPartys(app.statistics.independent);
        },
        draw: function () {
            document.getElementById("numeroDemocratas").innerHTML = statistics.democrat.length;
            document.getElementById("numeroRepublicanos").innerHTML = statistics.republican.length;
            document.getElementById("numeroIndependientes").innerHTML = statistics.independent.length;
            document.getElementById("total").innerHTML = statistics.democrat.length + statistics.republican.length + statistics.independent.length;

            document.getElementById("votosRepublicanos").innerHTML = statistics.votesRepublicans;
            document.getElementById("votosDemocratas").innerHTML = statistics.votesDemocrats;
            document.getElementById("votosIndependientes").innerHTML = statistics.votesIndependents;
            document.getElementById("totalDos").innerHTML = [(statistics.votesRepublicans + statistics.votesDemocrats + statistics.votesIndependents) / 2];
        },
        loyalty: function () {
            var cantidadMiembros = Math.round(members.length * 0.10);

            members.sort(function (a, b) {

                if (a.votes_against_party_pct > b.votes_against_party_pct) {
                    return 1;
                }
                if (a.votes_against_party_pct < b.votes_against_party_pct) {
                    return -1;
                }

                return 0
            });

            var mostLoyal = members.slice(0, cantidadMiembros);

            var leastLoyal = members.slice(members.length - cantidadMiembros);

            app.statistics.mostLoyal = mostLoyal;

            app.statistics.leastLoyal = leastLoyal;
        },
        attendance: function () {
            var cantidadMiembros = Math.round(members.length * 0.10);

            members.sort(function (a, b) {

                if (a.missed_votes_pct > b.missed_votes_pct) {
                    return 1;
                }
                if (a.missed_votes_pct < b.missed_votes_pct) {
                    return -1;
                }

                return 0
            });

            var leastMissed = members.slice(0, cantidadMiembros);

            var mostMissed = members.slice(members.length - cantidadMiembros);

            app.statistics.leastMissed = leastMissed;

            app.statistics.mostMissed = mostMissed;

        },
        tablaMost: function (array) {
            var imprimir1 = "";

            for (var i = 0; i < array.length; i++) {

                imprimir1 += "<tr><td>" + "<a href='" + array[i].url + "'>" + array[i].first_name + " " + (array[i].middle_name || " ") + " " + array[i].last_name + "</a>" + "</td><td>" + array[i].total_votes + "</td><td>" + array[i].votes_against_party_pct + "%" + "</td></tr>";

            }
            document.getElementById("tablaMost").innerHTML = imprimir1;
        },
        tablaLeast: function (array) {
            var imprimir2 = "";

            for (var i = 0; i < array.length; i++) {

                imprimir2 += "<tr><td>" + "<a href='" + array[i].url + "'>" + array[i].first_name + " " + (array[i].middle_name || " ") + " " + array[i].last_name + "</a>" + "</td><td>" + array[i].total_votes + "</td><td>" + array[i].votes_against_party_pct + "%" + "</td></tr>";

            }
            document.getElementById("tablaLeast").innerHTML = imprimir2;
        }

    }



});

var myHeader = new Headers();

myHeader.append("X-API-Key", "a4NvdrFaCzxW0l2o1ZhfcMNW53muvjIPfihq4G72")

var miInit = {
    method: 'GET',
    headers: myHeader,
};

fetch("https://api.propublica.org/congress/v1/113/house/members.json", miInit)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        data = myJson;
        members = data.results[0].members;

        app.partys();
        app.toObject();
        //app.draw();
        app.loyalty();
        app.attendance();
        //app.tablaMost(app.statistics.mostLoyal);
        //app.tablaLeast(app.statistics.leastLoyal);


    });