(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  console.log("Content script has started.");

  // Initialize an object to keep track of counted scripts
  const scriptCounts = {
    Meta: 0,
    "Google Tag Manager": 0,
    "GA Universal": 0,
    GA4: 0,
    TikTok: 0,
    Taboola: 0,
    Pinterest: 0,
    "Google Ads": 0,
  };

  // Define regex patterns for different marketing scripts
  const patterns = {
    Meta: /connect\.facebook\.net\/signals\/config\/(\d+)/,
    "Google Tag Manager": /googletagmanager\.com\/gtm\.js\?id=GTM-/,
    "GA Universal":
      /googletagmanager\.com\/gtag\/js\?id=UA-|google-analytics\.com\/analytics\.js/,
    GA4: /googletagmanager\.com\/gtag\/js\?id=G-/,
    TikTok: /analytics\.tiktok\.com\/i18n\/pixel\/events\.js\?sdkid=/,
    Taboola: /cdn\.taboola\.com\/libtrc\/unip\//,
    Pinterest: /assets\.pinterest\.com\/js\/pinit\.js/,
    "Google Ads": /www\.googletagmanager\.com\/gtag\/js\?id=AW-/,
  };

  function detectScript(scriptSrc) {
    // Check the script source against each pattern
    for (const [key, regex] of Object.entries(patterns)) {
      if (regex.test(scriptSrc)) {
        scriptCounts[key]++;
        sendUpdate();
        break; // Stop checking once a match is found
      }
    }
  }

  function sendUpdate() {
    // Calculate the total occurrences
    const totalOccurences = Object.values(scriptCounts).reduce(
      (sum, current) => sum + current,
      0
    );

    // Send the updated counts back to the background script
    chrome.runtime.sendMessage({
      detectedScripts: scriptCounts,
      totalOccurences: totalOccurences,
    });
  }

  // Use MutationObserver to dynamically monitor for script tags being added
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "SCRIPT" && node.src) {
          detectScript(node.src);
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Initial detection for scripts already on the page
  document
    .querySelectorAll("script[src]")
    .forEach((script) => detectScript(script.src));
})();
