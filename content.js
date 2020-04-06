if (Notification.permission === 'granted') {
	checkIntervals();
} else if (Notification.permission !== 'denied') {
	Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        console.log('Permission grnted');
		checkIntervals();
      }
    });
}

function checkIntervals() {
  const intervalsContainer = document.querySelector('.delivery_time_container');

  if (!intervalsContainer || intervalsContainer.querySelector('.interval_container.loading')) {
    console.log('Waiting for intervals data to load')
    setTimeout(checkIntervals, 1000);
    return;
  }
  console.log('Intervals data is ready');

  intervalsContainer.scrollIntoView();

  const intervalButton = intervalsContainer.querySelector(`label.interval[data-disabled="false"]`);

  if (intervalButton) {
    console.log('Found available interval');

    new Notification('Utkonos interval selected!');

    intervalButton.click();
    document.querySelector('a[href="/ordering/check"]').click();

    setTimeout(() => {
      if (document.querySelector('modal_content.error')) {
        window.location.reload();
      }
    }, 10000);

    return;
  }

  console.log('No available intervals found');

  setTimeout(() => {
    console.log('Reloading page');
    window.location.reload();
  }, 60000);
}
