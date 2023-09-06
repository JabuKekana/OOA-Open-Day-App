if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js") // Replace with your service worker file path
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
  