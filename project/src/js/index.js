import Soldiers from './models/Soldiers';
import ReservePeriods from './models/ReservePeriods';

let app_state = {};

function saveAppDB() {
    app_state.soldiers.persistData();
    app_state.reserve_periods.persistData();
}

function loadAppDB() {
    app_state.soldiers = new Soldiers();
    app_state.reserve_periods = new ReservePeriods();

    app_state.soldiers.readStorage();
    app_state.reserve_periods.readStorage();
}

function hideTable() {
    document.getElementById('data-input').style.display = 'none';
    document.getElementById('btn-end').style.display = 'none';
}
function showTable() {
    document.getElementById('btn-create').style.display = 'none';
    document.getElementById('data-input').style.display = 'block';
    document.getElementById('btn-end').style.display = 'block';
}

//the function checks if there is an active reserve-period
function checkIfActive() {
    
    let reserve_periods = app_state.reserve_periods.getReservePeriods(); //get the reservePeriods array from 
    //reservePeriods object
    let r_active = false;
    if(reserve_periods.length > 0) {
        reserve_periods.forEach(rp => {
            if(rp.is_active){
                r_active = true;
                return;
            }
        });
     
    }
    return r_active;
}



document.getElementById('btn-create').addEventListener('click', () => {
        // let dateStart = getDate() + ' / ' + getMonth() + ' / ' + getFullYear();
        
        app_state.reserve_periods.addReservePeriods('10/12/2018', null, 1);
        loadAppDB();
        showTable();
    
    
});

document.getElementById('have_special').addEventListener('click', () => {
    if(document.getElementById("have_special").checked){
        document.getElementById('gear').options[2].disabled = false;
    }else{
        document.getElementById('gear').options[2].disabled = true;
    }
});

document.getElementById('btn-add').addEventListener('click', () => {
    let markup = `
            <tr>
            <th class="table-warning" scope="row">1</th>
            <td class="width"><input class="name form-control" placeholder="הזן טקסט"></td>
            <td><input id="self-num" class="form-control" placeholder="הזן מספר"></td>
            <td><input id="phone-num" class="form-control" placeholder="הזן מספר"></td>
            <td><select id="presence" class="form-control">
                    <option value="0">נמצא</option>
                    <option value="1">לא נמצא</option>
                </select></td>
            <td>
                <div class="checkbox form-control">
                    <input type="checkbox" id="have_special">
                </div>

            </td>
            <td><select id="gear" class="form-control">
                    <option value="weapon">מספר נשק</option>
                    <option value="scope">מספר כוונת</option>
                    <option value="special" disabled>מספר צלם</option>
                </select></td>
            <td><input id="amount-days" class="form-control" placeholder="הזן מספר"></td>
            <td colspan="2" class="flex-element">
                <button id="btn-delete" class="btn  btn-danger btn-sm"><span class="fas fa-trash"></span></button>
                <button id="btn-edit" class="btn  btn-warning btn-sm"><span class="fas fa-edit"></span></button>
            </td>
        </tr>
    `;

    let table = document.getElementById('data-input');
    table.insertAdjacentHTML('beforeend', markup);
    app_state.soldiers.addSoldier('arbel', 5784726, 524488128);
    loadAppDB();
    console.log("im in add button");
   
});


loadAppDB();


if(checkIfActive()){
    showTable();

}else{
    hideTable();
}


