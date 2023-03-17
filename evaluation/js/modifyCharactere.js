import axios from 'axios';

const agentList = document.querySelector('.allCharacters');


// Affichage de tout les agents puis ajout de la modification d'un agent


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
          
                const agentItem = document.createElement('input');
                agentItem.placeholder = agent.displayName;
                agentItem.classList.add('card-text');
                agentCardBody.appendChild(agentItem);


                const btnModify = document.createElement('button');
                btnModify.textContent = "Modifier";
                btnModify.classList.add('btn', 'btn-success');
                btnModify.addEventListener('click', () => {
                    axios.put(`http://localhost:3000/characters/${agent._id}`, { displayName: agentItem.value })
                        .then(() => {
                            alert("L'agent a bien été modifié!");
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                });
                agentCardBody.appendChild(btnModify);
                
                agentCard.appendChild(agentCardBody);
                agentList.appendChild(agentCard);
            });
        }
    })