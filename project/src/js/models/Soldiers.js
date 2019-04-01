export default class Soldiers {
    constructor() {
        this.soldiers = [];
    }

    addSoldier(name, personal_number, phone_num, status, weapon_num, aim_num, special_num, num_of_days) {
        const soldier = { name, personal_number, phone_num, status, weapon_num, aim_num, special_num, num_of_days};
        this.soldiers.push(soldier);

        // Perist data in localStorage
        this.persistData();

        return soldier;
    }

    deleteSoldier(id) {
        const index = this.soldiers.findIndex(el => el.id === id);
        this.soldiers.splice(index, 1);

        // Perist data in localStorage
        this.persistData();
    }

   

    getNumsoldiers() {
        return this.soldiers.length;
    }

    persistData() {
        localStorage.setItem('soldiers', JSON.stringify(this.soldiers));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('soldiers'));
        
        // Restoring soldiers from the localStorage
        if (storage) this.soldiers = storage;
    }
}
