export function printElement(querySelector: string) {
  const currentIframe = document.getElementById("print-and-destroy");
  if (currentIframe) {
    currentIframe.remove();
  }
  const element = document.querySelector(querySelector);
  if (!element) {
    return;
  }
  const styles = `<style>
  @media print{
    @page {
      size: landscape
    }
  }

  body {
    font-family: sans-serif,Arial;
  }
</style>`;
  const scripts = `<script>window.print();</script>`;

  var iframe = document.createElement("iframe");
  iframe.setAttribute("data-testid", "iframe-print-and-destroy");
  iframe.id = "print-and-destroy";
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  let frameDocument =
    iframe?.contentDocument ||
    iframe?.contentWindow?.document ||
    (iframe as any)?.document;

  frameDocument.open();
  frameDocument.writeln(`${styles}${element.outerHTML}${scripts}`);
  frameDocument.close();
}
