import { FileReaderResponse } from "../types/fileReaderResponse";

const selectElement = document.getElementById(
  "inputtypes"
) as HTMLSelectElement;

let readFileRoute: string = "";

const submitSpace = document.getElementById("submitspace") as HTMLInputElement;
const submitBtn = document.getElementById("submitbtn") as HTMLButtonElement;

const WORDS_NUMBER = 10;

document.addEventListener("DOMContentLoaded", () => {
  if (selectElement) {
    selectElement.addEventListener("change", function () {
      onSelectChange(this.value);
    });
    selectElement.dispatchEvent(new Event("change"));
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      submitOnCLick();
    });
  }
});

export function onSelectChange(value: any) {
  submitSpace.placeholder = (function () {
    switch (value) {
      case "local":
        return "Insert path (ex: C:/Dev/file.txt)";
      case "web":
        return "Insert URL (ex: https://raw.githubusercontent.com/dscape/spell/master/test/resources/big.txt)";
      default:
        return "Insert path (ex: C:/Dev/file.txt)";
    }
  })();
  readFileRoute = value;
}

export async function submitOnCLick() {
  if (!submitSpace.value || submitSpace.value.length === 0) {
    alert("File path or url not provided");
    return;
  }

  const resBody: FileReaderResponse = await fetch(
    `http://localhost:3000/readFile/${readFileRoute}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath: submitSpace.value.trim(), fileUrl: submitSpace.value.trim() }),
    }
  ).then((res) => res.json());

  if (resBody.isError) {
    alert(resBody.errorMessage);
    return;
  }

  renderObject(resBody);
}
function renderObject(resBody: FileReaderResponse) {
  const labels: Record<keyof FileReaderResponse, string> = {
    errorMessage: "Error message",
    numberOfWords: "Number of words",
    numberOfChars: "Number of characters",
    numberOfSpaces: "Number of spaces",
    repeatedWordsObject: `Words repeated a least ${WORDS_NUMBER} times`,
  };

  for (const key in resBody) {
    if (resBody.hasOwnProperty(key)) {
      const propertyElement = document.getElementById(
        key
      ) as HTMLParagraphElement;
      if (propertyElement) {
        if (typeof resBody[key] === "object" && resBody[key] !== null) {
          propertyElement.textContent = `${labels[key]}:`;
          // Se la proprietà è un oggetto, crea un contenitore per essa
          for (const k in resBody[key]) {
            if (resBody[key].hasOwnProperty(k) && resBody[key][k] >= WORDS_NUMBER) {
              const subPropertyElement = document.createElement("p");
              subPropertyElement.textContent = `${k}: ${resBody[key][k]}`;
              propertyElement.appendChild(subPropertyElement);
            }
          }
        } else {
          propertyElement.textContent = `${labels[key]}: ${resBody[key]}`;
        }
      }
    }
  }
}
