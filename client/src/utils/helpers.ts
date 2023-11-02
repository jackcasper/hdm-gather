export function openURL(url: string) {
  // Attempt to open the URL in a new tab with the '_blank' target
  const canOpenNewTab = window.open(url, '_blank')

  // If the browser blocks the new tab, open the URL in the current tab
  // This is particularly useful for cases like Safari on iOS
  if (!canOpenNewTab) {
    window.location.href = url
  }
}
