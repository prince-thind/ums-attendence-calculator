export default function download(str, fileName) {
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(str)
    );
    element.setAttribute("download", fileName + '.csv');

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}