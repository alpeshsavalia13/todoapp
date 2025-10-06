<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Tracker</title>
    <link rel="manifest" href="/pwa-manifest.json">
    <meta name="theme-color" content="#000000">
    <script>
        window.appUrl = "{{ config('app.url') }}";
    </script>
    @viteReactRefresh
    @vite('resources/js/main.jsx')
</head>
<body>
    <div id="app"></div>
    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
              .then(reg => console.log('SW registered', reg))
              .catch(err => console.log('SW registration failed', err));
        }
    </script>
</body>
</html>
