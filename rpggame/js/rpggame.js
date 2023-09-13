let xp = 0
let health = 100
let gold = 50
let currentWeapon = 0
let fighting 
let monsterHealth 
let inventory =["stick"]
let newWeapon

const button1 = document.querySelector("#button1")
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const goldText = document.querySelector("#goldText")
const healthText = document.querySelector("#healthText")
const monsterStats = document.querySelector("#monsterStats")
const monsterHealthText = document.querySelector("#monsterHealth")
const monsterNameText = document.querySelector("#monsterName")
const locations = [{
    name: "town square",
    "button text": ["Go to store","Go to cave", "Fight dragon"],
    "button functions": [goStore,goCave,fightDragon],
    text: "You are in the town square. You see a sign that says \"Store.\""

},{
    name: "store",
    "button text": ["Buy 10 health (10 gold)","Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth,buyWeapon,goTown],
    text: "You enter the store"
},
{
    name: "cave",
    "button text": ["Fight slime","Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime,fightBeast,goTown],
    text: "You enter the cave. You see some monsters"
},{
    name: "fight",
    "button text": ["Attack","Dodge", "Run"],
    "button functions": [attack,dodge,run],
    text: "You are fighting a monsters"
}, {
    name: "kill monster",
    "button text": ["Go to town square","Go to town square", "Go to town square"],
    "button functions": [goTown,goTown,easterEgg],
    text: "The monster screams 'arg!' as it dies. you gain experienxe points and find gold"
},
{
    name: "loser",
    "button text": ["REPLAY?","REPLAY?", "REPLAY?"],
    "button functions": [restart,restart,restart],
    text: "You lost 💀"
}, {
    name: "win",
    "button text": ["REPLAY?","REPLAY?", "REPLAY?"],
    "button functions": [restart,restart,restart],
    text: "You defeat the dragon, you win the game!"
},{
    name: "easter egg",
    "button text": ["2","8", "Go to town square"],
    "button functions": [pickTwo,pickEight,goTown],
    text: "You have found a secret gane. pick a number above. Ten numbers will be randomly chosen between 0 and 10. if the number you choose matches one of the random numbers, you win"
}]

const weapons = [
    {name:'stick',
    power: 5},
    {name:'dagger',
     power: 30},
    {name:'claw hammer',
     power: 50},
    {name:"sword",
    power: 100},
            
]

const monsters = [
    {name:'slime',level:"2",health:"15"},
    {name:'fanged beast',level:"8",health:"60"},
    {name:'dragon',level:"20",health:"300"},
    
            
]


button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

function update(location){
    monsterStats.style.display=


    "none"
    button1.innerText = location["button text"][0]
    button2.innerText = location["button text"][1]
    button3.innerText = location["button text"][2]
    button1.onclick = location["button functions"][0]
    button2.onclick = location["button functions"][1]
    button3.onclick = location["button functions"][2]
    text.innerText= location.text
}

function goTown(){
    update(locations[0])
}

function goStore(){
    update(locations[1])
}


function goCave(){
    update(locations[2])
}


function buyHealth(){
    if (gold >=10){
        gold -= 10
        health += 10
        goldText.innerText = gold
        healthText.innerText = health
    }
    else{
        text.innerText = "You do not have enough gold"

    }

}

function buyWeapon(){
    if (currentWeapon<weapons.length-1){
        if (gold >=30){
            gold -= 30
            currentWeapon++
            
            goldText.innerText = gold
            let newWeapon = weapons[currentWeapon].name
            text.innerText = "You now have a " +String(newWeapon) + "."
            inventory.push(newWeapon)
            text.innerText = "In your inventory you have  " +inventory + "."

        }
        else{
            text.innerText = "You do not have enough gold to buy a weapon"
        }
    }
    else {
        text.innerText = "You already have the most powerful weapon"
        button2.innerText="sell weapon for 15 gold"
        button2.onclick = sellweapon()
    }
}
function fightSlime(){
    fighting=0
    gofight()
}

function fightBeast(){
    fighting=1
    gofight()
}
function fightDragon(){
    fighting=2
    gofight()
 }
 
function gofight(){
    update(locations[3])
    monsterHealth = monsters[fighting].health
    monsterStats.style.display = "block"
    monsterNameText.innerText = monsters[fighting].name
    monsterHealthText.innerText = monsterHealth
 }
 
 

function sellweapon(){
    if (inventory.length>1){
        gold += 15
        goldText.innerText = gold
        let currentWeapon = inventory.shift()
        text.innerText = "You sold the   " +currentWeapon + "."
        text.innerText += "Your current inventory remains "   +inventory + "."




    }
}

function attack(){
    text.innerText = "The " +monsters[fighting].name + " attacks."
    text.innerText += "You attack it with your " +weapons[currentWeapon].name +". "
    if (monsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level)
     }
    else{
        text.innerText+= "You miss"

    }
    
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1
    monsterHealthText.innerText = monsterHealth
    healthText.innerText = health
    if (health<=0){
        lose()
    }
    else if (monsterHealth<=0){
        fighting===2 ? winGame() : defeatMonster()
    }
    if (Math.random()<=0.1  && inventory.length!==1){
        text.innerText = "Your " +inventory.pop() +" breaks."
        currentWeapon--

    }
   
     if (health<20){
            document.body.style.backgroundColor="red"
        }
     
}

function dodge(){
    text.innerText = "You dodged an attacl from the  " +monsters[fighting].name + "."
}

function run(){
    goTown()

}
function defeatMonster(){
    gold += Math.floor(monsters[fighting].level*6.7)
    xp += Math.floor(monsters[fighting].level)
    goldText.innerText = gold
    xpText.innerText = xp
    update(locations[4])
}
function lose(){
    update(locations[5])
    
}
function winGame(){
    update(locations[6])
}


function restart(){
    xp = 0
    health = 100
    gold = 50
    currentWeapon = 0
    fighting 
    monsterHealth 
    inventory =["stick"]
    healthText.innerText=health
    xpText.innerText = xp
    goldText.innerText= gold
    
    document.body.style.backgroundColor="darkblue"
    goTown()

}

function getMonsterAttackValue(level){
    let hit = (level*5)-(Math.floor(Math.random()*xp))
    console.log(hit)
    return hit
    
}
function monsterHit(){
    return Math.random()<0.2 || health<20

}

function easterEgg(){
    update(locations[7])
}
function pickTwo(){
    pick(2)
}
function pickEight(){
    pick(8)
}
function pick(guess){
    let numbers=[]
    while (numbers.length<10){
    numbers.push(Math.floor(Math.random()*11))
}
text.innerText="You picked " +guess +" here are the random numbers:\n"
for(let i=0;i<10;i++)
{
text.innerText+=numbers[i] +"\n"
}
if (numbers.indexOf(guess)!=-1){
    text.innerText+="Right, you win 20 gold"

    gold+=20
    goldText.innerText=gold


}
else{
    text.innerText+="Wrong, you lose 20 health"
    health-=20
    healthText.innerText=gold
    if (health<+0){
        lose()
    }
}
}

function warning(healthLife){
    if (healthLife<20){
        document.body.style.backgroundColor="red"
    }
    else {
        document.body.style.backgroundColor="darkblue"
    }
}