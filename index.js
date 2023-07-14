//Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
//Use at least one array.
//Use at least two classes.
//Your menu should have the options to create, view, and delete elements.

//Menu will be for a chorus. The first class will be for the singers, with their name and their tenure as constructors. The next class will be the vocal secttions those singers are part of-here I'll add an empty array called singers.

class Singer {
    constructor(name, tenure){
    this.name = name;
    this.tenure = tenure;
    }//Now I'll add a method to desribe this info about the singers:
    describe(){
        return `${this.name} has been a member of the chorus for ${this.tenure}`;
    }
}

class Vocals {
    constructor(part){
        this.part = part;
        this.singers = [];
    }//function to add singers to Vocal part if they're part of Singer class and an error msg if they're not:

    addSinger(singer){
        if (singer instanceof Singer) {
            this.singers.push(singer);
        }else {
           throw new Error(`Argument is not a singer: ${singer}`);
        }
        }//description to return the singers within the vocal part:
        describe(){
            return `The ${this.part} section has ${this.singers.length} singers.`;
        }
    }
    //now I need to create a class for my actual menu options; so I'll simply call this menu

    class Menu {
        constructor (){
        this.parts = []; //empty array to account for multiple parts with multiple singers
        this.selectedParts = null;
        }

    //add method to start up menu 
    start (){
        let selection = this.showMenu();
            while (selection !=0) {
                switch(selection) {
                    case '1':
                    this.createPart();
                    break;
                    case '2':
                    this.deletePart();
                    break;
                    case '3':
                    this.viewPart();
                    case '4':
                    this.displayParts();
                    break;
                    default:
                        selection = 0;
                    }
                    //selection = this.showMainMenu();
                    selection = this.showMenu();
            }
            alert(`Later!`);  //above and below I randomly started using MainMenu instead of just menu, so when I initally went to my live site it was going right to my secondary menu (options to add singer/delete singer). Quick fix thankfully!
    }

//next I have to write a function that will prompt the main menu:
    //showMainMenu(){
      showMenu(){
          return prompt(`
        0) Exit
        1) Create New Vocal Part
        2) Delete Vocal Part
        3) View a Vocal Part
        4) View All Vocal Parts
        `);
    }
    //now I have to create another prompt for when we are within each menu option, so I will pass my parameters into showMainMenu and create another prompt:
    
  // showPartsMenu(vocalParts) {
       showPartsMenu (vocalsInfo) {
    //showPartsMenu (selectedParts) {
        return prompt(`
        0) Back
        1) Add Singer
        2) Delete Singer
        ----------------
        ${vocalsInfo}
        
    `);
}
   // displayParts(){
   // viewPart(){ put this back to view all parts
      displayParts (){
        let partsString = '';
            for (let i = 0; i < this.parts.length; i++) {
              // partsString += i+ ')' + this.parts[i].name + '\n';
         partsString += i+ `)` + this.parts[i].part + `\n`;
            }
            alert(partsString);
      }
    createPart() {
        let part = prompt (`Enter New Vocal Part: `);
        this.parts.push(new Vocals(part)); 

    }

    //viewAllParts () { //had this trying to access all vocal parts, should just be to access one
       // displayParts () {
        viewPart (){ 
      let index = prompt(`Enter the index of the Vocal Part you'd like to view: `);
      if (index > -1 && index < this.parts.length){
        this.selectedParts = this.parts[index];
        //let description = `Vocal Part: ` + this.selectedParts.name ---this was popping up undefined because I had declared "part" in my class, not name.
        let description = `Vocal Part: ` + this.selectedParts.part + '\n';
        for (let i = 0; i < this.selectedParts.singers.length; i++){
            description += i + ')' + this.selectedParts.singers[i].describe() + '\n';
        }
        //let selection1 = this.showPartsMenuOptions(description);
        let selection1 = this.showPartsMenu (description);
        switch (selection1) {
            case '1' :
                this.createSinger ();
                break;
                case '2' :
                this.deleteSinger ();
        }
      }
    }
    deletePart(){
        let index = prompt(`Enter the index of the  Vocal Part you'd like to delete: `);
        if (index > -1 && index <this.parts.length) {
            this.parts.splice(index,1);
        }
    }

    createSinger() {
        let name = prompt(`Enter name of new singer: `);
        let tenure = prompt (`Enter time singer has been with chorus: `);
        this.selectedParts.addSinger(new Singer(name, tenure));
    }

    deleteSinger () {
        let index = prompt (`Enter the index of the singer you'd like to delete: `);
        //if (index > -1 && index <this.selectedParts.length) {
            //function wasn't deleting because I forgot to add .singers in fucntion above
        if (index > -1 && index <this.selectedParts.singers.length){
            this.selectedParts.singers.splice(index,1);
        }
    }
}
let menu = new Menu();
menu.start();