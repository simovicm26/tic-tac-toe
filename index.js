const playerCreator = function(gameValue){
    
    return {gameValue};

};

const playerX = playerCreator('X');

const playerO = playerCreator('O');



const gameBoard = function(){
    let gameBoardArray = ['','','','','','','','',''];

    let fieldValue = playerX.gameValue;

    const renderContent = function(){
        for(let i = 0; i < gameBoardArray.length; i++){

            let boardField = document.querySelector(`[data-field='${i}']`);
    
            boardField.textContent = `${gameBoardArray[i]}`;
        }

    }

    const changeContent = function(fieldNumber){

        if(gameBoardArray[fieldNumber] === ''){
            
            gameBoardArray[fieldNumber] = `${fieldValue}`;

            if(fieldValue === playerX.gameValue){

                fieldValue = playerO.gameValue;

            } else{

                fieldValue = playerX.gameValue;

            }
    
        } else {
            return;
        }
     
        renderContent();

        checkForGameEnd();
    }

    const checkForGameEnd = function(){
       
        if((gameBoardArray[0] === 'X' && gameBoardArray[1] === 'X' && gameBoardArray[2] === 'X') || 
            (gameBoardArray[3] === 'X' && gameBoardArray[4] === 'X' && gameBoardArray[5] === 'X') ||
            (gameBoardArray[6] === 'X' && gameBoardArray[7] === 'X' && gameBoardArray[8] === 'X') ||
            (gameBoardArray[0] === 'X' && gameBoardArray[3] === 'X' && gameBoardArray[6] === 'X') ||
            (gameBoardArray[1] === 'X' && gameBoardArray[4] === 'X' && gameBoardArray[7] === 'X') ||
            (gameBoardArray[2] === 'X' && gameBoardArray[5] === 'X' && gameBoardArray[8] === 'X') ||
            (gameBoardArray[0] === 'X' && gameBoardArray[4] === 'X' && gameBoardArray[8] === 'X') ||
            (gameBoardArray[2] === 'X' && gameBoardArray[4] === 'X' && gameBoardArray[6] === 'X'))
            {

                displayController.playerWon('X');

        } else if((gameBoardArray[0] === 'O' && gameBoardArray[1] === 'O' && gameBoardArray[2] === 'O') || 
        (gameBoardArray[3] === 'O' && gameBoardArray[4] === 'O' && gameBoardArray[5] === 'O') ||
        (gameBoardArray[6] === 'O' && gameBoardArray[7] === 'O' && gameBoardArray[8] === 'O') ||
        (gameBoardArray[0] === 'O' && gameBoardArray[3] === 'O' && gameBoardArray[6] === 'O') ||
        (gameBoardArray[1] === 'O' && gameBoardArray[4] === 'O' && gameBoardArray[7] === 'O') ||
        (gameBoardArray[2] === 'O' && gameBoardArray[5] === 'O' && gameBoardArray[8] === 'O') ||
        (gameBoardArray[0] === 'O' && gameBoardArray[4] === 'O' && gameBoardArray[8] === 'O') ||
        (gameBoardArray[2] === 'O' && gameBoardArray[4] === 'O' && gameBoardArray[6] === 'O'))
            {
                displayController.playerWon('O'); 

        } else if(gameBoardArray[0] !== '' && gameBoardArray[1] !== '' && gameBoardArray[2] !== '' &&
                 gameBoardArray[3] !== '' && gameBoardArray[4] !== '' && gameBoardArray[5] !== '' &&
                 gameBoardArray[6] !== '' && gameBoardArray[7] !== '' && gameBoardArray[8] !== '')
            {

                
        }

    }
    
    document.addEventListener('click', function(event){

        if(event.target.matches('p.play-again')){

        fieldValue = playerX.gameValue;
    
        displayController.container.style.display = 'grid';
    
        gameBoardArray = ['','','','','','','','',''];
    
        displayController.message.style.display = 'none';
    
        displayController.button.style.display = 'none';
    
        renderContent();
    
        }
    });


    return {gameBoardArray , renderContent, changeContent};    
}();


const displayController = function(){

    let countO = 0;

    let countX = 0;

    let button = document.createElement('p');

    let container = document.querySelector('.container');

    let wrapper = document.querySelector('.wrapper');

    let message = document.createElement('p');

    let scoreboard = document.querySelector('.score-container');

    message.style.display = 'none';

    button.style.display = 'none';

    button.style.textDecoration = 'underline';

    button.classList.add('play-again');

    button.textContent = 'Play Again';

    message.style.margin = '50px';

    wrapper.insertBefore(message , scoreboard);

    wrapper.insertBefore(button , scoreboard);

    const playerWon = function(who){

        playerScore = document.querySelector(`#score-${who.toLowerCase()}`);

        message.textContent = `The winner is player ${who}!`;

        container.style.display = 'none';

        message.style.display = 'block';

        button.style.display = 'block';

        if(who === 'O'){

            countO += 1;

            playerScore.textContent = countO.toString();  

        } else {

            countX += 1;

            playerScore.textContent = countX.toString();  

        }

    };

    document.addEventListener('click' , function(event){

        if(event.target.matches('div.restart-button')){

            countO = 0;

            countX = 0;

            document.querySelector('#score-x').textContent = '0';
            
            document.querySelector('#score-o').textContent = '0';
        }

    })

    return{playerWon , container , button , message };

}();

document.addEventListener('click', function(event){

    if(event.target.matches('div.field')){

        let field = event.target.getAttribute ('data-field');

        gameBoard.changeContent(field);

    }

});



