// script.js
const moviesData = fetch('https://raw.githubusercontent.com/SalavatFayzullin/DWV_Assignment_1/refs/heads/master/data.json').

let sortingOrder = 'Ascending', sortingColumn = 'Revenue';

function handleSorting() {
    console.log(sortingColumn + ' ' + sortingOrder);
    moviesData.sort((a, b) => {
        let modifier = sortingOrder === 'Descending' ? -1 : 1;

        if (sortingColumn.toLowerCase() === 'revenue') {
            // Remove '$' and commas, then convert to number
            const revenueA = parseFloat(a.revenue.replace(/[^0-9.-]+/g, ""));
            const revenueB = parseFloat(b.revenue.replace(/[^0-9.-]+/g, ""));
            return (revenueA - revenueB) * modifier;
        } else {
            return (a.release_year - b.release_year) * modifier;
        }
    });

    const tableBody = document.querySelector('#movies-table tbody');
    tableBody.innerHTML = ''; // Clear the table
    populateTable();
}

function sortByChanged(e) {
    sortingColumn = e.value;
    handleSorting();
}

function sortOrderChanged(e) {
    sortingOrder = e.value;
    handleSorting();
}

// Function to populate the table
function populateTable() {
    const tableBody = document.querySelector('#movies-table tbody');

    moviesData.forEach(movie => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.revenue}</td>
            <td>${movie.release_year}</td>
            <td>${movie.director}</td>
            <td>${movie.country}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Call the function to populate the table when the page loads
window.onload = populateTable;