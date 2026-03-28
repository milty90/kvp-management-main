export function sliceText(text: string) {
  const MEDIUM_DEVICE_WIDTH = 768;
  let maxLength = 10; // Beispielwert für mittlere Gerätebreite

  // Überprüfen der Bildschirmgröße
  if (window.innerWidth <= MEDIUM_DEVICE_WIDTH) {
    maxLength = 4; // Kürzere Länge für kleinere Bildschirme
  } else if (window.innerWidth > MEDIUM_DEVICE_WIDTH) {
    maxLength = 15; // Länge für größere Bildschirme
  }

  console.log(window.innerWidth);
  return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
}
