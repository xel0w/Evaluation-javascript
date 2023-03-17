import axios from 'axios';

const agentList = document.querySelector('.allCharacters');


// Affichage de tout les agents puis suppression de l'agent séléctionné
axios.get('http://localhost:3000/characters')
    .then((resp)=>{
        
        const agentArrayPerso = resp.data;
        console.log(agentArrayPerso);
        if (agentArrayPerso.length == 0) {
            const nullMessage = document.createElement('p');
            nullMessage.textContent = "Vous n'avez actuellement aucun agent personnalisé";
            agentList.appendChild(nullMessage); 
        } else {
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


                const btnDelete = document.createElement('button');
                btnDelete.textContent = "Supprimer";
                btnDelete.classList.add('btn', 'btn-danger');
                btnDelete.addEventListener('click', () => {
                    axios.delete(`http://localhost:3000/characters/${agent._id}`)
                        .then(() => {
                            agentCard.remove();
                            alert("L'agent a bien été supprimé!");
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                });
                agentCardBody.appendChild(btnDelete);
                
                agentCard.appendChild(agentCardBody);
                agentList.appendChild(agentCard);
            });
        }
    })