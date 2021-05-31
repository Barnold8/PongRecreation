class Obj{
  
  
  constructor(x,y,w,h,col,down,up,player=false){
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.speed = 0;
    this.res = 0.025;
    this.player = player;
    this.startSpeed = 4.5;
    
    //PUCK SPECFIC VARS
    
    this.puckX = 2;
    this.puckY = 2;
     
    //-----------------
    
    if(!player){
      let chanceX = random()
      let chanceY = random()
      //console.log(chanceY, chanceX)
      
      this.puckX = chanceX < 0.5 ? this.puckX : - this.puckX;
      this.puckY = chanceY < 0.5 ? this.puckY : - this.puckY;
      
    }
    
    //MOVE KEYCODES
    
    this.down = down;
    this.up = up;
    
    //-------------

  }
  
  
  PuckMovement(){
  
     this.x = width/2;
     this.y = height/2
        
     let chanceX = random()
     let chanceY = random()
     //console.log(chanceY, chanceX)
      
     this.puckX = chanceX < 0.5 ? this.puckX : - this.puckX;
     this.puckY = chanceY < 0.5 ? this.puckY : - this.puckY;
    
  }
  
  show(){
    
    fill(this.col);
    rect(this.x,this.y,this.w,this.h);
    
  }
    
  move(parsed_value=0){ //set to 0 for the event that object is puck and not player
  
    this.y += this.speed;
    
    if(!this.player){
        
  //puck code - Puck's speed is constant - avoiding const keyword to avoid colliding code error
      
      
      this.x += this.puckX; //FFS
      this.y += this.puckY;
      
      
      //Detect if either player wins point
      
      if(this.x <=0 -this.w/2){
        
        this.PuckMovement();
       
        
      }        //P2 wins point
      else if(this.x >= width - this.w/2){
        
        this.PuckMovement();
        
        
      }   //P1 wins point
      
      if(this.y >= height){ 
        
        this.y = 0 - this.h;
         
      }else if(this.y <= 0 - this.h){
        
        this.y = height 
      
      //
      }
      
    }
    else{
      
      //SPEED CONTROL TO ALLOCATE FOR BOTH MOTIONS
      
      
        if(this.speed > 0){
          
          this.speed -= this.res      //The italian gods bless this sphaghetti code :)
          
        }else if(this.speed < 0){
          
          this.speed += this.res;
          
        }
 
      if(this.y >= height){ //height is a global var duh
        
        this.y = 0 - this.h;
         
      }else if(this.y <= 0 - this.h){
        
        this.y = height 
        
      }
      //------------------------------------------
      
      
      switch(parsed_value){
          
        case this.down:
          
          this.speed = this.startSpeed;
          
          
          break;
          
        case this.up:
          
          this.speed = -this.startSpeed;
          
          
          break;
          
        default:
          break;  
      }
      
    }
  }  
}


CURRENT_KEY = null; //null var for the current key pressed in current frame





function setup() {
  createCanvas(400, 400);
                   //x,y,w,h,col,speed,down,up,player=false
  Player1 = new Obj(width*0.05,-10,20,100,255,83,87,true);
  Player2 = new Obj(width*0.90,height/2,20,100,255,40,38,true);  
  
  puckPosX = random(width/2-20,width/2+20);
  puckPosY = random(height/2-20,height/2+20);
  
  Puck = new Obj(width/2, height/2-100, 20, 20, 255)
  
  Players = [Player1,Player2]
  
}

function draw() {
  
  background(0);
  
  for(i = 0; i < Players.length; i++){
    
    Players[i].show();
    Players[i].move(CURRENT_KEY);
    
    if(PuckCol(Puck,Players[i])){
      
      Puck.puckX = - Puck.puckX;
      Puck.puckY = - Puck.puckY;
    }
    
    
  }
  
  
  Puck.show();
  Puck.move();

  CURRENT_KEY = 0; //overrides key at the end of the frame to stop constant speed
  
}


function keyPressed() {

  CURRENT_KEY = keyCode;

}

function PuckCol(rect1,rect2){
  
  if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
  return true
}
  else{return false}
  
  
}




