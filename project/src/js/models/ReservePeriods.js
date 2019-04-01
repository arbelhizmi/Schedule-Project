export default class ReservePeriods {
    constructor() {
        this.reserve_periods = [];
    }

    addReservePeriods(date_started, date_ended, is_active) {
        const reserve_period = { date_started, date_ended, is_active };
        this.reserve_periods.push(reserve_period);
        
        // Perist data in localStorage
        this.persistData();

        return reserve_period;
    }

    deleteReservePeriods(id) {
        const index = this.reserve_periods.findIndex(el => el.id === id);
        this.reserve_periods.splice(index, 1);

        // Perist data in localStorage
        this.persistData();
    }

    getReservePeriods() {
        return this.reserve_periods; //get the reservePeriods array from the reservePeriods object
    }

    getNumReservePeriods() {
        return this.reserve_periods.length;
    }

    persistData() {
        localStorage.setItem('reserve_periods', JSON.stringify(this.reserve_periods));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('reserve_periods'));
        
        // Restoring reserve_periods from the localStorage
        if (storage) this.reserve_periods = storage;
    }
}
