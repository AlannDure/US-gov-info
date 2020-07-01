var app = new Vue({
   el: '#app',
   data: {
      members: [],
      estados: [],
   },
   methods: {
      loadMembers: function () {
         var imprimirTabla = [];

         var filter = getCheckedBoxes("party");

         var valorSelect = document.getElementById("state").value

         for (var i = 0; i < members.length; i++) {
            var party = members[i].party;
            var estados = members[i].state;

            if (filter.includes(party) && (estados == valorSelect || valorSelect == "All")) {

               imprimirTabla.push(members[i]);

               //imprimirTabla += "<tr><td>" + "<a href='" + members[i].url + "'>" + members[i].first_name + " " + (members[i].middle_name || " ") + " " + members[i].last_name + "</a>" + "</td><td>" + members[i].party + "</td><td>" + members[i].state + "</td><td>" + members[i].seniority + "</td><td>" + members[i].votes_with_party_pct + "%" + "</td></tr>";
            }
         }
         app.members = imprimirTabla;
         //document.getElementById("house-data").innerHTML = imprimirTabla;
         function getCheckedBoxes(chkboxName) {
            var checkboxes = document.getElementsByName(chkboxName);
            var checkboxesChecked = [];

            for (var i = 0; i < checkboxes.length; i++) {

               if (checkboxes[i].checked == true) {
                  checkboxesChecked.push(checkboxes[i].value);
               }
            }
            return checkboxesChecked;
         }
      },
      filterStates: function () {
         var arrayestados = [];

         for (i = 0; i < members.length; + i++) {
            arrayestados.push(members[i].state);

         }

         var estadoFiltrado = arrayestados.filter((a, b) => arrayestados.indexOf(a) === b)

         app.estados = estadoFiltrado;

         var llenado = '<option value="All">All</option>'

         for (var i = 0; i < estadoFiltrado.length; i++) {
            llenado += '<option value="' + estadoFiltrado[i] + '">' + estadoFiltrado[i] + "</option>"
         }
         //document.getElementById("state").innerHTML = llenado;
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
      members = myJson.results[0].members;
      app.members = myJson.results[0].members;

      app.filterStates();
      app.loadMembers();

   });