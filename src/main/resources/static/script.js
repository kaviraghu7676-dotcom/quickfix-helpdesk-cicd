
const ticketForm = document.getElementById("ticketForm");
const ticketList = document.getElementById("ticketList");

let tickets = [];

ticketForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const issue = document.getElementById("issue").value.trim();
    const category = document.getElementById("category").value;

    const ticket = {
        id: tickets.length + 1,
        name: name,
        issue: issue,
        category: category,
        status: "Open"
    };

    tickets.push(ticket);

    displayTickets();
    ticketForm.reset();
});

function displayTickets() {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === "Open").length;
    const progress = tickets.filter(t => t.status === "In Progress").length;
    const resolved = tickets.filter(t => t.status === "Resolved").length;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("openCount").textContent = open;
    document.getElementById("progressCount").textContent = progress;
    document.getElementById("resolvedCount").textContent = resolved;

    ticketList.innerHTML = "";

    if (tickets.length === 0) {
        ticketList.textContent = "No tickets submitted yet.";
        return;
    }

    const table = document.createElement("table");
    table.className = "ticket-table";

    const headers = ["ID", "Name", "Issue", "Category", "Status"];
    const headerRow = document.createElement("tr");

    headers.forEach(function(header) {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    tickets.forEach(function(ticket) {
        const row = document.createElement("tr");

        [ticket.id, ticket.name, ticket.issue,
         ticket.category, ticket.status].forEach(function(value) {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });

        table.appendChild(row);
    });

    ticketList.appendChild(table);
}

