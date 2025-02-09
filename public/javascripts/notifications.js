document.addEventListener("DOMContentLoaded", async function () {
    const filters = document.querySelectorAll(".filter-input");
    const tableBody = document.querySelector("#notifications-table tbody");
    let allNotifications = []; // Store all notifications locally

    // Load notifications once
    async function loadNotifications() {
        let response = await fetch(`/api/notifications`);
        let data = await response.json();

        if (data.success) {
            allNotifications = data.notifications; // Store data
            filterAndUpdateTable(); // Apply initial filtering
        }
    }

    // Filter and update the table
    function filterAndUpdateTable() {
        let search = document.querySelector("#search").value.toLowerCase();
        let status = document.querySelector("#status").value;
        let type = document.querySelector("#type").value;
        let date = document.querySelector("#date").value;

        let filteredNotifications = allNotifications.filter(notification => {
            let matchesSearch =
                notification.firstname.toLowerCase().includes(search) ||
                notification.lastname.toLowerCase().includes(search) ||
                notification.email.toLowerCase().includes(search) ||
                notification.subject.toLowerCase().includes(search);

            // let matchesStatus = status ? notification.status === status : true;
            // let matchesType = type ? notification.message_type === type : true;
            // let matchesDate = date ? notification.created_at.startsWith(date) : true;

            return matchesSearch
        });
        console.log(allNotifications, filteredNotifications);
        console.log('detected change');
        updateTable(filteredNotifications);
    }

    // Update the table with filtered notifications
    function updateTable(notifications) {
        // tableBody.; // Clear existing rows
        notifications.forEach(notification => {
            let row = `
                <tr class="${notification.status === 'unread' ? 'unread' : ''}">
                    <td>${notification.firstname} ${notification.lastname}</td>
                    <td>${notification.email}</td>
                    <td>${notification.subject}</td>
                    <td>${notification.status}</td>
                    <td>
                        <a href="/admin/notifications/view/${notification.id}" class="btn btn-sm btn-primary">View</a>
                    </td>
                </tr>
            `;
        
        });
        tableBody.innerHTML = `<h1>Hello</h1>`;
    }

    // Add event listeners to all filters (on 'input' or 'change' event)
    filters.forEach(filter => {
        filter.addEventListener("input", filterAndUpdateTable);
        filter.addEventListener("change", filterAndUpdateTable);
    });

    // Initial load
    loadNotifications();
});
