const WALL_CONST = 50;// made so bullet could've collide with smallest part of breakable wall

const mapWidth = Math.floor(1200 / WALL_CONST); //canvas height / wallConst
const mapHeight = Math.floor(800 / WALL_CONST); //canvas width / wallConst

const SPAWN_PLACES = [
    [1.5, 1.5],
    [1.5, mapHeight - 2.5],
    [mapWidth - 2.5, 1.5],
    [mapWidth - 2.5, mapHeight - 2.5]
];
console.log(`curr Val of mapWidth = ${mapWidth} or as it calculated : ${canvas.width / WALL_CONST}`);


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandArr(limit, size)
{
    let randArr = [];
    for(let i = 0; i < size; ++i)
    {
        randArr[i] = getRandomInt(limit);
        for (let k = 0; k < i; ++k) if(randArr[i] == randArr[k])
        {
            --i;
            continue;
        }
    } 
    return randArr
}

function getSpawnPosition()
{
    let randArr = getRandArr(4, 3);
    let res = [
        [ , ],
        [ , ],
        [ , ]
    ]

    for (let i = 0; i < 3; ++i)
    {
        res[i][0] = SPAWN_PLACES[randArr[i]][0] * WALL_CONST;
        res[i][1] = SPAWN_PLACES[randArr[i]][1] * WALL_CONST;
    }
    return res
}

function getMap(maxBlockAmount = 150)
{
    let temp = mapRand(maxBlockAmount);
    return mapParser(temp);
}

function mapRand(maxBlockAmount)
{
       //constructor(x, y, w * 40, h * 40, health, isConstant = false)
    // 30:20

    // 22222
    // 2  1
    // 2  1
    // 2111
    let temp = 0;
    let variate = getRandomInt(6) + 1; //amount of possible blocks to skip 
    let tankBlocks = 5; // amount of 100% cleared blocks at tank spawn 

    let res = new Array(mapWidth);

    for (let i = 0; i < mapWidth; ++i)
    {
        
        res[i] = new Array(mapHeight)
        for(let k = 0; k < mapHeight; ++k)
        {
            if (i == 0 || i == mapWidth - 1 || k == 0 || k == mapHeight - 1) res[i][k] = 2;
            else if(
                i < tankBlocks + 1 && k < tankBlocks + 1 || 
                i > mapWidth - tankBlocks && k > mapHeight - tankBlocks || 
                i > mapWidth - tankBlocks && k < tankBlocks + 1 ||
                i < tankBlocks + 1 && k > mapHeight - tankBlocks) // corners of the map with amount of cleared blocks for tanks
                continue;
            else
            if (maxBlockAmount)
            {
                if(variate < 1)
                {
                    temp = getRandomInt(8)
                    temp += 5
                    if (temp > 2) 
                    {
                        res[i][k] = 1
                        --maxBlockAmount;
                    }
                    variate = getRandomInt(6) + 2;
                }
                --variate;
            }   
        }
    }

    return res;        
}

function mapParser(mapArr)
{
    let res = [], counter = 0;
    /*

    (h || w ) * size of block;
    size of smallest collideable object = 7.5 => smallest side * health = 7.5;

    */
    for (let i = 0; i != mapArr.length; ++i)
    {
        for(let k = 0; k != mapArr[i].length; ++k)
        {
            let x = i * WALL_CONST;
            let y = k * WALL_CONST;   
            switch(mapArr[i][k])
            {
                case 1:
                    res [counter++] = new Wall(x, y, WALL_CONST, WALL_CONST, getRandomInt(4) + 2);
                    break;
                case 2:
                    res [counter++] = new Wall(x, y, WALL_CONST, WALL_CONST, 1, true);
                    break;
                default:
                    break;
            }
        }
    }
    return res;

}
