import '../styles/style.css';
import axios from 'axios';


// Affichage de tout les agents


const agentList = document.querySelector('.allCharacters');
    axios.get('http://localhost:3000/characters')
    .then((resp)=>{
      const agentArrayPerso = resp.data;

      agentArrayPerso.forEach(agent => {

        const agentCard = document.createElement('div');
        agentCard.classList.add('card'); 

        const agentPicture = document.createElement('img');
        agentPicture.src = agent.fullPortrait;
        agentPicture.classList.add('card-img-top');
        agentCard.appendChild(agentPicture);

        const agentCardBody = document.createElement('div');
        agentCardBody.classList.add('card-body');
  

        const agentItem = document.createElement('p');
        agentItem.textContent = "Nom: " + agent.displayName;
        agentItem.classList.add('card-text');


        agentCardBody.appendChild(agentItem);
        agentCard.appendChild(agentCardBody);
        agentList.appendChild(agentCard);

      });
    })
