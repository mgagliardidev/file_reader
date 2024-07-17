document.addEventListener("DOMContentLoaded", () => {
  const selectElement = document.getElementById(
    "inputtypes"
  ) as HTMLSelectElement;
  if (selectElement) {
    selectElement.addEventListener("change", onSelectChange);
  }
});

export function onSelectChange() {
  console.log("onselectchange");
}

export function submitOnCLick() {
  console.log("dddd");
  console.log("ddddssssss");
}
