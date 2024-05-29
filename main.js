const load_players = async (name = null, id = null) => {
    const url1 = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal`;
    const url2 = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`;
    const url3 = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    if (name === null && id === null) {
        const res = await fetch(url1);
        const data = await res.json();
        show_players(data.player);
    }
    else if (name !== null && id === null) {
        const res = await fetch(url2);
        const data = await res.json();
        show_players(data.player);
    }
    else {
        const res = await fetch(url3);
        const data = await res.json();
        return data.players[0];
    }
};

const show_players = (data) => {
    const parent = document.getElementsByClassName('players-left')[0];
    parent.innerHTML = '';
    data.forEach(player => {
        const child = document.createElement('div');
        child.classList.add('card');
        child.innerHTML = `
        <div>
            <img src="${player.strCutout}" alt="player profile picture" class="rounded-circle">
        </div>
        <div>
            <p>${player.strPlayer}</p>
            <p>Country: ${player.strNationality}</p>
            <p>Club: ${player.strTeam}</p>
            <p>Sports: ${player.strSport}</p>
            <p>Salary: ${player.strWage}</p>
            <p>${player.strDescriptionEN?.slice(0, 100)}</p>
        </div>
        <div class="text-center">
            <p>Social: 
            <a href="https://${player.strFacebook}"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://${player.strTwitter}"><i class="fa-brands fa-x-twitter"></i></a>
            </p>
            <br>
            <button type="button" id="${player.idPlayer}" class="btn btn-primary mb-2" onclick="addPlayer(${player.idPlayer}, '${player.strPlayer}')">Add Player</button>
            <br>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="playerDetail(${player.idPlayer})">Details</button>
        </div>
        `;
        parent.appendChild(child);
    });
};

const playerDetail = async (id) => {
    const modalHead = document.getElementById('exampleModalLabel');
    const modalBody = document.getElementById('modal-body');
    const data = await load_players(null, id);
    modalHead.innerText = `${data.strPlayer}`;
    modalBody.innerHTML =
        `
        <img src="${data.strCutout}" class="img-fluid" alt="player profile picture">
        <p>Country: ${data.strNationality}</p>
        <p>Gender: ${data.strGender}</p>
        <p>Club: ${data.strTeam}</p>
        <p>Sports: ${data.strSport}</p>
        <p>Salary: ${data.strWage}</p>
        <p>${data.strDescriptionEN?.slice(0, 200)}</p>
        `
        ;
};

const addPlayer = (id, name) => {
    const btn = document.getElementById(id);
    const count = document.getElementById('count');
    countInt = parseInt(count.innerText);
    if (countInt < 11) {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-danger');
        btn.innerText = 'Already Added';
        count.innerText = countInt + 1;

        const parent = document.getElementsByClassName('list')[0];
        const li = document.createElement('li');
        li.innerText = `${name}`;
        parent.appendChild(li);
    }
    else {
        alert('Can\'t add more than 11 players');
    }
}

const searchBar = () => {
    const q = document.getElementsByClassName('search-bar')[0].value;
    if (q.length == 0) {
        load_players(null, null);
    }
    else {
        load_players(q, null);
    }
}

load_players();