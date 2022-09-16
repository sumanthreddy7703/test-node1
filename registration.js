let userForm = document.getElementById("user_form");
let userEntryUNPARSED = localStorage.getItem('userEntries');
let userEntry = userEntryUNPARSED ? JSON.parse(userEntryUNPARSED) : [];
let errors = [];

const retrieveEntries = () => {
    let entries = localStorage.getItem('userEntries');
    if (entries) {
        entries=JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

const displayEntries = () => {
    let entries=retrieveEntries();
    const tableEntries = entries.map(
        (entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.FullName}</td>`;
            const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
            const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`;
            const row  = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
            return row;
        }
    ).join("\n");
    const table  = `<table class='table-auto w-full'>
                        <tr>
                        <th class='px-4 py-2 '>Name</th>
                        <th class='px-4 py-2 '>Email</th>
                        <th class='px-4 py-2 '>Password</th>
                        <th class='px-4 py-2 '>Dob</th>
                        <th class='px-4 py-2 '>Accepted terms?</th>
                        </tr>${tableEntries}
                    </table>`;
    let details = document.getElementById('user_entries');
    details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    const FullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    let currentYear = new Date().getFullYear();
    let birthYear = dob.split("-");
    let year = birthYear[0];
    let age = currentYear - year;
    if (age < 18 || age > 55) {
        document.getElementById('dob').style='border:1px solid red';
        return alert("Age should be in between 18 and 55");
    } else {
        document.getElementById('dob').style='border:none';
        const entry = {
            FullName,
            email,
            password,
            dob,
            acceptTerms,
        }
        userEntry.push(entry);
        localStorage.setItem("userEntries", JSON.stringify(userEntry));
        displayEntries();
        userForm.reset();
    }
}

userForm.addEventListener('submit', saveUserForm);
displayEntries();