class Car {
    #brand;
    #model;
    isTrunkOpen = false;
    #speed = 0;
    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
    }
    displayInfo() {
        console.log(this.#brand, this.#model, `${this.#speed} km/h`, this.isTrunkOpen)
    }
    go() {
        if (this.isTrunkOpen) {
            this.isTrunkOpen = false;
        }
        if (this.#speed >= 200) {
            return 
        }
        
        this.#speed += 5;
    }
    brake() {
        if (this.#speed <= 0) {
            return 
        }
        this.#speed -= 5;
    }
    openTrunk() {
        this.isTrunkOpen = true;
    }
    closeTrunk() {
        this.isTrunkOpen = false;
    }
}
class RaceCar extends Car {
    accelearation = 0;
    constructor(brand, model, accelearation) {
        super(brand, model)
        this.accelearation = accelearation;
    }
    go () {
        if (this.speed >= 300) {
            return
        }
        this.speed += this.accelearation;
    }
    brake() {
        if (this.speed <= 0) {
            return
        }
        this.speed -= this.accelearation;
    }
    openTrunk () {
        return 
    }
    closeTrunk () {
        return
    }
}
const toyotaCar = new Car('toyota', 'corolla');
const teslaCar = new Car('tesla', 'model 3');
const mclarenRaceCar = new RaceCar('mclaren', 'f1', 50);
mclarenRaceCar.go();
mclarenRaceCar.openTrunk()
mclarenRaceCar.displayInfo();
toyotaCar.openTrunk();
toyotaCar.go()
teslaCar.brake()
teslaCar.displayInfo()
toyotaCar.displayInfo();