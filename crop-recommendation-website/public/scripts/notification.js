async function setNotification() {
    let response = await fetch("/api/notification/getPendingNotifications");
    const notifications = await response.json();

    let notificationElement = document.getElementById("notification");

    notifications.forEach((notification) => {
        notificationElement.innerHTML += `
        <a href="#" class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">

                                <div class="pl-3 w-full">
                                    <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                        Water Deficiency at
                                        <span class="font-semibold text-gray-900 dark:text-white">${notification.districtName}</span> ${notification.daysTillExhaustion} days till exhaustion
                                    </div>
                                    <div class="text-xs font-medium text-primary-600 dark:text-primary-500">a few moments ago</div>
                                </div>
                            </a>
        `;
    });
}

setNotification();
