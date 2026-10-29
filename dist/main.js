"use strict";
let ultimonome = "";
let postiLiberi = 6;
function maiuscola(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
function registra() {
    const nome = document.getElementById("nome");
    const specie = document.getElementById("specie");
    const taglia = document.querySelector('input[name="taglia"]:checked');
    const eta = document.getElementById("eta");
    const vaccino = document.getElementById("vaccinato");
    const messaggio = document.getElementById("messaggio");
    const pulsanteRegistra = document.getElementById("registra");
    messaggio.textContent = "";
    if (nome.value.trim() === "") {
        messaggio.textContent = "Inserisci il nome dell’animale.";
        return;
    }
    if (nome.value.trim().toLowerCase() === ultimonome.toLowerCase()) {
        messaggio.textContent = nome.value.trim() + " è appena stata registrata.";
        return;
    }
    ultimonome = nome.value.trim();
    if (specie.value === "") {
        messaggio.textContent = "Scegli la specie.";
        return;
    }
    if (taglia === null) {
        messaggio.textContent = "Scegli la taglia.";
        return;
    }
    const con_eta = parseInt(eta.value.trim(), 10);
    if (eta.value.trim() === "" || Number.isNaN(con_eta) || con_eta < 0 || con_eta > 20 || Number(eta.value) !== con_eta) {
        messaggio.textContent = "L’età deve essere un numero intero da 0 a 20.";
        return;
    }
    let fascia;
    if (con_eta < 2) {
        fascia = "Cucciolo";
    }
    else if (con_eta < 8) {
        fascia = "Adulto";
    }
    else {
        fascia = "Anziano";
    }
    const specieNome = maiuscola(specie.value);
    const tagliaNome = maiuscola(taglia.value);
    const immagine = document.getElementById("immagine");
    switch (specie.value) {
        case "cane":
            immagine.src = "img/cane.svg";
            immagine.alt = "Cane";
            break;
        case "gatto":
            immagine.src = "img/gatto.svg";
            immagine.alt = "Gatto";
            break;
        case "coniglio":
            immagine.src = "img/coniglio.svg";
            immagine.alt = "Coniglio";
            break;
    }
    let costobase = 0;
    switch (taglia.value) {
        case "piccolo":
            costobase = 40;
            break;
        case "medio":
            costobase = 60;
            break;
        case "grande":
            costobase = 80;
            break;
    }
    if (fascia === "Anziano") {
        costobase = costobase / 2;
    }
    const nuovariga = document.createElement("li");
    let testoriga = nome.value.trim() + "  " + specieNome + ", taglia " + tagliaNome + "  " +
        con_eta + (con_eta === 1 ? " anno (" : " anni (") + fascia + ")  " + costobase + " € ";
    if (fascia === "Anziano" && !vaccino.checked) {
        testoriga = "URGENTE " + testoriga;
    }
    nuovariga.textContent = testoriga;
    if (vaccino.checked) {
        const elencoPronti = document.getElementById("elenco-pronti");
        elencoPronti.appendChild(nuovariga);
    }
    else {
        const elencoAttesa = document.getElementById("elenco-attesa");
        elencoAttesa.appendChild(nuovariga);
    }
    const tdCani = document.getElementById("conta-cani");
    const tdGatti = document.getElementById("conta-gatti");
    const tdConigli = document.getElementById("conta-conigli");
    if (specie.value === "cane") {
        tdCani.textContent = (parseInt(tdCani.textContent || "0", 10) + 1).toString();
    }
    else if (specie.value === "gatto") {
        tdGatti.textContent = (parseInt(tdGatti.textContent || "0", 10) + 1).toString();
    }
    else if (specie.value === "coniglio") {
        tdConigli.textContent = (parseInt(tdConigli.textContent || "0", 10) + 1).toString();
    }
    const nCani = parseInt(tdCani.textContent || "0", 10);
    const nGatti = parseInt(tdGatti.textContent || "0", 10);
    const nConigli = parseInt(tdConigli.textContent || "0", 10);
    const pPiuOspitata = document.getElementById("piu-ospitata");
    if (nCani > nGatti && nCani > nConigli) {
        pPiuOspitata.textContent = "Specie più ospitata: Cane";
    }
    else if (nGatti > nCani && nGatti > nConigli) {
        pPiuOspitata.textContent = "Specie più ospitata: Gatto";
    }
    else if (nConigli > nCani && nConigli > nGatti) {
        pPiuOspitata.textContent = "Specie più ospitata: Coniglio";
    }
    else {
        pPiuOspitata.textContent = "Nessuna specie prevale";
    }
    postiLiberi--;
    const pPosti = document.getElementById("posti");
    if (postiLiberi === 0) {
        pPosti.textContent = "Canile al completo";
        pulsanteRegistra.disabled = true;
    }
    else {
        pPosti.textContent = "Posti liberi: " + postiLiberi;
    }
    nome.value = "";
    eta.value = "";
    vaccino.checked = false;
}
//# sourceMappingURL=main.js.map